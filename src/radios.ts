export type RadioStatus = "full" | "partial" | "experimental" | "pending";
export type AudioQuality = "good" | "ok" | "poor";

export interface Radio {
  /** kebab-case; used as the React key and the `radios.notes.<id>` i18n key. */
  id: string;
  /** Full display name, e.g. "Hytera P50". Proper noun — not translated. */
  name: string;
  /** Model designation only, e.g. "P50". Used for sorting; falls back to name. Optional. */
  model?: string;
  /** Manufacturer / brand name, e.g. "Hytera". Optional. */
  maker?: string;
  /** Manufacturer / product page URL. Optional; renders an external link when set. */
  makerUrl?: string;
  /** Path to a product image under /public, e.g. "/radios/hytera-p50.png". Optional; renders a thumbnail when set. */
  image?: string;
  /** null = unknown / not yet tested (rendered as an em dash). */
  ptt: boolean | null;
  knob: boolean | null;
  sideKeys: boolean | null;
  audio: AudioQuality | null;
  androidVersion: string | null;
  testedAppVersion: string | null;
  status: RadioStatus;
}

export const radios: Radio[] = [
  {
    id: "hytera-p50",
    name: "Hytera P50",
    model: "P50",
    maker: "Hytera",
    makerUrl: "https://www.hytera.com/en/product-new/lte-broadband/poc-radio/p50.html",
    image: "/radios/hytera-p50.png",
    ptt: true,
    knob: true,
    sideKeys: false,
    audio: "good",
    androidVersion: "12",
    testedAppVersion: "0.11.0",
    status: "full",
  },
  {
    id: "mkmxptt-1b-wli0-oqsk",
    name: "MKMXPTT 1B-WLI0-OQSK",
    model: "1B-WLI0-OQSK",
    maker: "MKMXPTT",
    ptt: true,
    knob: true,
    sideKeys: true,
    audio: "good",
    androidVersion: "9",
    testedAppVersion: "0.11.0",
    status: "full",
  },
  {
    id: "ksun-zl65",
    name: "KSUN ZL65",
    model: "ZL65",
    maker: "KSUN",
    image: "/radios/ksun-zl65.jpg",
    ptt: null,
    knob: null,
    sideKeys: null,
    audio: null,
    androidVersion: null,
    testedAppVersion: null,
    status: "pending",
  },
];

/** Max attainable {@link performanceScore}, kept here so weights stay in one place. */
const SCORE_WEIGHTS = { ptt: 30, knob: 25, sideKeys: 20, audioGood: 25, audioOk: 15, audioPoor: 5 };

/**
 * How well a radio works with VoxDMR, scored 0–100 from its measured hardware support.
 * Returns null for radios with no measured fields yet (e.g. testing pending), which
 * callers sort to the end.
 */
export function performanceScore(r: Radio): number | null {
  if (r.ptt === null && r.knob === null && r.sideKeys === null && r.audio === null) {
    return null;
  }
  let score = 0;
  if (r.ptt) score += SCORE_WEIGHTS.ptt;
  if (r.knob) score += SCORE_WEIGHTS.knob;
  if (r.sideKeys) score += SCORE_WEIGHTS.sideKeys;
  if (r.audio === "good") score += SCORE_WEIGHTS.audioGood;
  else if (r.audio === "ok") score += SCORE_WEIGHTS.audioOk;
  else if (r.audio === "poor") score += SCORE_WEIGHTS.audioPoor;
  return score;
}
