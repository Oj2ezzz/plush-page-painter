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

/* ---------- door ---------- */
const DOOR_W = 36 * IN; // standard commercial glass door leaf
const PULL_FROM_EDGE = 3 * IN; // pull centreline in from the leading edge
const PULL_X = DOOR_W / 2 - PULL_FROM_EDGE; // door is centred on the origin
const HINGE_X = -DOOR_W / 2;
const PATCH_W = 6.5 * IN;
const PATCH_H = 4.5 * IN;
const PATCH_D = GLASS_T + 1.1 * IN;
const OPEN_ANGLE = -THREE.MathUtils.degToRad(52);

interface ViewerApi {
  setLength: (inches: number) => void;
  setFinish: (id: FinishId) => void;
  setDoorOpen: (open: boolean) => void;
}

interface LadderPullViewerProps {
  lengthIn: number;
  finish: FinishId;
  doorOpen?: boolean;
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
  doorOpen = false,
  className,
}: LadderPullViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<ViewerApi | null>(null);
  // Captured once so the scene builds with the correct starting configuration
  // without re-running setup when props change.
  const initialRef = useRef({ lengthIn, finish, doorOpen });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Graceful bail-out if WebGL is unavailable rather than throwing.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    // Half-res transmission buffer: cheaper, and softens residual refraction edges.
    if ("transmissionResolutionScale" in renderer) {
      (renderer as unknown as { transmissionResolutionScale: number })
        .transmissionResolutionScale = 0.5;
    }



    // Real refractive glass is a second render pass — desktop only.
    const useTransmission = !isMobile;

    const disposables: { dispose: () => void }[] = [];
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2),
    );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.94;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.touchAction = "pan-y";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const env = studioEnv(renderer, isMobile);
    scene.environment = env;
    scene.environmentIntensity = 0.95;
    disposables.push(env);

    const camera = new THREE.PerspectiveCamera(24, 1, 0.01, 100);
    camera.position.set(1.1, 0.35, 1.9);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.autoRotate = !prefersReducedMotion;
    controls.autoRotateSpeed = 0.7;
    controls.minDistance = 0.25;
    controls.maxDistance = 30;
    controls.enableZoom = true;
    controls.zoomSpeed = 0.6;
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_ROTATE,
    };
    // OrbitControls sets touch-action:none on connect; restore vertical page
    // scrolling over the canvas.
    renderer.domElement.style.touchAction = "pan-y";

    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    const pause = () => {
      controls.autoRotate = false;
      clearTimeout(idleTimer);
      if (prefersReducedMotion) return;
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
    // Door hardware stays satin stainless regardless of the pull finish.
    const hwMat = new THREE.MeshPhysicalMaterial({
      name: "doorHardware",
      color: 0xc8ccce,
      metalness: 0.95,
      roughness: 0.22,
      envMapIntensity: 1.15,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      name: "glass",
      color: 0xffffff,
      metalness: 0,
      roughness: 0.04,
      ior: 1.48,
      thickness: GLASS_T,
      transmission: useTransmission ? 1 : 0,
      attenuationColor: new THREE.Color(0x8fd0b4),
      attenuationDistance: 3.0,
      specularIntensity: 1,
      side: THREE.FrontSide,

      envMapIntensity: 1.0,
      // Non-transmissive fallback needs classic alpha blending.
      transparent: !useTransmission,
      opacity: useTransmission ? 1 : 0.17,
      depthWrite: useTransmission,
    });
    const glassEdgeMat = new THREE.MeshPhysicalMaterial({
      name: "glassEdge",
      color: 0x5aa384,
      metalness: 0,
      roughness: 0.1,
      transparent: true,
      opacity: 0.72,
      envMapIntensity: 0.9,
    });
    disposables.push(
      grain,
      tubeMat,
      soMat,
      ringMat,
      darkMat,
      hwMat,
      glassMat,
      glassEdgeMat,
    );

    /* ---------- door assembly ----------
       `hinge` sits on the hinge stile and carries the swing rotation.
       `door` counter-offsets so its children use door-centred coordinates. */
    const hinge = new THREE.Group();
    hinge.name = "doorHinge";
    hinge.position.x = HINGE_X;
    scene.add(hinge);

    const door = new THREE.Group();
    door.name = "doorLeaf";
    door.position.x = -HINGE_X;
    hinge.add(door);

    const shadowTex = shadowTexture();
    const groundGeo = new THREE.PlaneGeometry(1, 1);
    const groundMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.85,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.name = "contactShadow";
    ground.rotation.x = -Math.PI / 2;
    ground.scale.set(DOOR_W * 1.15, 0.34, 1);
    door.add(ground);
    disposables.push(shadowTex, groundGeo, groundMat);

    // Glass leaf — unit height, scaled to the door height each frame.
    const glassGeo = new THREE.BoxGeometry(DOOR_W, 1, GLASS_T);
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.name = "glassLeaf";
    glass.visible = LADDER_PULL_SPEC.showGlass;
    door.add(glass);

    // Polished edges: verticals scale with height, horizontals stay door-width.
    const vEdgeGeo = new THREE.BoxGeometry(0.004, 1, GLASS_T * 1.02);
    const hEdgeGeo = new THREE.BoxGeometry(DOOR_W, 0.004, GLASS_T * 1.02);
    const vEdges: THREE.Mesh[] = [];
    const hEdges: { mesh: THREE.Mesh; end: number }[] = [];
    for (const s of [1, -1]) {
      const e = new THREE.Mesh(vEdgeGeo, glassEdgeMat);
      e.name = s > 0 ? "glassEdgeLeading" : "glassEdgeHinge";
      e.position.x = s * (DOOR_W / 2);
      e.visible = LADDER_PULL_SPEC.showGlass;
      door.add(e);
      vEdges.push(e);
    }
    for (const end of [1, -1]) {
      const e = new THREE.Mesh(hEdgeGeo, glassEdgeMat);
      e.name = end > 0 ? "glassEdgeTop" : "glassEdgeBottom";
      e.visible = LADDER_PULL_SPEC.showGlass;
      door.add(e);
      hEdges.push({ mesh: e, end });
    }
    disposables.push(glassGeo, vEdgeGeo, hEdgeGeo);

    // Patch fittings + pivot pins on the hinge stile.
    const patchGeo = new THREE.BoxGeometry(PATCH_W, PATCH_H, PATCH_D);
    const pinGeo = new THREE.CylinderGeometry(
      0.5 * IN,
      0.5 * IN,
      0.9 * IN,
      isMobile ? 12 : 24,
    );
    const patches: { mesh: THREE.Mesh; end: number }[] = [];
    const pins: { mesh: THREE.Mesh; end: number }[] = [];
    for (const end of [1, -1]) {
      const p = new THREE.Mesh(patchGeo, hwMat);
      p.name = end > 0 ? "patchFittingTop" : "patchFittingBottom";
      p.position.x = -DOOR_W / 2 + PATCH_W / 2;
      door.add(p);
      patches.push({ mesh: p, end });

      const pin = new THREE.Mesh(pinGeo, hwMat);
      pin.name = end > 0 ? "pivotPinTop" : "pivotPinBottom";
      pin.position.x = -DOOR_W / 2 + 2.4 * IN;
      door.add(pin);
      pins.push({ mesh: pin, end });
    }
    disposables.push(patchGeo, pinGeo);

    /* ---------- the pull ---------- */
    const pull = new THREE.Group();
    pull.name = "ladderPull";
    pull.position.x = PULL_X;
    door.add(pull);

    const tubes: THREE.Mesh[] = [];
    const caps: { mesh: THREE.Mesh; end: number }[] = [];
    const barrelGeo = new THREE.CylinderGeometry(
      TUBE_R,
      TUBE_R,
      1,
      isMobile ? 32 : 56,
      1,
      true,
    );
    const capGeo = capGeometry(isMobile);
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
      pull.add(g);
    }

    const soFaceZ = GLASS_T / 2 + 0.0032; // standoff starts just outside the ring
    const soLen = TUBE_Z - TUBE_R - soFaceZ; // reaches the tube wall
    const soGeo = standoffGeometry(soLen, isMobile);
    const screwGeo = new THREE.CylinderGeometry(
      0.0019,
      0.0019,
      0.0055,
      isMobile ? 10 : 16,
    );
    const ringGeo = new THREE.CylinderGeometry(
      RING_R,
      RING_R,
      GLASS_T + 0.0064,
      isMobile ? 28 : 48,
    );
    const gasketGeo = new THREE.CylinderGeometry(
      RING_R + 0.0004,
      RING_R + 0.0004,
      0.0013,
      isMobile ? 28 : 48,
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

      pull.add(asm);
      standoffs.push({ group: asm, level });
    }

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
      frameDist: 2.2,
      doorAngle: start.doorOpen ? OPEN_ANGLE : 0,
      targetAngle: start.doorOpen ? OPEN_ANGLE : 0,
    };

    // User zoom as a multiple of the auto-framing distance.
    let zoomRatio = 1;
    let reframing = false;

    function applyLength(L: number) {
      // Pull tubes: only the barrel length changes, never the diameter.
      const mid = Math.max(L - 2 * FILLET, 0.01);
      for (const t of tubes) t.scale.y = mid;
      for (const c of caps) c.mesh.position.y = c.end * (L / 2 - FILLET);

      const insetM = standoffInsetIn(L / IN) * IN;
      for (const s of standoffs) s.group.position.y = s.level * (L / 2 - insetM);

      // Door grows only if the pull would not fit an 84" leaf.
      const doorHIn = Math.max(84, L / IN + 12);
      const doorH = doorHIn * IN;
      const halfH = doorH / 2;

      glass.scale.y = doorH;
      for (const e of vEdges) e.scale.y = doorH;
      for (const e of hEdges) e.mesh.position.y = e.end * halfH;

      for (const p of patches) {
        p.mesh.position.y = p.end * (halfH - PATCH_H / 2 - 0.6 * IN);
      }
      for (const p of pins) {
        p.mesh.position.y = p.end * (halfH + 0.35 * IN);
      }

      // Pull sits at grip height: centred on the leaf, nudged down slightly.
      pull.position.y = -2 * IN;
      ground.position.y = -halfH - 0.004;

      // Frame the whole door, with headroom for the swing.
      const framedIn = doorHIn * 1.14;
      state.frameDist =
        (framedIn * IN * 0.5) / Math.tan((camera.fov * Math.PI) / 360) + 0.3;
      state.targetDist = state.frameDist * zoomRatio;
      controls.minDistance = state.frameDist * 0.12;
      controls.maxDistance = state.frameDist * 4;
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
        reframing = true;
        pause();
      },
      setFinish,
      setDoorOpen: (open) => {
        state.targetAngle = open ? OPEN_ANGLE : 0;
        pause();
      },
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
    hinge.rotation.y = state.doorAngle;
    camera.position
      .set(0.9, 0.22, 1)
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

    // Stop drawing entirely while the tab is backgrounded.
    let tabVisible = !document.hidden;
    const onVisibility = () => {
      tabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    const tmp = new THREE.Vector3();
    let frame = 0;
    renderer.setAnimationLoop(() => {
      if (!visible || !tabVisible) return;
      // ~30fps on mobile.
      frame++;
      if (isMobile && frame % 2 === 0) return;

      if (Math.abs(state.targetIn - state.lenIn) > 0.002) {
        state.lenIn += (state.targetIn - state.lenIn) * 0.14;
        applyLength(state.lenIn * IN);
      }

      // Door swing.
      if (Math.abs(state.targetAngle - state.doorAngle) > 0.0005) {
        state.doorAngle += (state.targetAngle - state.doorAngle) * 0.11;
        hinge.rotation.y = state.doorAngle;
      }

      // Only ease distance while a length change settles, so user zoom sticks.
      const cur = camera.position.distanceTo(controls.target);
      if (reframing) {
        if (Math.abs(state.targetDist - cur) > 0.002) {
          const next = cur + (state.targetDist - cur) * 0.07;
          tmp
            .copy(camera.position)
            .sub(controls.target)
            .normalize()
            .multiplyScalar(next);
          camera.position.copy(controls.target).add(tmp);
        } else {
          reframing = false;
        }
      }

      for (const m of [tubeMat, soMat]) {
        m.color.lerp(state.target.color, 0.12);
        m.metalness += (state.target.metalness - m.metalness) * 0.12;
        m.roughness +=
          (state.target.roughness - (m === soMat ? 0.04 : 0) - m.roughness) *
          0.12;
        m.envMapIntensity += (state.target.env - m.envMapIntensity) * 0.12;
      }

      controls.update();
      if (!reframing && state.frameDist > 0) {
        zoomRatio =
          camera.position.distanceTo(controls.target) / state.frameDist;
      }
      renderer.render(scene, camera);
    });

    return () => {
      apiRef.current = null;
      clearTimeout(idleTimer);
      renderer.setAnimationLoop(null);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
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

  useEffect(() => {
    apiRef.current?.setDoorOpen(doorOpen);
  }, [doorOpen]);

  return <div ref={mountRef} className={className} />;
}
