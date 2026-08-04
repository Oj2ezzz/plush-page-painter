import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  FINISHES,
  LADDER_PULL_SPEC,
  standoffInsetIn,
  type FinishId,
} from "@/lib/ladderPull";

/* ---------- real-world constants (scene units are metres) ---------- */
const IN = 0.0254;
const TUBE_R = (LADDER_PULL_SPEC.tubeOuterDiameterIn / 2) * IN;
const GLASS_T = LADDER_PULL_SPEC.glassThicknessIn * IN;
const OFFSET = LADDER_PULL_SPEC.standoffOffsetIn * IN;
const TUBE_Z = GLASS_T / 2 + OFFSET;
const FILLET = 0.0024; // radiused edge on the flat caps
const SO_R = 0.0198; // standoff body radius at the glass
const RING_R = 0.0203; // polished centre ring

interface ViewerApi {
  setLength: (inches: number) => void;
  setFinish: (id: FinishId) => void;
}

interface LadderPullViewerProps {
  lengthIn: number;
  finish: FinishId;
  className?: string;
}

/* ---------- brushed-grain roughness map (streaks run along the tube) ---------- */
function brushTexture() {
  const w = 512;
  const h = 32;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#8e8e8e";
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 2600; i++) {
    const x = Math.random() * w;
    const g = 55 + Math.random() * 195;
    ctx.strokeStyle = `rgba(${g},${g},${g},${0.18 + Math.random() * 0.4})`;
    ctx.lineWidth = 0.4 + Math.random() * 1.6;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(3, 1);
  t.anisotropy = 8;
  return t;
}

/* ---------- studio environment (equirect canvas -> PMREM) ---------- */
function studioEnv(renderer: THREE.WebGLRenderer, isMobile = false) {
  const w = isMobile ? 512 : 1024;
  const h = isMobile ? 256 : 512;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#ffffff");
  g.addColorStop(0.42, "#dcdcda");
  g.addColorStop(0.52, "#b7b7b4");
  g.addColorStop(0.53, "#8e8e8c");
  g.addColorStop(1, "#3c3c3b");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  const blob = (cx: number, cy: number, r: number, a: number) => {
    const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    rg.addColorStop(0, `rgba(255,255,255,${a})`);
    rg.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = rg;
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
  };
  blob(w * 0.2, h * 0.2, w * 0.24, 1.0); // key softbox, upper left
  blob(w * 0.68, h * 0.34, w * 0.22, 0.45); // fill, right
  blob(w * 0.94, h * 0.26, w * 0.1, 0.55); // rim

  // crisp softbox rectangles — only low-roughness surfaces see these
  const box = (x: number, y: number, bw: number, bh: number, a: number) => {
    ctx.save();
    ctx.filter = "blur(6px)";
    ctx.fillStyle = `rgba(255,255,255,${a})`;
    ctx.fillRect(x, y, bw, bh);
    ctx.restore();
  };
  box(w * 0.1, h * 0.09, w * 0.2, h * 0.2, 1);
  box(w * 0.62, h * 0.16, w * 0.11, h * 0.3, 0.7);

  ctx.save();
  ctx.filter = "blur(10px)";
  ctx.fillStyle = "rgba(30,32,36,0.55)";
  ctx.fillRect(0, h * 0.4, w * 0.06, h * 0.16);
  ctx.fillRect(w * 0.4, h * 0.3, w * 0.1, h * 0.24);
  ctx.restore();

  const tex = new THREE.CanvasTexture(c);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromEquirectangular(tex).texture;
  pmrem.dispose();
  tex.dispose();
  return env;
}

/* ---------- soft contact shadow (product-shot style) ---------- */
function shadowTexture() {
  const s = 256;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  const rg = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  rg.addColorStop(0, "rgba(0,0,0,0.55)");
  rg.addColorStop(0.35, "rgba(0,0,0,0.28)");
  rg.addColorStop(0.72, "rgba(0,0,0,0.07)");
  rg.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = rg;
  ctx.fillRect(0, 0, s, s);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Flat cap with a small radiused edge, lathed around Y (base at y=0). */
function capGeometry(isMobile = false) {
  const pts: THREE.Vector2[] = [];
  const steps = 8;
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * (Math.PI / 2);
    pts.push(
      new THREE.Vector2(
        TUBE_R - FILLET + FILLET * Math.cos(a),
        FILLET * Math.sin(a),
      ),
    );
  }
  pts.push(new THREE.Vector2(0, FILLET));
  return new THREE.LatheGeometry(pts, isMobile ? 32 : 56);
}

/** Standoff half: lathed profile, widest at the glass, domed shoulder at the tube. */
function standoffGeometry(len: number, isMobile = false) {
  const pts = [new THREE.Vector2(0, 0), new THREE.Vector2(SO_R, 0)];
  const stops: [number, number][] = [
    [0.3, 1.0],
    [0.58, 0.985],
    [0.74, 0.955],
    [0.86, 0.9],
    [0.94, 0.82],
    [1.0, 0.66],
  ];
  for (const [t, k] of stops) pts.push(new THREE.Vector2(SO_R * k, len * t));
  pts.push(new THREE.Vector2(0, len));
  return new THREE.LatheGeometry(pts, isMobile ? 28 : 48);
}

export default function LadderPullViewer({
  lengthIn,
  finish,
  className,
}: LadderPullViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<ViewerApi | null>(null);
  // Captured once so the scene builds with the correct starting configuration
  // without re-running setup when props change.
  const initialRef = useRef({ lengthIn, finish });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Graceful bail-out if WebGL is unavailable rather than throwing.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    const disposables: { dispose: () => void }[] = [];
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.94;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.touchAction = "pan-y";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const env = studioEnv(renderer);
    scene.environment = env;
    scene.environmentIntensity = 0.95;
    disposables.push(env);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 100);
    camera.position.set(1.1, 0.35, 1.9);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.7;
    controls.minDistance = 0.25;
    controls.maxDistance = 12;

    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    const pause = () => {
      controls.autoRotate = false;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        controls.autoRotate = true;
      }, 3000);
    };
    controls.addEventListener("start", pause);
    controls.addEventListener("end", pause);
    renderer.domElement.addEventListener("wheel", pause, { passive: true });

    scene.add(new THREE.HemisphereLight(0xffffff, 0xbdbdba, 0.35));
    const key = new THREE.DirectionalLight(0xffffff, 2.0);
    key.position.set(-1.9, 5.2, 2.6);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xf6f7ff, 0.55);
    fill.position.set(3.2, 1.0, 1.8);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 0.9);
    rim.position.set(0.6, 1.4, -3.0);
    scene.add(rim);

    const shadowTex = shadowTexture();
    const groundGeo = new THREE.PlaneGeometry(1, 1);
    const groundMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.9,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.scale.set(0.3, 0.62, 1);
    scene.add(ground);
    disposables.push(shadowTex, groundGeo, groundMat);

    /* ---------- materials ---------- */
    const grain = brushTexture();
    const tubeMat = new THREE.MeshPhysicalMaterial({
      name: "tubeFinish",
      color: 0xd7dadb,
      metalness: 0.92,
      roughness: 0.3,
      roughnessMap: grain,
      envMapIntensity: 1.1,
    });
    const soMat = new THREE.MeshPhysicalMaterial({
      name: "standoffFinish",
      color: 0xd7dadb,
      metalness: 0.92,
      roughness: 0.26,
      envMapIntensity: 1.1,
    });
    const ringMat = new THREE.MeshPhysicalMaterial({
      name: "polishedRing",
      color: 0xeff2f3,
      metalness: 1.0,
      roughness: 0.07,
      envMapIntensity: 1.2,
    });
    const darkMat = new THREE.MeshStandardMaterial({
      name: "seamGasket",
      color: 0x14161a,
      metalness: 0.2,
      roughness: 0.7,
    });
    const glassMat = new THREE.MeshPhysicalMaterial({
      name: "glass",
      color: 0xd7ece2,
      metalness: 0,
      roughness: 0.03,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
      envMapIntensity: 0.6,
      depthWrite: false,
    });
    const glassEdgeMat = new THREE.MeshPhysicalMaterial({
      name: "glassEdge",
      color: 0x7fb79c,
      metalness: 0,
      roughness: 0.12,
      transparent: true,
      opacity: 0.5,
    });
    disposables.push(
      grain,
      tubeMat,
      soMat,
      ringMat,
      darkMat,
      glassMat,
      glassEdgeMat,
    );

    /* ---------- geometry ---------- */
    const model = new THREE.Group();
    model.name = "ladderPull";
    scene.add(model);

    const tubes: THREE.Mesh[] = [];
    const caps: { mesh: THREE.Mesh; end: number }[] = [];
    const barrelGeo = new THREE.CylinderGeometry(
      TUBE_R,
      TUBE_R,
      1,
      56,
      1,
      true,
    );
    const capGeo = capGeometry();
    disposables.push(barrelGeo, capGeo);

    for (const side of [1, -1]) {
      const g = new THREE.Group();
      g.name = side > 0 ? "tubeFront" : "tubeBack";
      g.position.z = side * TUBE_Z;

      const mid = new THREE.Mesh(barrelGeo, tubeMat);
      mid.name = `${g.name}_barrel`;
      g.add(mid);
      tubes.push(mid);

      for (const end of [1, -1]) {
        const cap = new THREE.Mesh(capGeo, tubeMat);
        cap.name = g.name + (end > 0 ? "_capTop" : "_capBottom");
        cap.scale.y = end;
        g.add(cap);
        caps.push({ mesh: cap, end });
      }
      model.add(g);
    }

    const soFaceZ = GLASS_T / 2 + 0.0032; // standoff starts just outside the ring
    const soLen = TUBE_Z - TUBE_R - soFaceZ; // reaches the tube wall
    const soGeo = standoffGeometry(soLen);
    const screwGeo = new THREE.CylinderGeometry(0.0019, 0.0019, 0.0055, 16);
    const ringGeo = new THREE.CylinderGeometry(
      RING_R,
      RING_R,
      GLASS_T + 0.0064,
      48,
    );
    const gasketGeo = new THREE.CylinderGeometry(
      RING_R + 0.0004,
      RING_R + 0.0004,
      0.0013,
      48,
    );
    disposables.push(soGeo, screwGeo, ringGeo, gasketGeo);

    const standoffs: { group: THREE.Group; level: number }[] = [];
    for (const level of [1, -1]) {
      const asm = new THREE.Group();
      asm.name = level > 0 ? "standoffUpper" : "standoffLower";

      for (const side of [1, -1]) {
        const half = new THREE.Group();
        half.rotation.y = side > 0 ? 0 : Math.PI;
        half.position.z = side * soFaceZ;

        const body = new THREE.Mesh(soGeo, soMat);
        body.name = asm.name + (side > 0 ? "_frontHalf" : "_backHalf");
        body.rotation.x = Math.PI / 2;
        half.add(body);

        const screw = new THREE.Mesh(screwGeo, darkMat);
        screw.name = asm.name + (side > 0 ? "_setScrewFront" : "_setScrewBack");
        screw.rotation.z = Math.PI / 2;
        screw.position.set(SO_R * 0.965, 0, soLen * 0.42);
        half.add(screw);

        asm.add(half);
      }

      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.name = `${asm.name}_centreRing`;
      ring.rotation.x = Math.PI / 2;
      asm.add(ring);

      for (const side of [1, -1]) {
        const gasket = new THREE.Mesh(gasketGeo, darkMat);
        gasket.name = asm.name + (side > 0 ? "_seamFront" : "_seamBack");
        gasket.rotation.x = Math.PI / 2;
        gasket.position.z = side * (GLASS_T / 2 + 0.0026);
        asm.add(gasket);
      }

      model.add(asm);
      standoffs.push({ group: asm, level });
    }

    const glassGeo = new THREE.BoxGeometry(0.34, 1, GLASS_T * 0.999);
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.name = "glassPanel";
    glass.visible = LADDER_PULL_SPEC.showGlass;
    model.add(glass);

    const glassEdgeGeo = new THREE.BoxGeometry(0.0016, 1, GLASS_T);
    const glassEdges = new THREE.Group();
    glassEdges.name = "glassEdges";
    glassEdges.visible = LADDER_PULL_SPEC.showGlass;
    for (const s of [1, -1]) {
      const e = new THREE.Mesh(glassEdgeGeo, glassEdgeMat);
      e.name = s > 0 ? "glassEdgeRight" : "glassEdgeLeft";
      e.position.x = s * 0.17;
      glassEdges.add(e);
    }
    model.add(glassEdges);
    disposables.push(glassGeo, glassEdgeGeo);

    /* ---------- state ---------- */
    const start = initialRef.current;
    const startFinish = FINISHES[start.finish];
    const state = {
      targetIn: start.lengthIn,
      lenIn: start.lengthIn,
      target: {
        color: new THREE.Color(startFinish.color),
        metalness: startFinish.metalness,
        roughness: startFinish.roughness,
        env: startFinish.env,
      },
      targetDist: 2.2,
    };

    function applyLength(L: number) {
      const mid = Math.max(L - 2 * FILLET, 0.01);
      for (const t of tubes) t.scale.y = mid;
      for (const c of caps) c.mesh.position.y = c.end * (L / 2 - FILLET);

      const insetM = standoffInsetIn(L / IN) * IN;
      for (const s of standoffs) s.group.position.y = s.level * (L / 2 - insetM);

      const gw = Math.min(0.34, Math.max(0.16, L * 0.42));
      glass.scale.set(gw / 0.34, L * 0.88, 1);
      glassEdges.scale.set(gw / 0.34, L * 0.88, 1);
      ground.position.y = -L / 2 - 0.004;

      state.targetDist =
        (L * 0.56) / Math.tan((camera.fov * Math.PI) / 360) + 0.22;
      controls.minDistance = state.targetDist * 0.35;
      controls.maxDistance = state.targetDist * 3;
    }

    function setFinish(id: FinishId) {
      const f = FINISHES[id];
      state.target.color.set(f.color);
      state.target.metalness = f.metalness;
      state.target.roughness = f.roughness;
      state.target.env = f.env;
      tubeMat.roughnessMap = f.brushed ? grain : null;
      tubeMat.needsUpdate = true;
      // Powder coat keeps the polished centre ring; metal finishes match through.
      ringMat.color.set(
        f.kind === "metal" ? (id === "polished" ? 0xf1f4f5 : 0xe6eaeb) : 0xeff2f3,
      );
    }

    apiRef.current = {
      setLength: (inches) => {
        state.targetIn = inches;
        pause();
      },
      setFinish,
    };

    /* ---------- sizing ---------- */
    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    applyLength(state.lenIn * IN);
    setFinish(start.finish);
    camera.position
      .set(0.9, 0.25, 1)
      .normalize()
      .multiplyScalar(state.targetDist);

    /* ---------- render only while on screen ---------- */
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(mount);

    const tmp = new THREE.Vector3();
    renderer.setAnimationLoop(() => {
      if (!visible) return;

      if (Math.abs(state.targetIn - state.lenIn) > 0.002) {
        state.lenIn += (state.targetIn - state.lenIn) * 0.14;
        applyLength(state.lenIn * IN);
      }

      // Camera distance easing that preserves the user's orbit angle.
      const cur = camera.position.distanceTo(controls.target);
      if (Math.abs(state.targetDist - cur) > 0.002) {
        const next = cur + (state.targetDist - cur) * 0.07;
        tmp
          .copy(camera.position)
          .sub(controls.target)
          .normalize()
          .multiplyScalar(next);
        camera.position.copy(controls.target).add(tmp);
      }

      for (const m of [tubeMat, soMat]) {
        m.color.lerp(state.target.color, 0.12);
        m.metalness += (state.target.metalness - m.metalness) * 0.12;
        m.roughness +=
          (state.target.roughness -
            (m === soMat ? 0.04 : 0) -
            m.roughness) *
          0.12;
        m.envMapIntensity += (state.target.env - m.envMapIntensity) * 0.12;
      }

      controls.update();
      renderer.render(scene, camera);
    });

    return () => {
      apiRef.current = null;
      clearTimeout(idleTimer);
      renderer.setAnimationLoop(null);
      io.disconnect();
      ro.disconnect();
      renderer.domElement.removeEventListener("wheel", pause);
      controls.dispose();
      for (const d of disposables) d.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    apiRef.current?.setLength(lengthIn);
  }, [lengthIn]);

  useEffect(() => {
    apiRef.current?.setFinish(finish);
  }, [finish]);

  return <div ref={mountRef} className={className} />;
}
