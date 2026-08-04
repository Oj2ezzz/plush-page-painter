import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  FINISHES,
  LADDER_PULL_SPEC,
  METAL_FINISH_IDS,
  POWDER_FINISH_IDS,
  describeConfiguration,
  formatLength,
  standoffInsetIn,
  type FinishId,
} from "@/lib/ladderPull";

// three.js is ~600KB — keep it out of the initial bundle entirely.
const LadderPullViewer = lazy(() => import("@/components/LadderPullViewer"));

type Unit = "in" | "mm";

const ViewerFallback = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="flex flex-col items-center gap-3 text-muted-foreground">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
      <span className="text-xs tracking-wide">Loading 3D preview…</span>
    </div>
  </div>
);

const LadderPullConfigurator = () => {
  const [lengthIn, setLengthIn] = useState<number>(
    LADDER_PULL_SPEC.defaultLengthIn,
  );
  const [finish, setFinish] = useState<FinishId>("brushed");
  const [unit, setUnit] = useState<Unit>("in");
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Only mount the 3D scene once the section is close to the viewport, so the
  // homepage above the fold is never held up by it.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const summary = describeConfiguration(lengthIn, finish, unit);

  // Matches the site-wide "Request a Quote" CTA (phone call), while carrying
  // the configuration along: it is copied to the clipboard so the customer can
  // read/paste it, and shown in the toast for reference during the call.
  const handleQuote = async () => {
    try {
      await navigator.clipboard?.writeText(summary);
      toast({
        title: "Configuration copied",
        description: `${summary} — mention this when you call.`,
      });
    } catch {
      toast({
        title: "Your configuration",
        description: `${summary} — mention this when you call.`,
      });
    }
    window.location.href = "tel:+16475617045";
  };

  const renderSwatch = (id: FinishId) => {
    const f = FINISHES[id];
    const active = id === finish;
    return (
      <button
        key={id}
        type="button"
        onClick={() => setFinish(id)}
        aria-pressed={active}
        className={cn(
          "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors",
          active
            ? "border-foreground/70 bg-foreground/5 text-foreground"
            : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
        )}
      >
        <span
          className="h-4 w-4 shrink-0 rounded-full border border-black/10 shadow-inner"
          style={{
            background:
              f.kind === "metal"
                ? `linear-gradient(135deg, #ffffff 0%, ${f.swatch} 38%, #8f9498 62%, ${f.swatch} 100%)`
                : f.swatch,
          }}
        />
        {f.shortLabel}
      </button>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="configurator"
      className="w-full bg-background py-20"
    >
      <div className="container mx-auto px-4">
        <div className="mb-10 max-w-2xl">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Configure
          </p>
          <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
            Build Your Ladder Pull
          </h2>
          <p className="text-muted-foreground">
            Every pull is made to order. Choose your finish and length, then see
            it from every angle before you request a quote.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Viewport */}
          <div className="relative min-h-[440px] overflow-hidden rounded-xl border border-border bg-muted/30 lg:min-h-[620px]">
            {inView ? (
              <Suspense fallback={<ViewerFallback />}>
                <LadderPullViewer
                  lengthIn={lengthIn}
                  finish={finish}
                  className="absolute inset-0 h-full w-full"
                />
              </Suspense>
            ) : (
              <ViewerFallback />
            )}
            <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1 text-[11px] text-muted-foreground backdrop-blur">
              Drag to orbit · scroll to zoom
            </div>
          </div>

          {/* Controls */}
          <aside className="flex flex-col gap-8 rounded-xl border border-border bg-card p-6">
            <div>
              <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Your configuration
              </p>
              <p className="text-sm font-medium leading-snug">{summary}</p>
            </div>

            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Metal finish
              </p>
              <div className="mb-5 flex flex-wrap gap-2">
                {METAL_FINISH_IDS.map(renderSwatch)}
              </div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Powder coat
              </p>
              <div className="flex flex-wrap gap-2">
                {POWDER_FINISH_IDS.map(renderSwatch)}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Overall length
                </p>
                <div className="flex overflow-hidden rounded-md border border-border text-[11px]">
                  {(["in", "mm"] as Unit[]).map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setUnit(u)}
                      aria-pressed={unit === u}
                      className={cn(
                        "px-2 py-1 transition-colors",
                        unit === u
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4 text-3xl font-semibold tabular-nums">
                {formatLength(lengthIn, unit)}
              </div>

              <Slider
                value={[lengthIn]}
                min={LADDER_PULL_SPEC.minLengthIn}
                max={LADDER_PULL_SPEC.maxLengthIn}
                step={1}
                onValueChange={([v]) => setLengthIn(v)}
                aria-label="Overall length in inches"
              />

              <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
                <span>{formatLength(LADDER_PULL_SPEC.minLengthIn, unit)}</span>
                <span>{formatLength(LADDER_PULL_SPEC.maxLengthIn, unit)}</span>
              </div>
            </div>

            <dl className="space-y-2 border-t border-border pt-5 text-xs">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Tube diameter</dt>
                <dd className="font-medium">
                  {formatLength(LADDER_PULL_SPEC.tubeOuterDiameterIn, unit)} OD
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Standoff offset</dt>
                <dd className="font-medium">
                  {formatLength(LADDER_PULL_SPEC.standoffOffsetIn, unit)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Standoff inset</dt>
                <dd className="font-medium">
                  {formatLength(standoffInsetIn(lengthIn), unit)} from each end
                </dd>
              </div>
            </dl>

            <Button variant="luxury" className="w-full" onClick={handleQuote}>
              Request a Quote
            </Button>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default LadderPullConfigurator;
