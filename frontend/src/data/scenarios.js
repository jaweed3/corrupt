import { HAYES_STORY } from "./stories";

export const SCENARIOS = [
  {
    id: "hayes",
    title: "Bayangan di Balik Meja Marmer",
    subtitle: "Kisah Mr. Hayes",
    description: "Seorang pejabat kecil di kejaksaan agung...",
    difficulty: "Normal",
    locked: false,
    nodes: HAYES_STORY,
  },
  {
    id: "locked_1",
    title: "Operasi Senyap",
    subtitle: "Kisah Agen Rahasia",
    description: "Skenario ini belum tersedia...",
    difficulty: "Sulit",
    locked: true,
    nodes: null,
  },
  {
    id: "locked_2",
    title: "Runtuhnya Oligarki",
    subtitle: "Kisah Aktivis",
    description: "Memimpin pergerakan dari jalanan menuju istana negara...",
    difficulty: "Extreme",
    locked: true,
    nodes: null,
  },
];
