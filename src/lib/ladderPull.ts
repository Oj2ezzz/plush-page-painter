/**
 * Ladder pull product spec + finish catalogue.
 *
 * Deliberately free of any `three` imports so the configurator UI can read
 * these values without pulling the 3D bundle into the initial page load.
 */

export const LADDER_PULL_SPEC = {
  /** Outer diameter of the tubing. */
  tubeOuterDiameterIn: 1.3125,
  /** Thickness of the glass door rendered between the two tubes. */
  glassThicknessIn: 0.5,
  /** Distance from the glass face to the tube centreline. */
  standoffOffsetIn: 2.75,

  minLengthIn: 18,
  maxLengthIn: 96,
  defaultLengthIn: 72,

  /**
   * How far each standoff sits in from the tube end.
   *
   * TODO — UNCONFIRMED. Currently a fraction of overall length, which means a
   * 96" pull gets a 14.4" overhang and an 18" pull gets 2.7". Most ladder pulls
   * use a FIXED overhang instead. To switch, set `standoffInsetFixedIn` to the
   * real number of inches; it takes priority over the fraction.
   */
  standoffInsetFraction: 0.15,
  standoffInsetFixedIn: null as number | null,

  /** Render the translucent glass door showing back-to-back mounting. */
  showGlass: true,
} as const;

/** Resolves the standoff inset for a given overall length, in inches. */
export function standoffInsetIn(lengthIn: number): number {
  const fixed = LADDER_PULL_SPEC.standoffInsetFixedIn;
  if (fixed !== null) {
    // Never let a fixed inset push the standoffs past the midpoint.
    return Math.min(fixed, lengthIn * 0.45);
  }
  return lengthIn * LADDER_PULL_SPEC.standoffInsetFraction;
}

export type FinishKind = "metal" | "powder";

export interface Finish {
  /** Full name, used in the configuration summary. */
  label: string;
  /** Short name, used on the swatch button. */
  shortLabel: string;
  /** CSS colour for the swatch dot. */
  swatch: string;
  kind: FinishKind;
  /** Base colour as a three.js hex literal. */
  color: number;
  metalness: number;
  roughness: number;
  /** Apply the directional brushed-grain roughness map. */
  brushed: boolean;
  /** Environment map intensity. */
  env: number;
}

export const FINISHES = {
  brushed: {
    label: "Brushed / Clear Anodized",
    shortLabel: "Brushed",
    swatch: "#c9cdcf",
    kind: "metal",
    color: 0xd7dadb,
    metalness: 0.92,
    roughness: 0.3,
    brushed: true,
    env: 1.15,
  },
  polished: {
    label: "Polished",
    shortLabel: "Polished",
    swatch: "#eef1f2",
    kind: "metal",
    color: 0xf3f6f7,
    metalness: 1.0,
    roughness: 0.025,
    brushed: false,
    env: 1.7,
  },
  black: {
    label: "Black",
    shortLabel: "Black",
    swatch: "#1d1e1f",
    kind: "powder",
    color: 0x1b1c1d,
    metalness: 0.06,
    roughness: 0.48,
    brushed: false,
    env: 0.5,
  },
  gold: {
    label: "Gold",
    shortLabel: "Gold",
    swatch: "#b8912f",
    kind: "powder",
    color: 0xa9862c,
    metalness: 0.06,
    roughness: 0.48,
    brushed: false,
    env: 0.5,
  },
  silver: {
    label: "Silver",
    shortLabel: "Silver",
    swatch: "#b6babb",
    kind: "powder",
    color: 0xb0b4b6,
    metalness: 0.06,
    roughness: 0.48,
    brushed: false,
    env: 0.5,
  },
  red: {
    label: "Red",
    shortLabel: "Red",
    swatch: "#9a2420",
    kind: "powder",
    color: 0x8e211d,
    metalness: 0.06,
    roughness: 0.48,
    brushed: false,
    env: 0.5,
  },
  blue: {
    label: "Blue",
    shortLabel: "Blue",
    swatch: "#20406f",
    kind: "powder",
    color: 0x1d3a66,
    metalness: 0.06,
    roughness: 0.48,
    brushed: false,
    env: 0.5,
  },
  champagne: {
    label: "Champagne",
    shortLabel: "Champagne",
    swatch: "#cfbc9d",
    kind: "powder",
    color: 0xc7b494,
    metalness: 0.06,
    roughness: 0.48,
    brushed: false,
    env: 0.5,
  },
  bronze: {
    label: "Bronze",
    shortLabel: "Bronze",
    swatch: "#6c4a2f",
    kind: "powder",
    color: 0x63432a,
    metalness: 0.06,
    roughness: 0.48,
    brushed: false,
    env: 0.5,
  },
} satisfies Record<string, Finish>;

export type FinishId = keyof typeof FINISHES;

export const METAL_FINISH_IDS = (Object.keys(FINISHES) as FinishId[]).filter(
  (id) => FINISHES[id].kind === "metal",
);

export const POWDER_FINISH_IDS = (Object.keys(FINISHES) as FinishId[]).filter(
  (id) => FINISHES[id].kind === "powder",
);

/** Formats a length for display in the user's chosen unit. */
export function formatLength(inches: number, unit: "in" | "mm"): string {
  return unit === "in"
    ? `${Math.round(inches)}"`
    : `${Math.round(inches * 25.4)} mm`;
}

/** Human-readable summary of a configuration, e.g. for a quote request. */
export function describeConfiguration(
  lengthIn: number,
  finishId: FinishId,
  unit: "in" | "mm" = "in",
): string {
  const f = FINISHES[finishId];
  const finishText = f.kind === "metal" ? f.label : `${f.label} powder coat`;
  return `Ladder Pull — ${formatLength(lengthIn, unit)} — ${finishText}`;
}
