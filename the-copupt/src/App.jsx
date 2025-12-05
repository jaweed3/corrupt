import React, { useState } from "react";
import {
  Briefcase,
  DollarSign,
  AlertTriangle,
  Users,
  BookOpen,
  Skull,
  Award,
  ChevronRight,
  RefreshCcw,
  Home,
  Lock,
  FileText,
  ArrowLeft,
  Menu,
  X,
  Settings,
  LogOut,
  Play,
  Power,
} from "lucide-react";

// --- DATABASE CERITA (Sama seperti sebelumnya) ---

const HAYES_STORY = {
  // BABAK 1
  start: {
    title: "Babak 1: Dilema Gaji dan Janji",
    text: "Mr. Hayes bekerja pada kejaksaan agung negara Estambor. Gajinya tergerus habis oleh cicilan dan gaya hidup. Biasanya ada 'uang lelah', tapi kini meja kerjanya sepi. Ia butuh uang untuk hutang dan menjaga citra, tapi tak ingin memindahkan sekolah anaknya.",
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

  // BABAK 2
  babak2_pathA: {
    title: "Babak 2: Ambisi Legislatif (Jalur Uang Panas)",
    text: "Mr. Hayes mendapatkan uang dari perusahaan elit, namun dihantui rasa takut skandal. Untuk mengamankan posisi dan menghindari kemungkinan buruk, ia ingin mengajukan diri sebagai anggota legislatif. Apa yang harus dilakukan untuk mendapatkan kursi tersebut?",
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
    text: "Setelah menyelesaikan kasus besar dan reputasi naik, Mr. Hayes merasa uangnya masih kurang untuk gaya hidupnya. Ia berpikir untuk menjabat anggota legislatif demi gaji lebih besar dan hobi yang tenang. Bagaimana cara mendapatkan kursi itu?",
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

  // BABAK 3
  babak3_pathA: {
    title: "Babak 3: Konflik Dewan (Jalur Pengaruh)",
    text: "Mr. Hayes terpilih menjadi anggota legislatif. Dalam sebuah rapat penting, ia dan teman dekatnya berdiskusi masalah yang bisa mendatangkan uang dan ketenaran. Namun, banyak anggota dewan lain yang kontra dan beradu argumen. Bagaimana cara menyelesaikannya?",
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
    text: "Terpilih dengan kekuatan sponsor politik membuat Mr. Hayes ditekan partai, tapi dipercaya karena 'kemahirannya'. Dalam rapat untuk masalah besar yang menjanjikan uang dan ketenaran, ia dihadang argumen keras oposisi. Bagaimana cara menang?",
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

  // BABAK 4
  babak4_pathA: {
    title: "Babak 4: Dilema Kesetiaan (Pasca Kompromi)",
    text: "Kasus berhasil dimenangkan lewat negosiasi. Mr. Hayes dapat untung dan kepercayaan. Namun, teman dekatnya kini terjerat kasus pemerasan rakyat kecil. Mr. Hayes ingin membantu, tapi jalannya berisiko.",
    choices: [
      {
        text: "Dorong transparansi & bentuk tim hukum (Selamatkan Teman Cara Bersih)",
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
    text: "Manipulasi berhasil, citra naik meski didasari kebohongan. Namun, teman dekat Mr. Hayes terjerat pemerasan. Jika teman ini jatuh, seluruh jaringan gelap Mr. Hayes bisa terbongkar.",
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

  // BABAK 5
  babak5_pathA: {
    title: "Babak 5: Godaan Proyek Jembatan (Pasca Transparansi)",
    text: "Dana menipis setelah membantu teman secara legal. Ada peluang emas: Proyek Jembatan Nasional. Anggaran besar diajukan. Jika dimanajemen, ada potensi untung pribadi 2%. Tapi jembatan ini kondisinya memprihatinkan.",
    choices: [
      {
        text: "Jaga integritas proyek & reputasi (Jujur)",
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
    text: "Teman selamat lewat jalur gelap, tapi reputasi hancur dan penegak hukum punya kartu as Mr. Hayes. Proyek Jembatan Nasional muncul sebagai cara membeli kembali Trust publik (atau memperkaya diri 2%).",
    choices: [
      {
        text: "Jaga integritas proyek & reputasi (Jujur)",
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

  // BABAK 6
  babak6_pathA: {
    title: "Babak 6: Ambisi Jenderal (Jalur Bersih)",
    text: "Reputasi stabil berkat proyek jembatan. Mr. Hayes kini mengincar posisi 'Jenderal Keamanan' yang bergengsi tapi minim kerja. Namun, ia tak punya basis militer.",
    choices: [
      {
        text: "Bangun koalisi politik & reformasi keamanan",
        effect: { money: -10000, trust: 30, risk: 15 },
        nextId: "babak7_pathA",
      },
      {
        text: "Sewa pasukan bayaran & kolusi dengan militer pensiunan",
        effect: { money: -20000, trust: 40, risk: 30 },
        nextId: "babak7_pathB",
      },
    ],
  },
  babak6_pathB: {
    title: "Babak 6: Ambisi Jenderal (Jalur Korupsi)",
    text: "Kaya raya dari korupsi jembatan, tapi gelisah karena itu bom waktu. Jabatan Jenderal Keamanan menawarkan kekebalan dan kekuasaan untuk menutupi jejak. Tapi ia butuh pasukan.",
    choices: [
      {
        text: "Bangun koalisi politik & reformasi keamanan",
        effect: { money: -10000, trust: 30, risk: 15 },
        nextId: "babak7_pathA",
      },
      {
        text: "Sewa pasukan bayaran & kolusi dengan militer pensiunan",
        effect: { money: -20000, trust: 40, risk: 30 },
        nextId: "babak7_pathB",
      },
    ],
  },

  // BABAK 7
  babak7_pathA: {
    title: "Babak 7: Mengamankan Posisi (Pasca Reformasi)",
    text: "Menjadi Jenderal lewat reformasi ternyata sulit. PM ingin membubarkan jabatan ini. Lawan politik ingin kekuasaan, bukan data transparansi.",
    choices: [
      {
        text: "Koersi & beli dukungan komite, ciptakan cyber ring",
        effect: { money: -10000, trust: 10, risk: 35 },
        nextId: "babak8_pathA",
      },
      {
        text: "Buktikan nilai dengan aksi nyata & operasi cepat",
        effect: { money: -10000, trust: 35, risk: -10 },
        nextId: "babak8_pathB",
      },
    ],
  },
  babak7_pathB: {
    title: "Babak 7: Mengamankan Posisi (Pasca Pasukan Bayaran)",
    text: "Langkah pasukan bayaran dianggap kudeta oleh PM. Jabatan terancam dibubarkan. Ancaman terbesar datang dari dalam pemerintahan sendiri.",
    choices: [
      {
        text: "Koersi & beli dukungan komite, ciptakan cyber ring",
        effect: { money: -10000, trust: 10, risk: 35 },
        nextId: "babak8_pathA",
      },
      {
        text: "Buktikan nilai dengan aksi nyata & operasi cepat",
        effect: { money: -10000, trust: 35, risk: -10 },
        nextId: "babak8_pathB",
      },
    ],
  },

  // BABAK 8
  babak8_pathA: {
    title: "Babak 8: Anggaran Keamanan (Pasca Beli Dukungan)",
    text: "Jabatan aman karena beli dukungan, tapi dana habis. Mr. Hayes mengajukan anggaran Cyber Security & Alat Perang fantastis. Teman menyarankan mark-up 5% untuk balik modal.",
    choices: [
      {
        text: "Mark-up 5% & kompromi loyalitas",
        effect: { money: 50000, trust: -5, risk: 25 },
        nextId: "babak9_pathA",
      },
      {
        text: "Pengadaan 100% & reward jalur profesional",
        effect: { money: -5000, trust: 25, risk: -5 },
        nextId: "babak9_pathB",
      },
    ],
  },
  babak8_pathB: {
    title: "Babak 8: Anggaran Keamanan (Pasca Aksi Nyata)",
    text: "Jabatan aman karena prestasi. Anggaran Cyber Security & Alat Perang disetujui. Ada godaan mark-up 5% sebagai 'hadiah' untuk tim ahli, atau tetap bersih.",
    choices: [
      {
        text: "Mark-up 5% & kompromi loyalitas",
        effect: { money: 50000, trust: -5, risk: 25 },
        nextId: "babak9_pathA",
      },
      {
        text: "Pengadaan 100% & reward jalur profesional",
        effect: { money: -5000, trust: 25, risk: -5 },
        nextId: "babak9_pathB",
      },
    ],
  },

  // BABAK 9
  babak9_pathA: {
    title: "Babak 9: Menuju PM (Pasca Korupsi)",
    text: "Kaya raya dari mark-up, Mr. Hayes ingin jadi Perdana Menteri (PM). Rakyat mendesak PM lama turun. Hayes maju dengan partai 'Kemandirian'. Ada lawan kuat.",
    choices: [
      {
        text: "Bangun koalisi & kampanye data",
        effect: { money: -1000, trust: 30, risk: 10 },
        nextId: "babak10_pathA",
      },
      {
        text: "Kolusi dengan penegak hukum & sebar disinformasi",
        effect: { money: -1500, trust: -20, risk: 10 },
        nextId: "babak10_pathB",
      },
    ],
  },
  babak9_pathB: {
    title: "Babak 9: Menuju PM (Pasca Bersih)",
    text: "Reputasi bersih membuat Hayes populer. Ia ingin jadi PM untuk kebebasan berpendapat. Rakyat mendesak PM lama turun. Ada lawan kuat dalam pemilu.",
    choices: [
      {
        text: "Bangun koalisi & kampanye data",
        effect: { money: -1000, trust: 30, risk: 10 },
        nextId: "babak10_pathA",
      },
      {
        text: "Kolusi dengan penegak hukum & sebar disinformasi",
        effect: { money: -1500, trust: -20, risk: 10 },
        nextId: "babak10_pathB",
      },
    ],
  },

  // BABAK 10
  babak10_pathA: {
    title: "Babak 10: Ujian Kursi PM (Pasca Koalisi)",
    text: "Mr. Hayes jadi PM! Tapi koalisi membuatnya rentan. Muncul isu demonstrasi besar untuk menurunkannya. Ini mengancam dirinya dan kroninya.",
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
    text: "Mr. Hayes jadi PM lewat jalur gelap. Pihak yang membantunya kini menuntut balas budi. Muncul demonstrasi besar. Jika jatuh, semua rahasia terbongkar.",
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

  // ENDINGS
  victory_good: {
    title: "Akhir Cerita: Legenda Estambor",
    text: "Mr. Hayes berhasil melewati badai demonstrasi. Sejarah akan mencatatnya sebagai pemimpin, entah bersih atau penuh intrik, ia bertahan di puncak.",
    isEnd: true,
  },
  victory_bad: {
    title: "Akhir Cerita: Tirani Besi",
    text: "Dengan uang dan kekuasaan, suara rakyat diredam. Mr. Hayes duduk di kursi Perdana Menteri, kesepian di puncak kekuasaan yang dibangun di atas pondasi rapuh.",
    isEnd: true,
  },
};

// --- STRUKTUR SKENARIO LOBI ---

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

// --- COMPONENTS ---

export default function App() {
  // VIEW STATES: SPLASH, LOBBY, STORY_INTRO, PLAYING, END
  const [viewState, setViewState] = useState("SPLASH"); // Ubah state awal jadi SPLASH
  const [selectedScenarioId, setSelectedScenarioId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [currentNodeId, setCurrentNodeId] = useState("start");
  const [stats, setStats] = useState({
    money: 10000,
    trust: 50,
    risk: 10,
  });
  const [history, setHistory] = useState([]);
  const [showFeedback, setShowFeedback] = useState(null);

  // Helper untuk mendapatkan data skenario aktif
  const activeScenario = SCENARIOS.find((s) => s.id === selectedScenarioId);
  const activeNodes = activeScenario ? activeScenario.nodes : null;
  const currentNode = activeNodes && activeNodes[currentNodeId];

  // --- ACTIONS ---

  const enterLobby = () => {
    setViewState("LOBBY");
  };

  const selectScenario = (id) => {
    const scenario = SCENARIOS.find((s) => s.id === id);
    if (scenario.locked) return;

    setSelectedScenarioId(id);
    setViewState("STORY_INTRO");
    setIsMenuOpen(false);
  };

  const backToLobby = () => {
    setViewState("LOBBY");
    setSelectedScenarioId(null);
    setIsMenuOpen(false);
  };

  const startGame = () => {
    setViewState("PLAYING");
    setCurrentNodeId("start");
    setStats({ money: 10000, trust: 50, risk: 10 });
    setHistory([]);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleChoice = (choice) => {
    // 1. Update Stats
    const newStats = {
      money: stats.money + (choice.effect.money || 0),
      trust: Math.min(
        100,
        Math.max(0, stats.trust + (choice.effect.trust || 0))
      ),
      risk: Math.min(100, Math.max(0, stats.risk + (choice.effect.risk || 0))),
    };

    setStats(newStats);

    // 2. Feedback Animation
    const changes = [];
    if (choice.effect.money)
      changes.push(
        `Money ${choice.effect.money > 0 ? "+" : ""}${choice.effect.money}`
      );
    if (choice.effect.trust)
      changes.push(
        `Trust ${choice.effect.trust > 0 ? "+" : ""}${choice.effect.trust}`
      );
    if (choice.effect.risk)
      changes.push(
        `Risk ${choice.effect.risk > 0 ? "+" : ""}${choice.effect.risk}`
      );
    setShowFeedback(changes.join(", "));

    setTimeout(() => setShowFeedback(null), 2000);

    // 3. Check Game Over Conditions
    if (newStats.risk >= 100) {
      setViewState("GAMEOVER_RISK");
      return;
    }
    if (newStats.money < 0) {
      setViewState("GAMEOVER_MONEY");
      return;
    }

    // 4. Move to next node
    if (activeNodes[choice.nextId]?.isEnd) {
      setCurrentNodeId(choice.nextId);
      setViewState("VICTORY");
    } else {
      setCurrentNodeId(choice.nextId);
    }

    // 5. Save History
    setHistory([...history, { title: currentNode.title, choice: choice.text }]);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-serif flex flex-col">
      {/* --- NAVBAR (Hidden on Splash) --- */}
      {viewState !== "SPLASH" && (
        <nav className="w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 p-4 sticky top-0 z-50 shadow-md">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            {/* Logo Section */}
            <div
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={
                viewState === "LOBBY" ? () => {} : () => setIsMenuOpen(true)
              }
            >
              <Briefcase className="text-amber-600" size={24} />
              <span className="font-bold text-xl tracking-widest text-amber-500 uppercase">
                THE Copupt
              </span>
            </div>

            {/* Right Action Section */}
            <div className="flex items-center gap-4">
              {viewState === "LOBBY" ? (
                <div className="text-xs text-slate-500 font-mono hidden md:block">
                  BUILD v1.3.0 - ESTAMBOR ARCHIVES
                </div>
              ) : (
                <button
                  onClick={toggleMenu}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-full border border-slate-700 transition-colors text-sm font-bold text-slate-300"
                >
                  {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
                  <span className="hidden sm:inline">
                    {isMenuOpen ? "TUTUP" : "MENU"}
                  </span>
                </button>
              )}
            </div>
          </div>
        </nav>
      )}

      {/* --- MENU OVERLAY (Saat di dalam game) --- */}
      {isMenuOpen && viewState !== "LOBBY" && (
        <div className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="max-w-md w-full bg-slate-800 border-2 border-amber-700 rounded-lg p-8 shadow-2xl relative">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-300"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-center text-amber-500 mb-8 uppercase tracking-widest border-b border-slate-700 pb-4">
              Menu Permainan
            </h2>

            <div className="space-y-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-full p-4 bg-amber-800 hover:bg-amber-700 text-white rounded font-bold flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02]"
              >
                <Play size={20} /> LANJUTKAN
              </button>

              {/* Placeholder for future settings */}
              <button
                className="w-full p-4 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded font-bold flex items-center justify-center gap-3 transition-colors opacity-50 cursor-not-allowed"
                title="Segera Hadir"
              >
                <Settings size={20} /> PENGATURAN
              </button>

              <button
                onClick={backToLobby}
                className="w-full p-4 bg-red-900/50 hover:bg-red-900 text-red-200 border border-red-800 rounded font-bold flex items-center justify-center gap-3 transition-colors mt-8"
              >
                <LogOut size={20} /> KELUAR KE LOBI
              </button>
            </div>

            <p className="text-center text-xs text-slate-600 mt-8 font-mono">
              Progress saat ini akan hilang jika keluar.
            </p>
          </div>
        </div>
      )}

      {/* --- MAIN CONTENT CONTAINER --- */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 w-full max-w-6xl mx-auto">
        {/* --- SPLASH SCREEN --- */}
        {viewState === "SPLASH" && (
          <div className="flex flex-col items-center justify-center h-[80vh] w-full text-center space-y-8 animate-in fade-in duration-1000">
            <div className="relative">
              <div className="absolute -inset-4 bg-amber-600/20 rounded-full blur-xl animate-pulse"></div>
              <Briefcase size={80} className="text-amber-600 relative z-10" />
            </div>

            <div>
              <h1 className="text-6xl md:text-8xl font-bold text-slate-100 tracking-widest uppercase mb-2">
                THE Copupt
              </h1>
              <p className="text-xl md:text-2xl text-amber-700 font-mono tracking-[0.5em]">
                ESTAMBOR GOV. SIMULATION
              </p>
            </div>

            <p className="max-w-md text-slate-500 italic border-l-2 border-slate-700 pl-4 text-left">
              "Kekuasaan cenderung korup, dan kekuasaan mutlak korup
              sepenuhnya."
            </p>

            <button
              onClick={enterLobby}
              className="group px-8 py-4 bg-transparent border-2 border-amber-700 text-amber-600 hover:bg-amber-700 hover:text-white transition-all duration-500 tracking-widest uppercase font-bold text-sm mt-8 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Power size={18} /> Masuk ke Sistem
              </span>
            </button>

            <div className="absolute bottom-8 text-xs text-slate-700 font-mono">
              SECURE CONNECTION ESTABLISHED...
            </div>
          </div>
        )}

        {/* --- LOBBY VIEW --- */}
        {viewState === "LOBBY" && (
          <div className="w-full flex flex-col gap-8 animate-fade-in py-8">
            {/* Header Lobi */}
            <div className="text-center space-y-2 mb-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-widest text-slate-100 uppercase">
                Arsip Skenario
              </h1>
              <p className="text-xl text-slate-400 font-light tracking-wide">
                Pilih Nasib Politik Anda
              </p>
              <div className="w-24 h-1 bg-amber-700 mx-auto mt-4"></div>
            </div>

            {/* Grid Skenario */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SCENARIOS.map((scenario) => (
                <div
                  key={scenario.id}
                  onClick={() => selectScenario(scenario.id)}
                  className={`relative p-6 rounded-lg border-2 transition-all duration-300 group cursor-pointer overflow-hidden flex flex-col justify-between min-h-[250px]
                        ${
                          scenario.locked
                            ? "bg-slate-950 border-slate-800 opacity-60 grayscale"
                            : "bg-slate-800 border-slate-700 hover:border-amber-500 hover:shadow-2xl hover:-translate-y-1"
                        }`}
                >
                  <div>
                    {/* Badge Locked/Difficulty */}
                    <div className="flex justify-between items-start mb-4">
                      {scenario.locked ? (
                        <span className="bg-slate-800 p-2 rounded-full text-slate-500">
                          <Lock size={18} />
                        </span>
                      ) : (
                        <span className="bg-amber-900/30 text-amber-500 p-2 rounded-full">
                          <FileText size={18} />
                        </span>
                      )}
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                        {scenario.difficulty}
                      </span>
                    </div>

                    {/* Content */}
                    <h3
                      className={`text-xl font-bold mb-1 ${
                        scenario.locked
                          ? "text-slate-500"
                          : "text-slate-200 group-hover:text-amber-400"
                      }`}
                    >
                      {scenario.title}
                    </h3>
                    <p className="text-sm text-slate-500 italic mb-4">
                      {scenario.subtitle}
                    </p>
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                      {scenario.description}
                    </p>
                  </div>

                  {/* Hover Effect CTA */}
                  {!scenario.locked && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center text-xs text-slate-600 mt-8">
              PERINGATAN: Semua keputusan akan dicatat dalam sejarah Estambor.
            </div>
          </div>
        )}

        {/* --- STORY INTRO (HOMEPAGE SKENARIO) --- */}
        {viewState === "STORY_INTRO" && activeScenario && (
          <div className="max-w-2xl w-full bg-slate-800 border-2 border-amber-700 shadow-2xl p-8 rounded-lg relative overflow-hidden animate-fade-in my-8">
            <button
              onClick={backToLobby}
              className="absolute top-4 left-4 text-slate-500 hover:text-slate-300 flex items-center gap-1 text-sm"
            >
              <ArrowLeft size={16} /> Kembali
            </button>

            <div className="absolute top-0 left-0 w-full h-2 bg-amber-700"></div>
            <div className="flex flex-col items-center text-center space-y-6 mt-6">
              <div className="w-24 h-24 bg-slate-950 rounded-full flex items-center justify-center border-4 border-amber-800">
                <Briefcase className="w-12 h-12 text-amber-700" />
              </div>
              <h1 className="text-4xl font-bold tracking-widest text-amber-500 uppercase">
                {activeScenario.title}
              </h1>
              <p className="text-lg italic text-slate-400 font-light">
                "{activeScenario.subtitle}"
              </p>

              <div className="py-6 text-sm text-slate-300 max-w-md border-t border-b border-slate-700 my-4">
                <p>{activeScenario.description}</p>
                <br />
                <p className="text-amber-500/80">
                  "Antara integritas yang mahal atau korupsi yang menggoda."
                </p>
              </div>

              <button
                onClick={startGame}
                className="group relative px-8 py-3 bg-amber-800 hover:bg-amber-700 text-white font-bold tracking-wider rounded transition-all transform hover:scale-105 shadow-lg"
              >
                <span className="flex items-center gap-2">
                  MULAI SIMULASI <ChevronRight size={20} />
                </span>
              </button>
            </div>
          </div>
        )}

        {/* --- GAMEPLAY UI --- */}
        {viewState === "PLAYING" && currentNode && (
          <div className="max-w-4xl w-full flex flex-col gap-4 animate-fade-in my-4">
            {/* STATS BAR */}
            <div className="grid grid-cols-3 gap-4 bg-slate-800 p-4 rounded-lg border-b-4 border-slate-700 shadow-lg">
              <div className="flex items-center gap-3 justify-center">
                <div className="p-2 bg-green-900/30 rounded-full text-green-500">
                  <DollarSign size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 uppercase tracking-wider">
                    Money
                  </span>
                  <span className="text-xl font-bold font-mono text-green-400">
                    ${stats.money.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 justify-center border-x border-slate-700">
                <div className="p-2 bg-blue-900/30 rounded-full text-blue-500">
                  <Users size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 uppercase tracking-wider">
                    Trust
                  </span>
                  <div className="w-24 h-2 bg-slate-700 rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-500"
                      style={{ width: `${stats.trust}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <div
                  className={`p-2 rounded-full ${
                    stats.risk > 70
                      ? "bg-red-900/50 text-red-500 animate-pulse"
                      : "bg-orange-900/30 text-orange-500"
                  }`}
                >
                  <AlertTriangle size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 uppercase tracking-wider">
                    Risk
                  </span>
                  <div className="w-24 h-2 bg-slate-700 rounded-full mt-1 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        stats.risk > 70 ? "bg-red-600" : "bg-orange-500"
                      }`}
                      style={{ width: `${stats.risk}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* FEEDBACK TOAST */}
            {showFeedback && (
              <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-slate-800 border border-amber-500 text-amber-500 px-6 py-2 rounded-full shadow-2xl animate-bounce z-30 font-mono text-sm">
                {showFeedback}
              </div>
            )}

            {/* MAIN CONTENT */}
            <div className="bg-slate-800 p-8 rounded-lg shadow-xl min-h-[400px] flex flex-col justify-between border border-slate-700 relative">
              {/* Scene Text */}
              <div>
                <div className="flex items-center gap-2 mb-6 border-b border-slate-700 pb-2">
                  <BookOpen size={18} className="text-slate-500" />
                  <h2 className="text-lg text-amber-600 font-bold uppercase tracking-widest">
                    {currentNode.title}
                  </h2>
                </div>
                <p className="text-lg leading-relaxed text-slate-300">
                  {currentNode.text}
                </p>
              </div>

              {/* Choices */}
              <div className="mt-8 space-y-3">
                {currentNode.choices.map((choice, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChoice(choice)}
                    className="w-full text-left p-4 bg-slate-700 hover:bg-slate-600 border-l-4 border-transparent hover:border-amber-500 rounded transition-all group"
                  >
                    <span className="block font-bold text-slate-200 group-hover:text-amber-400 mb-1">
                      {choice.text}
                    </span>
                    <div className="flex gap-3 text-xs font-mono text-slate-400 opacity-60 group-hover:opacity-100">
                      <span
                        className={
                          choice.effect.money > 0
                            ? "text-green-400"
                            : choice.effect.money < 0
                            ? "text-red-400"
                            : ""
                        }
                      >
                        ${choice.effect.money}
                      </span>
                      <span>|</span>
                      <span
                        className={
                          choice.effect.trust > 0
                            ? "text-blue-400"
                            : choice.effect.trust < 0
                            ? "text-red-400"
                            : ""
                        }
                      >
                        Trust {choice.effect.trust > 0 ? "+" : ""}
                        {choice.effect.trust}
                      </span>
                      <span>|</span>
                      <span
                        className={
                          choice.effect.risk > 0
                            ? "text-red-400"
                            : choice.effect.risk < 0
                            ? "text-green-400"
                            : ""
                        }
                      >
                        Risk {choice.effect.risk > 0 ? "+" : ""}
                        {choice.effect.risk}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- ENDING SCREENS --- */}
        {(viewState === "GAMEOVER_RISK" ||
          viewState === "GAMEOVER_MONEY" ||
          viewState === "VICTORY") && (
          <div className="max-w-2xl w-full bg-slate-800 border-4 border-double border-slate-600 p-8 rounded-lg shadow-2xl text-center animate-fade-in my-8">
            {viewState === "GAMEOVER_RISK" && (
              <>
                <Skull className="w-20 h-20 text-red-600 mx-auto mb-4" />
                <h2 className="text-4xl font-bold text-red-500 mb-2">
                  TERTANGKAP!
                </h2>
                <p className="text-slate-300">
                  Resiko terlalu tinggi. Penegak hukum akhirnya menemukan bukti
                  korupsi Anda. Karir Mr. Hayes berakhir di balik jeruji besi
                  Estambor.
                </p>
              </>
            )}
            {viewState === "GAMEOVER_MONEY" && (
              <>
                <AlertTriangle className="w-20 h-20 text-yellow-600 mx-auto mb-4" />
                <h2 className="text-4xl font-bold text-yellow-500 mb-2">
                  BANGKRUT!
                </h2>
                <p className="text-slate-300">
                  Gaya hidup dan hutang menenggelamkan Anda. Tanpa uang, Anda
                  kehilangan pengaruh dan jabatan.
                </p>
              </>
            )}
            {viewState === "VICTORY" && currentNode && (
              <>
                <Award className="w-20 h-20 text-amber-500 mx-auto mb-4" />
                <h2 className="text-4xl font-bold text-amber-500 mb-2">
                  {currentNode.title}
                </h2>
                <p className="text-slate-300">{currentNode.text}</p>
              </>
            )}

            <div className="mt-8 bg-slate-900 p-4 rounded text-left overflow-y-auto max-h-40 border border-slate-700">
              <h3 className="text-xs text-slate-500 uppercase mb-2">
                Riwayat Keputusan:
              </h3>
              {history.map((h, i) => (
                <div
                  key={i}
                  className="text-sm text-slate-400 mb-1 border-b border-slate-800 pb-1 last:border-0"
                >
                  <span className="text-amber-700">{i + 1}.</span> {h.choice}
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-center mt-8">
              <button
                onClick={backToLobby}
                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded flex items-center justify-center gap-2 transition-colors border border-slate-500"
              >
                <Home size={16} /> Ke Lobi
              </button>
              <button
                onClick={startGame}
                className="px-6 py-2 bg-amber-800 hover:bg-amber-700 text-white rounded flex items-center justify-center gap-2 transition-colors"
              >
                <RefreshCcw size={16} /> Ulangi Skenario
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
