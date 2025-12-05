import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Skull,
  AlertTriangle,
  Award,
  Home,
  RefreshCcw,
  Lock,
  FileText,
  ArrowLeft,
  Play,
  LogOut,
  Power,
  Users,
  DollarSign,
  BookOpen,
  Menu,
  X,
  Info,
  ChevronRight,
} from "lucide-react";

// ==========================================
// 1. DATA & DATABASE
// ==========================================

const CREATORS = [
  {
    id: 1,
    name: "Alpha",
    role: "Lead Developer",
    quote: "Kode adalah hukum.",
    color: "border-blue-500",
  },
  {
    id: 2,
    name: "Beta",
    role: "UI/UX Designer",
    quote: "Estetika korupsi.",
    color: "border-purple-500",
  },
  {
    id: 3,
    name: "Gamma",
    role: "Story Writer",
    quote: "Narasi kekuasaan.",
    color: "border-amber-500",
  },
  {
    id: 4,
    name: "Delta",
    role: "QA Engineer",
    quote: "Mencari celah.",
    color: "border-green-500",
  },
];

const HAYES_STORY = {
  start: {
    title: "Babak 1: Dilema Gaji dan Janji",
    text: "Mr. Hayes bekerja pada kejaksaan agung negara Estambor. Gajinya tergerus habis oleh cicilan dan gaya hidup. Biasanya ada 'uang lelah', tapi kini meja kerjanya sepi. Ia butuh uang untuk hutang dan menjaga citra.",
    choices: [
      {
        text: "Membuka kasus elit untuk uang tutup mulut",
        effect: { money: 50000, trust: -35, risk: 10 },
        nextId: "babak2_pathA",
      },
      {
        text: "Restrukturisasi & peningkatan anggaran kerja resmi",
        effect: { money: 20000, trust: 30, risk: -10 },
        nextId: "babak2_pathB",
      },
    ],
  },
  babak2_pathA: {
    title: "Babak 2: Ambisi Legislatif (Jalur Uang Panas)",
    text: "Mr. Hayes mendapatkan uang dari perusahaan elit, namun dihantui rasa takut skandal. Untuk mengamankan posisi, ia ingin mengajukan diri sebagai anggota legislatif.",
    choices: [
      {
        text: "Mundur & bangun jaringan hukum, kampanye integritas",
        effect: { money: -15000, trust: 20, risk: 5 },
        nextId: "babak3_pathA",
      },
      {
        text: "Cari sponsor politik kuat, dana hitam & intimidasi",
        effect: { money: -5000, trust: 10, risk: 45 },
        nextId: "babak3_pathB",
      },
    ],
  },
  babak2_pathB: {
    title: "Babak 2: Ambisi Legislatif (Jalur Reputasi)",
    text: "Setelah menyelesaikan kasus besar dan reputasi naik, Mr. Hayes merasa uangnya masih kurang. Ia berpikir untuk menjabat anggota legislatif demi gaji lebih besar.",
    choices: [
      {
        text: "Mundur & bangun jaringan hukum, kampanye integritas",
        effect: { money: -15000, trust: 20, risk: 5 },
        nextId: "babak3_pathA",
      },
      {
        text: "Cari sponsor politik kuat, dana hitam & intimidasi",
        effect: { money: -5000, trust: 10, risk: 45 },
        nextId: "babak3_pathB",
      },
    ],
  },
  babak3_pathA: {
    title: "Babak 3: Konflik Dewan (Jalur Pengaruh)",
    text: "Mr. Hayes terpilih. Dalam rapat penting, ia berdiskusi masalah yang bisa mendatangkan uang. Namun, banyak anggota dewan kontra.",
    choices: [
      {
        text: "Gunakan pengaruh dan kompromi politik",
        effect: { money: 40000, trust: 35, risk: 20 },
        nextId: "babak4_pathA",
      },
      {
        text: "Manipulasi dan intimidasi lawan",
        effect: { money: 30000, trust: 35, risk: 35 },
        nextId: "babak4_pathB",
      },
    ],
  },
  babak3_pathB: {
    title: "Babak 3: Konflik Dewan (Jalur Keras)",
    text: "Terpilih dengan sponsor politik membuat Mr. Hayes ditekan partai. Dalam rapat besar, ia dihadang argumen keras oposisi.",
    choices: [
      {
        text: "Gunakan pengaruh dan kompromi politik",
        effect: { money: 40000, trust: 35, risk: 20 },
        nextId: "babak4_pathA",
      },
      {
        text: "Manipulasi dan intimidasi lawan",
        effect: { money: 30000, trust: 35, risk: 35 },
        nextId: "babak4_pathB",
      },
    ],
  },
  babak4_pathA: {
    title: "Babak 4: Dilema Kesetiaan (Pasca Kompromi)",
    text: "Kasus dimenangkan. Namun, teman dekat Mr. Hayes terjerat kasus pemerasan. Mr. Hayes ingin membantu.",
    choices: [
      {
        text: "Dorong transparansi & bentuk tim hukum",
        effect: { money: -15000, trust: 20, risk: 5 },
        nextId: "babak5_pathA",
      },
      {
        text: "Intervensi politik, suap, & kambing hitamkan korban",
        effect: { money: -20000, trust: -20, risk: 15 },
        nextId: "babak5_pathB",
      },
    ],
  },
  babak4_pathB: {
    title: "Babak 4: Dilema Kesetiaan (Pasca Manipulasi)",
    text: "Manipulasi berhasil. Namun, teman dekat Mr. Hayes terjerat pemerasan. Jika ia jatuh, jaringan gelap Mr. Hayes bisa terbongkar.",
    choices: [
      {
        text: "Dorong transparansi & bentuk tim hukum",
        effect: { money: -15000, trust: 20, risk: 5 },
        nextId: "babak5_pathA",
      },
      {
        text: "Intervensi politik, suap, & kambing hitamkan korban",
        effect: { money: -20000, trust: -20, risk: 15 },
        nextId: "babak5_pathB",
      },
    ],
  },
  babak5_pathA: {
    title: "Babak 5: Godaan Proyek Jembatan (Pasca Transparansi)",
    text: "Dana menipis. Ada peluang emas: Proyek Jembatan Nasional. Ada potensi untung pribadi 2% jika dimanipulasi.",
    choices: [
      {
        text: "Jaga integritas proyek & reputasi",
        effect: { money: 10000, trust: 40, risk: -15 },
        nextId: "babak6_pathA",
      },
      {
        text: "Potong 2%, pakai bahan murah & manipulasi laporan",
        effect: { money: 30000, trust: 25, risk: 40 },
        nextId: "babak6_pathB",
      },
    ],
  },
  babak5_pathB: {
    title: "Babak 5: Godaan Proyek Jembatan (Pasca Suap)",
    text: "Teman selamat lewat jalur gelap, tapi reputasi hancur. Proyek Jembatan Nasional muncul sebagai cara membeli kembali kepercayaan publik.",
    choices: [
      {
        text: "Jaga integritas proyek & reputasi",
        effect: { money: 10000, trust: 40, risk: -15 },
        nextId: "babak6_pathA",
      },
      {
        text: "Potong 2%, pakai bahan murah & manipulasi laporan",
        effect: { money: 30000, trust: 25, risk: 40 },
        nextId: "babak6_pathB",
      },
    ],
  },
  babak6_pathA: {
    title: "Babak 6: Ambisi Jenderal (Jalur Bersih)",
    text: "Reputasi stabil. Mr. Hayes kini mengincar posisi 'Jenderal Keamanan' yang bergengsi.",
    choices: [
      {
        text: "Bangun koalisi politik & reformasi keamanan",
        effect: { money: -10000, trust: 30, risk: 15 },
        nextId: "babak7_pathA",
      },
      {
        text: "Sewa pasukan bayaran & kolusi militer pensiunan",
        effect: { money: -20000, trust: 40, risk: 30 },
        nextId: "babak7_pathB",
      },
    ],
  },
  babak6_pathB: {
    title: "Babak 6: Ambisi Jenderal (Jalur Korupsi)",
    text: "Kaya raya dari korupsi jembatan, tapi gelisah. Jabatan Jenderal Keamanan menawarkan kekebalan hukum.",
    choices: [
      {
        text: "Bangun koalisi politik & reformasi keamanan",
        effect: { money: -10000, trust: 30, risk: 15 },
        nextId: "babak7_pathA",
      },
      {
        text: "Sewa pasukan bayaran & kolusi militer pensiunan",
        effect: { money: -20000, trust: 40, risk: 30 },
        nextId: "babak7_pathB",
      },
    ],
  },
  babak7_pathA: {
    title: "Babak 7: Mengamankan Posisi (Pasca Reformasi)",
    text: "PM ingin membubarkan jabatan Jenderal. Lawan politik menginginkan kekuasaan.",
    choices: [
      {
        text: "Koersi & beli dukungan komite",
        effect: { money: -10000, trust: 10, risk: 35 },
        nextId: "babak8_pathA",
      },
      {
        text: "Buktikan nilai dengan aksi nyata operasi cepat",
        effect: { money: -10000, trust: 35, risk: -10 },
        nextId: "babak8_pathB",
      },
    ],
  },
  babak7_pathB: {
    title: "Babak 7: Mengamankan Posisi (Pasca Pasukan Bayaran)",
    text: "Langkah pasukan bayaran dianggap kudeta oleh PM. Jabatan terancam.",
    choices: [
      {
        text: "Koersi & beli dukungan komite",
        effect: { money: -10000, trust: 10, risk: 35 },
        nextId: "babak8_pathA",
      },
      {
        text: "Buktikan nilai dengan aksi nyata operasi cepat",
        effect: { money: -10000, trust: 35, risk: -10 },
        nextId: "babak8_pathB",
      },
    ],
  },
  babak8_pathA: {
    title: "Babak 8: Anggaran Keamanan (Pasca Beli Dukungan)",
    text: "Jabatan aman tapi dana habis. Hayes mengajukan anggaran alat perang fantastis. Ada peluang mark-up.",
    choices: [
      {
        text: "Mark-up 5% & kompromi loyalitas",
        effect: { money: 50000, trust: -5, risk: 25 },
        nextId: "babak9_pathA",
      },
      {
        text: "Pengadaan 100% & reward profesional",
        effect: { money: -5000, trust: 25, risk: -5 },
        nextId: "babak9_pathB",
      },
    ],
  },
  babak8_pathB: {
    title: "Babak 8: Anggaran Keamanan (Pasca Aksi Nyata)",
    text: "Jabatan aman karena prestasi. Anggaran disetujui. Ada godaan mark-up 5% sebagai 'hadiah'.",
    choices: [
      {
        text: "Mark-up 5% & kompromi loyalitas",
        effect: { money: 50000, trust: -5, risk: 25 },
        nextId: "babak9_pathA",
      },
      {
        text: "Pengadaan 100% & reward profesional",
        effect: { money: -5000, trust: 25, risk: -5 },
        nextId: "babak9_pathB",
      },
    ],
  },
  babak9_pathA: {
    title: "Babak 9: Menuju PM (Pasca Korupsi)",
    text: "Kaya raya, Hayes ingin jadi Perdana Menteri. Rakyat mendesak PM lama turun.",
    choices: [
      {
        text: "Bangun koalisi & kampanye data",
        effect: { money: -1000, trust: 30, risk: 10 },
        nextId: "babak10_pathA",
      },
      {
        text: "Kolusi dengan penegak hukum & disinformasi",
        effect: { money: -1500, trust: -20, risk: 10 },
        nextId: "babak10_pathB",
      },
    ],
  },
  babak9_pathB: {
    title: "Babak 9: Menuju PM (Pasca Bersih)",
    text: "Reputasi bersih membuat Hayes populer. Ia ingin jadi PM untuk kebebasan berpendapat.",
    choices: [
      {
        text: "Bangun koalisi & kampanye data",
        effect: { money: -1000, trust: 30, risk: 10 },
        nextId: "babak10_pathA",
      },
      {
        text: "Kolusi dengan penegak hukum & disinformasi",
        effect: { money: -1500, trust: -20, risk: 10 },
        nextId: "babak10_pathB",
      },
    ],
  },
  babak10_pathA: {
    title: "Babak 10: Ujian Kursi PM (Pasca Koalisi)",
    text: "Hayes jadi PM! Tapi koalisi rentan. Muncul isu demonstrasi besar.",
    choices: [
      {
        text: "Dialog, reformasi, transparansi total",
        effect: { money: -15000, trust: 40, risk: 20 },
        nextId: "victory_good",
      },
      {
        text: "Konfrontasi & beli suara parlemen/media",
        effect: { money: -20000, trust: 20, risk: 15 },
        nextId: "victory_bad",
      },
    ],
  },
  babak10_pathB: {
    title: "Babak 10: Ujian Kursi PM (Pasca Kolusi)",
    text: "Hayes jadi PM lewat jalur gelap. Pihak yang membantunya menuntut balas budi.",
    choices: [
      {
        text: "Dialog, reformasi, transparansi total",
        effect: { money: -15000, trust: 40, risk: 20 },
        nextId: "victory_good",
      },
      {
        text: "Konfrontasi & beli suara parlemen/media",
        effect: { money: -20000, trust: 20, risk: 15 },
        nextId: "victory_bad",
      },
    ],
  },
  victory_good: {
    title: "Akhir Cerita: Legenda Estambor",
    text: "Mr. Hayes berhasil melewati badai demonstrasi. Sejarah akan mencatatnya sebagai pemimpin yang bertahan di puncak.",
    isEnd: true,
  },
  victory_bad: {
    title: "Akhir Cerita: Tirani Besi",
    text: "Dengan uang dan kekuasaan, suara rakyat diredam. Mr. Hayes duduk di kursi Perdana Menteri, kesepian di puncak kekuasaan.",
    isEnd: true,
  },
};

const SCENARIOS = [
  {
    id: "hayes",
    title: "Bayangan di Balik Meja Marmer",
    subtitle: "Kisah Mr. Hayes",
    description:
      "Seorang pejabat kecil di kejaksaan agung yang terhimpit hutang. Apakah Anda akan menjaga integritas atau tenggelam dalam korupsi demi kekuasaan?",
    difficulty: "Normal",
    locked: false,
    nodes: HAYES_STORY,
  },
  {
    id: "locked_1",
    title: "Operasi Senyap",
    subtitle: "Kisah Agen Rahasia",
    description:
      "Skenario ini belum tersedia. Nantikan update selanjutnya untuk memainkan peran di balik layar intelijen negara.",
    difficulty: "Sulit",
    locked: true,
    nodes: null,
  },
  {
    id: "locked_2",
    title: "Runtuhnya Oligarki",
    subtitle: "Kisah Aktivis",
    description:
      "Memimpin pergerakan dari jalanan menuju istana negara. Kisah perjuangan melawan sistem yang korup.",
    difficulty: "Extreme",
    locked: true,
    nodes: null,
  },
];

// ==========================================
// 2. COMPONENTS (UI)
// ==========================================

const HUD = ({ stats }) => (
  <div className="grid grid-cols-3 gap-2 sm:gap-4 bg-slate-900/90 backdrop-blur border-b-2 border-amber-900/50 p-4 rounded-xl shadow-2xl animate-fade-in-down">
    <div className="flex items-center gap-3 justify-center">
      <div className="p-2 bg-green-900/20 rounded-lg text-green-500 ring-1 ring-green-900/50">
        <DollarSign size={20} />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
          Dana
        </span>
        <span className="text-lg font-mono font-bold text-green-400">
          ${stats.money.toLocaleString()}
        </span>
      </div>
    </div>
    <div className="flex items-center gap-3 justify-center border-x border-slate-800">
      <div className="p-2 bg-blue-900/20 rounded-lg text-blue-500 ring-1 ring-blue-900/50">
        <Users size={20} />
      </div>
      <div className="flex flex-col w-full max-w-[100px]">
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
          Kepercayaan
        </span>
        <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: `${stats.trust}%` }}
          ></div>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-3 justify-center">
      <div
        className={`p-2 rounded-lg ring-1 transition-colors ${
          stats.risk > 70
            ? "bg-red-900/20 text-red-500 ring-red-900/50 animate-pulse"
            : "bg-orange-900/20 text-orange-500 ring-orange-900/50"
        }`}
      >
        <AlertTriangle size={20} />
      </div>
      <div className="flex flex-col w-full max-w-[100px]">
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
          Risiko
        </span>
        <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              stats.risk > 70 ? "bg-red-500" : "bg-orange-500"
            }`}
            style={{ width: `${stats.risk}%` }}
          ></div>
        </div>
      </div>
    </div>
  </div>
);

const Navbar = ({ viewState, enterLobby, goToCredits, toggleMenu }) => {
  if (viewState === "SPLASH") return null;
  return (
    <nav className="w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50 p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={
            viewState === "LOBBY" || viewState === "CREDITS"
              ? enterLobby
              : () => toggleMenu(true)
          }
        >
          <div className="p-1.5 bg-amber-900/20 rounded border border-amber-900/50 group-hover:bg-amber-900/40 transition-colors">
            <Briefcase className="text-amber-500" size={20} />
          </div>
          <span className="font-bold text-lg tracking-widest text-slate-200 uppercase group-hover:text-amber-500 transition-colors">
            The Corrupt
          </span>
        </div>
        <div className="flex items-center gap-4">
          {viewState === "LOBBY" && (
            <button
              onClick={goToCredits}
              className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-800 rounded-full text-slate-400 hover:text-amber-500 transition-colors text-xs font-medium uppercase tracking-wide"
            >
              <Info size={16} /> <span>Tim</span>
            </button>
          )}
          {viewState !== "LOBBY" && viewState !== "CREDITS" && (
            <button
              onClick={() => toggleMenu(true)}
              className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
            >
              <Menu size={20} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

const StoryScreen = ({ currentNode, handleChoice }) => {
  if (!currentNode) return null;
  return (
    <div className="bg-slate-900/80 backdrop-blur border border-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl min-h-[400px] flex flex-col justify-between relative animate-fade-in">
      <div>
        <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
          <BookOpen size={20} className="text-amber-600" />
          <h2 className="text-lg sm:text-xl text-amber-500 font-bold uppercase tracking-widest">
            {currentNode.title}
          </h2>
        </div>
        <p className="text-lg leading-relaxed text-slate-300 font-light">
          {currentNode.text}
        </p>
      </div>
      <div className="mt-8 space-y-3">
        {currentNode.choices.map((choice, idx) => (
          <button
            key={idx}
            onClick={() => handleChoice(choice)}
            className="w-full text-left p-5 bg-slate-800/50 hover:bg-slate-800 border-l-4 border-slate-700 hover:border-amber-500 rounded-r-lg transition-all group relative overflow-hidden"
          >
            <div className="relative z-10">
              <span className="block font-bold text-slate-200 group-hover:text-amber-400 mb-2 text-lg">
                {choice.text}
              </span>
              <div className="flex flex-wrap gap-3 text-xs font-mono text-slate-500 group-hover:text-slate-400 transition-colors">
                <span
                  className={
                    choice.effect.money > 0 ? "text-green-400" : "text-red-400"
                  }
                >
                  ${choice.effect.money}
                </span>{" "}
                •
                <span
                  className={
                    choice.effect.trust > 0 ? "text-blue-400" : "text-red-400"
                  }
                >
                  Trust {choice.effect.trust > 0 ? "+" : ""}
                  {choice.effect.trust}
                </span>{" "}
                •
                <span
                  className={
                    choice.effect.risk > 0 ? "text-red-400" : "text-green-400"
                  }
                >
                  Risk {choice.effect.risk > 0 ? "+" : ""}
                  {choice.effect.risk}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 3. MAIN LOGIC & RENDER
// ==========================================

export default function App() {
  const [viewState, setViewState] = useState("SPLASH");
  const [selectedScenarioId, setSelectedScenarioId] = useState(null);
  const [currentNodeId, setCurrentNodeId] = useState("start");
  const [stats, setStats] = useState({ money: 10000, trust: 50, risk: 10 });
  const [history, setHistory] = useState([]);
  const [showFeedback, setShowFeedback] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeScenario = SCENARIOS.find((s) => s.id === selectedScenarioId);
  const currentNode = activeScenario?.nodes?.[currentNodeId];

  // Actions
  const handleChoice = (choice) => {
    const newStats = {
      money: stats.money + (choice.effect.money || 0),
      trust: Math.min(
        100,
        Math.max(0, stats.trust + (choice.effect.trust || 0))
      ),
      risk: Math.min(100, Math.max(0, stats.risk + (choice.effect.risk || 0))),
    };
    setStats(newStats);

    const changes = [];
    if (choice.effect.money)
      changes.push(
        `$${choice.effect.money > 0 ? "+" : ""}${choice.effect.money}`
      );
    if (choice.effect.trust)
      changes.push(
        `Trust ${choice.effect.trust > 0 ? "+" : ""}${choice.effect.trust}`
      );
    if (choice.effect.risk)
      changes.push(
        `Risk ${choice.effect.risk > 0 ? "+" : ""}${choice.effect.risk}`
      );
    setShowFeedback(changes.join(" | "));
    setTimeout(() => setShowFeedback(null), 2500);

    if (newStats.risk >= 100) {
      setViewState("GAMEOVER_RISK");
      return;
    }
    if (newStats.money < 0) {
      setViewState("GAMEOVER_MONEY");
      return;
    }

    const nextNode = activeScenario.nodes[choice.nextId];
    if (nextNode?.isEnd) {
      setCurrentNodeId(choice.nextId);
      setViewState("VICTORY");
    } else {
      setCurrentNodeId(choice.nextId);
    }
    setHistory([
      ...history,
      { title: activeScenario.nodes[currentNodeId].title, choice: choice.text },
    ]);
  };

  const startGame = () => {
    setViewState("PLAYING");
    setCurrentNodeId("start");
    setStats({ money: 10000, trust: 50, risk: 10 });
    setHistory([]);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-serif flex flex-col selection:bg-amber-900 selection:text-white overflow-x-hidden">
      <Navbar
        viewState={viewState}
        enterLobby={() => setViewState("LOBBY")}
        goToCredits={() => setViewState("CREDITS")}
        toggleMenu={setIsMenuOpen}
      />

      {/* OVERLAY MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="max-w-sm w-full bg-slate-900 border border-slate-700 p-8 rounded-lg shadow-2xl relative">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold text-center text-white mb-8 uppercase tracking-widest">
              Menu Sistem
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-full p-4 bg-amber-700 hover:bg-amber-600 text-white rounded font-bold flex items-center justify-center gap-3 transition-all"
              >
                <Play size={18} /> LANJUTKAN
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setViewState("LOBBY");
                  setSelectedScenarioId(null);
                }}
                className="w-full p-4 bg-transparent hover:bg-red-900/30 text-red-400 border border-red-900/50 rounded font-bold flex items-center justify-center gap-3 transition-colors"
              >
                <LogOut size={18} /> KELUAR KE LOBI
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col items-center justify-center p-4 w-full max-w-5xl mx-auto relative z-10">
        {/* VIEW: SPLASH */}
        {viewState === "SPLASH" && (
          <div className="flex flex-col items-center justify-center h-[80vh] w-full text-center space-y-8 animate-in zoom-in duration-700">
            <div className="relative group cursor-default">
              <div className="absolute -inset-8 bg-amber-600/20 rounded-full blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-1000"></div>
              <Briefcase
                size={100}
                className="text-amber-600 relative z-10 drop-shadow-2xl"
              />
            </div>
            <div>
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase mb-2 drop-shadow-lg">
                The Corrupt
              </h1>
              <p className="text-lg md:text-xl text-amber-600 font-mono tracking-[0.4em] uppercase border-y border-amber-900/50 py-2 inline-block">
                Estambor Gov. Sim
              </p>
            </div>
            <p className="max-w-md text-slate-500 italic">
              "Di negara ini, kejujuran adalah mata uang yang paling tidak
              laku."
            </p>
            <button
              onClick={() => setViewState("LOBBY")}
              className="mt-8 px-10 py-4 bg-white text-black hover:bg-amber-500 hover:text-white font-bold tracking-widest uppercase transition-all duration-300 rounded shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center gap-3"
            >
              <Power size={20} /> Masuk Sistem
            </button>
          </div>
        )}

        {/* VIEW: LOBBY */}
        {viewState === "LOBBY" && (
          <div className="w-full flex flex-col gap-10 animate-in slide-in-from-bottom-4 duration-500 py-10">
            <div className="text-center space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-white uppercase">
                Arsip Kasus
              </h1>
              <p className="text-slate-400 font-light tracking-wide">
                Pilih takdir politik Anda
              </p>
              <div className="w-20 h-1 bg-amber-600 mx-auto mt-6 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SCENARIOS.map((scenario) => (
                <div
                  key={scenario.id}
                  onClick={() => {
                    if (!scenario.locked) {
                      setSelectedScenarioId(scenario.id);
                      setViewState("STORY_INTRO");
                    }
                  }}
                  className={`group relative bg-slate-900 border ${
                    scenario.locked
                      ? "border-slate-800 opacity-60 cursor-not-allowed"
                      : "border-slate-700 hover:border-amber-500 cursor-pointer hover:-translate-y-1"
                  } p-6 rounded-xl transition-all duration-300 shadow-xl overflow-hidden`}
                >
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <span
                      className={`p-2 rounded-lg ${
                        scenario.locked
                          ? "bg-slate-800 text-slate-600"
                          : "bg-amber-900/30 text-amber-500"
                      }`}
                    >
                      {scenario.locked ? (
                        <Lock size={20} />
                      ) : (
                        <FileText size={20} />
                      )}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 border border-slate-800 px-2 py-1 rounded">
                      {scenario.difficulty}
                    </span>
                  </div>
                  <h3
                    className={`text-xl font-bold mb-2 relative z-10 ${
                      scenario.locked
                        ? "text-slate-600"
                        : "text-slate-200 group-hover:text-amber-400"
                    }`}
                  >
                    {scenario.title}
                  </h3>
                  <p className="text-sm text-slate-500 italic mb-4 relative z-10">
                    {scenario.subtitle}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed relative z-10">
                    {scenario.description}
                  </p>
                  {!scenario.locked && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: CREDITS */}
        {viewState === "CREDITS" && (
          <div className="w-full max-w-4xl flex flex-col gap-10 animate-in slide-in-from-bottom-4 duration-500 py-10">
            <div className="text-center relative">
              <button
                onClick={() => setViewState("LOBBY")}
                className="absolute left-0 top-1 text-slate-500 hover:text-white flex items-center gap-2 text-sm"
              >
                <ArrowLeft size={16} /> KEMBALI
              </button>
              <h1 className="text-3xl font-bold tracking-widest text-white uppercase">
                Arsitek Sistem
              </h1>
              <div className="w-20 h-1 bg-amber-600 mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {CREATORS.map((c) => (
                <div
                  key={c.id}
                  className={`bg-slate-900 border-l-4 ${c.color} p-6 rounded-r-xl shadow-lg hover:bg-slate-800 transition-colors group`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 bg-slate-950 rounded-full border border-slate-800 group-hover:border-slate-600">
                      <Users size={20} className="text-slate-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{c.name}</h3>
                      <span className="text-xs font-mono text-amber-600 uppercase tracking-widest">
                        {c.role}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 italic">"{c.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: STORY INTRO */}
        {viewState === "STORY_INTRO" && activeScenario && (
          <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 p-8 sm:p-12 rounded-2xl shadow-2xl text-center space-y-8 animate-in zoom-in duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
            <button
              onClick={() => {
                setViewState("LOBBY");
                setSelectedScenarioId(null);
              }}
              className="absolute top-6 left-6 text-slate-600 hover:text-white flex items-center gap-2 text-xs font-bold tracking-widest uppercase"
            >
              <ArrowLeft size={14} /> Batal
            </button>

            <div className="w-24 h-24 bg-slate-950 rounded-full mx-auto flex items-center justify-center border-4 border-amber-900/30 shadow-inner">
              <Briefcase size={40} className="text-amber-600" />
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-wider mb-2">
                {activeScenario.title}
              </h1>
              <p className="text-amber-600 font-mono text-sm tracking-[0.2em] uppercase">
                "{activeScenario.subtitle}"
              </p>
            </div>

            <div className="bg-slate-950/50 p-6 rounded-lg border border-slate-800/50 text-sm leading-relaxed text-slate-300">
              {activeScenario.description}
            </div>

            <button
              onClick={startGame}
              className="w-full sm:w-auto px-12 py-4 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded shadow-lg hover:shadow-amber-900/20 transition-all flex items-center justify-center gap-3 tracking-widest uppercase text-sm"
            >
              Mulai Simulasi <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* VIEW: PLAYING */}
        {viewState === "PLAYING" && currentNode && (
          <div className="w-full max-w-4xl flex flex-col gap-6 animate-in fade-in relative">
            <HUD stats={stats} />
            {showFeedback && (
              <div className="absolute -top-12 left-0 w-full flex justify-center pointer-events-none z-50">
                <div className="bg-slate-950/90 border border-amber-500/50 text-amber-400 px-6 py-2 rounded-full shadow-lg font-mono text-xs font-bold animate-bounce tracking-wide">
                  {showFeedback}
                </div>
              </div>
            )}
            <StoryScreen
              currentNode={currentNode}
              handleChoice={handleChoice}
            />
          </div>
        )}

        {/* VIEW: ENDING */}
        {(viewState === "GAMEOVER_RISK" ||
          viewState === "GAMEOVER_MONEY" ||
          viewState === "VICTORY") && (
          <div className="max-w-2xl w-full bg-slate-900 border-y-4 border-double border-slate-700 p-8 sm:p-12 rounded-xl shadow-2xl text-center animate-in zoom-in duration-500">
            <div className="mb-6">
              {viewState === "GAMEOVER_RISK" && (
                <div className="inline-block p-4 bg-red-900/20 rounded-full mb-4 text-red-500 animate-pulse">
                  <Skull size={64} />
                </div>
              )}
              {viewState === "GAMEOVER_MONEY" && (
                <div className="inline-block p-4 bg-yellow-900/20 rounded-full mb-4 text-yellow-500 animate-bounce">
                  <AlertTriangle size={64} />
                </div>
              )}
              {viewState === "VICTORY" && (
                <div className="inline-block p-4 bg-amber-900/20 rounded-full mb-4 text-amber-500">
                  <Award size={64} />
                </div>
              )}

              <h2
                className={`text-4xl sm:text-5xl font-black uppercase mb-4 tracking-tighter ${
                  viewState === "VICTORY" ? "text-amber-500" : "text-slate-200"
                }`}
              >
                {viewState === "GAMEOVER_RISK" && "TERTANGKAP!"}
                {viewState === "GAMEOVER_MONEY" && "BANGKRUT!"}
                {viewState === "VICTORY" && (currentNode?.title || "SELESAI")}
              </h2>

              <p className="text-lg text-slate-400 max-w-md mx-auto leading-relaxed">
                {viewState === "GAMEOVER_RISK" &&
                  "Resiko terlalu tinggi. Penegak hukum akhirnya menemukan bukti korupsi Anda. Karir Mr. Hayes berakhir di balik jeruji besi Estambor."}
                {viewState === "GAMEOVER_MONEY" &&
                  "Gaya hidup dan hutang menenggelamkan Anda. Tanpa uang, Anda kehilangan pengaruh dan jabatan."}
                {viewState === "VICTORY" &&
                  (currentNode?.text ||
                    "Perjalanan politik Anda telah berakhir.")}
              </p>
            </div>

            <div className="bg-slate-950 p-6 rounded-lg border border-slate-800 text-left max-h-48 overflow-y-auto mb-8">
              <h3 className="text-xs font-bold text-slate-500 uppercase mb-4 sticky top-0 bg-slate-950 pb-2 border-b border-slate-800">
                Jejak Langkah:
              </h3>
              <ul className="space-y-2">
                {history.map((h, i) => (
                  <li
                    key={i}
                    className="text-xs sm:text-sm text-slate-400 flex gap-2"
                  >
                    <span className="text-amber-600 font-mono">{i + 1}.</span>
                    <span>{h.choice}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setViewState("LOBBY");
                  setSelectedScenarioId(null);
                }}
                className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Home size={16} /> Ke Lobi
              </button>
              <button
                onClick={startGame}
                className="px-8 py-3 bg-amber-700 hover:bg-amber-600 text-white rounded font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <RefreshCcw size={16} /> Ulangi
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
