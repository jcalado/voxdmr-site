export type RadioStatus = "full" | "partial" | "experimental" | "pending";
export type AudioQuality = "good" | "ok" | "poor";

/**
 * Hardware feature support:
 * - "yes"     — present and works (earns the feature's weight)
 * - "no"      — present but doesn't work (earns 0, still counted)
 * - "na"      — the radio doesn't have this feature (excluded from the score)
 * - "unknown" — not tested yet (earns 0, still counted)
 */
export type Support = "yes" | "no" | "na" | "unknown";

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
  ptt: Support;
  knob: Support;
  sideKeys: Support;
  /** null = not tested yet (rendered as an em dash). */
  audio: AudioQuality | null;
  androidVersion: string | null;
  testedAppVersion: string | null;
  /** ISO date (YYYY-MM-DD) the radio was last verified. Optional. */
  testDate?: string;
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
    ptt: "yes",
    knob: "yes",
    sideKeys: "yes",
    audio: "good",
    androidVersion: "12",
    testedAppVersion: "0.12.0",
    testDate: "2026-07-05",
    status: "full",
  },
  {
    id: "mkmxptt-1b-wli0-oqsk",
    name: "MKMXPTT 1B-WLI0-OQSK",
    model: "1B-WLI0-OQSK",
    maker: "MKMXPTT",
    image: "/radios/mkmxptt-1b-wli0-oqsk.jpg",
    ptt: "yes",
    knob: "yes",
    sideKeys: "yes",
    audio: "good",
    androidVersion: "9",
    testedAppVersion: "0.12.0",
    testDate: "2026-06-11",
    status: "full",
  },
  {
    id: "inrico-t320",
    name: "Inrico T320",
    model: "T320",
    maker: "Inrico",
    makerUrl: "https://www.inrico.ca/t320",
    image: "/radios/inrico-t320.jpg",
    ptt: "yes",
    knob: "na",
    sideKeys: "unknown",
    audio: "good",
    androidVersion: "7",
    testedAppVersion: "0.12.0",
    testDate: "2026-06-11",
    status: "partial",
  },
  {
    id: "inrico-s200",
    name: "Inrico S200",
    model: "S200",
    maker: "Inrico",
    makerUrl: "https://www.inrico.ca/s200",
    image: "/radios/inrico-s200.webp",
    ptt: "yes",
    knob: "na",
    sideKeys: "yes",
    audio: "good",
    androidVersion: null,
    testedAppVersion: "0.12.0",
    testDate: "2026-06-12",
    status: "full",
  },
  {
    id: "inrico-s100",
    name: "Inrico S100",
    model: "S100",
    maker: "Inrico",
    makerUrl: "https://www.inricosolutions.com/products/S100.html",
    image: "/radios/inrico-s100.webp",
    ptt: "yes",
    knob: "na",
    sideKeys: "yes",
    audio: "good",
    androidVersion: "8.1",
    testedAppVersion: "0.12.0",
    testDate: "2026-06-12",
    status: "full",
  },
  {
    id: "ksun-zl65",
    name: "KSUN ZL65",
    model: "ZL65",
    maker: "KSUN",
    makerUrl: "http://www.qzksun.com",
    image: "/radios/ksun-zl65.jpg",
    ptt: "yes",
    knob: "yes",
    sideKeys: "yes",
    audio: "ok",
    androidVersion: "9",
    testedAppVersion: "0.12.0",
    testDate: "2026-06-12",
    status: "full",
  },
  {
    id: "hytera-pnc380",
    name: "Hytera PNC380",
    model: "PNC380",
    maker: "Hytera",
    makerUrl: "https://www.hytera.com/en/product-new/lte-broadband/poc-radio/pnc380.html",
    image: "/radios/hytera-pnc380.webp",
    ptt: "yes",
    knob: "na",
    sideKeys: "unknown",
    audio: "good",
    androidVersion: null,
    testedAppVersion: "0.12.0",
    testDate: "2026-06-13",
    status: "partial",
  },
  {
    id: "anysecu-t59",
    name: "Anysecu T59",
    model: "T59",
    maker: "Anysecu",
    makerUrl: "https://www.szanysecu.com/h-pd-254.html",
    image: "/radios/anysecu-t59.jpg",
    ptt: "yes",
    knob: "unknown",
    sideKeys: "unknown",
    audio: "good",
    androidVersion: null,
    testedAppVersion: "0.12.0",
    testDate: "2026-06-13",
    status: "partial",
  },
  {
    id: "blackview-xplore-1",
    name: "Blackview XPLORE 1",
    model: "XPLORE 1",
    maker: "Blackview",
    makerUrl: "https://www.blackview.hk/products/item/xplore1",
    image: "/radios/blackview-xplore-1.webp",
    ptt: "yes",
    knob: "na",
    sideKeys: "yes",
    audio: "good",
    androidVersion: null,
    testedAppVersion: "0.12.0",
    testDate: "2026-06-18",
    status: "full",
  },
  {
    id: "anysecu-w6-pro",
    name: "Anysecu W6 Pro",
    model: "W6 Pro",
    maker: "Anysecu",
    makerUrl: "https://www.szanysecu.com",
    image: "/radios/anysecu-w6-pro.webp",
    ptt: "yes",
    knob: "yes",
    sideKeys: "yes",
    audio: "good",
    androidVersion: "10",
    testedAppVersion: "0.12.0",
    testDate: "2026-06-16",
    status: "full",
  },
  {
    id: "anysecu-w6-plus",
    name: "Anysecu W6+",
    model: "W6+",
    maker: "Anysecu",
    makerUrl: "https://www.szanysecu.com",
    image: "/radios/anysecu-w6-plus.webp",
    ptt: "yes",
    knob: "no",
    sideKeys: "yes",
    audio: "good",
    androidVersion: "10",
    testedAppVersion: "0.12.0",
    testDate: "2026-06-17",
    status: "partial",
  },
  {
    id: "inrico-tm7",
    name: "Inrico TM7",
    model: "TM7",
    maker: "Inrico",
    makerUrl: "https://www.inrico.ca",
    image: "/radios/inrico-tm7.webp",
    ptt: "yes",
    knob: "unknown",
    sideKeys: "unknown",
    audio: "good",
    androidVersion: "11",
    testedAppVersion: "0.12.0",
    testDate: "2026-06-13",
    status: "partial",
  },
  {
    id: "inrico-tm9",
    name: "Inrico TM9",
    model: "TM9",
    maker: "Inrico",
    makerUrl: "https://www.inrico.ca",
    image: "/radios/inrico-tm9.webp",
    ptt: "yes",
    knob: "unknown",
    sideKeys: "unknown",
    audio: "good",
    androidVersion: "7.1.1",
    testedAppVersion: "0.12.0",
    testDate: "2026-06-13",
    status: "partial",
  },
  {
    id: "inrico-t310",
    name: "Inrico T310",
    model: "T310",
    maker: "Inrico",
    makerUrl: "https://www.inrico.ca",
    image: "/radios/inrico-t310.webp",
    ptt: "yes",
    knob: "no",
    sideKeys: "yes",
    audio: "poor",
    androidVersion: "9",
    testedAppVersion: "0.10.0",
    testDate: "2026-06-14",
    status: "partial",
  },
  {
    id: "uniwa-f400",
    name: "UNIWA F400",
    model: "F400",
    maker: "UNIWA",
    image: "/radios/uniwa-f400.webp",
    ptt: "yes",
    knob: "no",
    sideKeys: "yes",
    audio: "good",
    androidVersion: "15",
    testedAppVersion: "0.12.0",
    testDate: "2026-06-13",
    status: "partial",
  },
  {
    id: "hytera-p60",
    name: "Hytera P60",
    model: "P60",
    maker: "Hytera",
    makerUrl: "https://www.hytera.com/en/product-new/lte-broadband/poc-radio/p60.html",
    image: "/radios/hytera-p60.webp",
    ptt: "yes",
    knob: "yes",
    sideKeys: "yes",
    audio: "good",
    androidVersion: "12",
    testedAppVersion: "0.13.2",
    testDate: "2026-07-11",
    status: "full",
  },
  {
    id: "anysecu-w8",
    name: "Anysecu W8",
    model: "W8",
    maker: "Anysecu",
    makerUrl: "https://www.szanysecu.com",
    image: "/radios/anysecu-w8.webp",
    ptt: "yes",
    knob: "no",
    sideKeys: "no",
    audio: "good",
    androidVersion: "8.1.0",
    testedAppVersion: "0.12.0",
    testDate: "2026-07-05",
    status: "partial",
  },
  {
    id: "sonim-xp8800",
    name: "Sonim XP8800",
    model: "XP8800",
    maker: "Sonim",
    makerUrl: "https://www.sonimtech.com",
    image: "/radios/sonim-xp8800.webp",
    ptt: "yes",
    knob: "na",
    sideKeys: "yes",
    audio: "good",
    androidVersion: "10",
    testedAppVersion: "0.12.0",
    testDate: "2026-07-05",
    status: "partial",
  },
];

/** Each scorable feature's maximum weight; the audio weight is earned partially by quality. */
const FEATURE_WEIGHTS = { ptt: 30, knob: 25, sideKeys: 20, audio: 25 } as const;
const AUDIO_EARNED: Record<AudioQuality, number> = { good: 25, ok: 15, poor: 5 };

export type ScoreKey = "ptt" | "knob" | "sideKeys" | "audio";

export interface ScorePart {
  key: ScoreKey;
  /** Points this feature contributes to the score. */
  earned: number;
  /** This feature's maximum points. */
  weight: number;
  /** Whether the feature counts toward the score. False only when the radio lacks it ("na"). */
  counted: boolean;
  /** Raw state for display: a Support value, or an AudioQuality, or "unknown". */
  state: Support | AudioQuality;
}

function featurePart(key: Exclude<ScoreKey, "audio">, s: Support): ScorePart {
  const weight = FEATURE_WEIGHTS[key];
  if (s === "na") return { key, earned: 0, weight, counted: false, state: "na" };
  return { key, earned: s === "yes" ? weight : 0, weight, counted: true, state: s };
}

/** Per-feature scoring breakdown, the single source of truth for the score and its tooltip. */
export function scoreParts(r: Radio): ScorePart[] {
  return [
    featurePart("ptt", r.ptt),
    featurePart("knob", r.knob),
    featurePart("sideKeys", r.sideKeys),
    {
      key: "audio",
      earned: r.audio ? AUDIO_EARNED[r.audio] : 0,
      weight: FEATURE_WEIGHTS.audio,
      counted: true,
      state: r.audio ?? "unknown",
    },
  ];
}

/**
 * How well a radio works with VoxDMR, scored 0–100 as a percentage of the features it
 * actually has. Features the radio lacks ("na") are excluded from the denominator, so a
 * radio without (say) a rotary knob is judged only on the features it does provide.
 * Returns null when nothing has been measured yet (e.g. testing pending).
 */
export function performanceScore(r: Radio): number | null {
  const parts = scoreParts(r);
  const hasKnown = parts.some((p) => p.state !== "unknown" && p.state !== "na");
  if (!hasKnown) return null;
  const counted = parts.filter((p) => p.counted);
  const total = counted.reduce((sum, p) => sum + p.weight, 0);
  if (total === 0) return null;
  return Math.round((counted.reduce((sum, p) => sum + p.earned, 0) / total) * 100);
}
