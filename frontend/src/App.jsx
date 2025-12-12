import React, { useState } from "react";
// KEMBALIKAN ICON YANG HILANG (Karena dipakai di Ending, Credits, dll)
import {
  Briefcase,
  Home,
  Power,
  Lock,
  FileText,
  Skull,
  AlertTriangle,
  Award,
  RefreshCcw,
  ArrowLeft,
  Users,
  ChevronRight,
} from "lucide-react";

// Import Data
import { SCENARIOS } from "./data/scenarios";
import { CREATORS } from "./data/creators";

// Import Components
import Navbar from "./components/Navbar";
import HUD from "./components/HUD";
import StoryScreen from "./components/StoryScreen";
import SystemMenu from "./components/SystemMenu";

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

  // Actions Logic
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

      {/* GUNAKAN COMPONENT SYSTEM MENU (Lebih Rapi) */}
      <SystemMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onToLobby={() => {
          setIsMenuOpen(false); // Tutup menu dulu
          setViewState("LOBBY");
          setSelectedScenarioId(null);
        }}
      />

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
              <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 tracking-tighter uppercase mb-2 drop-shadow-lg">
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
              className="mt-8 px-10 py-4 bg-white text-black hover:bg-amber-500 hover:text-white font-bold tracking-widest uppercase transition-all duration-300 rounded shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-amber-500/50 flex items-center gap-3"
            >
              <Power size={20} /> Masuk Sistem
            </button>
          </div>
        )}

        {/* VIEW: LOBBY */}
        {viewState === "LOBBY" && (
          <div className="w-full flex flex-col gap-10 py-10">
            <div className="text-center space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-white uppercase drop-shadow-lg">
                Arsip Kasus
              </h1>
              <p className="text-slate-400 font-light tracking-wide">
                Pilih takdir politik Anda
              </p>
              <div className="w-20 h-1 bg-amber-600 mx-auto mt-6 rounded-full shadow-[0_0_10px_rgba(217,119,6,0.6)]"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SCENARIOS.map((scenario) => (
                <div
                  key={scenario.id}
                  onClick={() =>
                    !scenario.locked &&
                    (setSelectedScenarioId(scenario.id),
                    setViewState("STORY_INTRO"))
                  }
                  className={`group relative bg-slate-900 border ${
                    scenario.locked
                      ? "border-slate-800 opacity-60 cursor-not-allowed"
                      : "border-slate-700 hover:border-amber-500 cursor-pointer hover:-translate-y-1 hover:shadow-amber-500/10"
                  } p-6 rounded-xl transition-all duration-300 shadow-xl overflow-hidden`}
                >
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <span
                      className={`p-2 rounded-lg transition-colors ${
                        scenario.locked
                          ? "bg-slate-800 text-slate-600"
                          : "bg-amber-900/30 text-amber-500 group-hover:bg-amber-900/50"
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
                    } transition-colors`}
                  >
                    {scenario.title}
                  </h3>
                  <p className="text-sm text-slate-500 italic mb-4 relative z-10">
                    {scenario.subtitle}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed relative z-10">
                    {scenario.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: CREDITS */}
        {viewState === "CREDITS" && (
          <div className="w-full max-w-4xl flex flex-col gap-10 py-10">
            <div className="text-center relative">
              <button
                onClick={() => setViewState("LOBBY")}
                className="absolute left-0 top-1 text-slate-500 hover:text-white flex items-center gap-2 text-sm transition-colors"
              >
                <ArrowLeft size={16} /> KEMBALI
              </button>
              <h1 className="text-3xl font-bold tracking-widest text-white uppercase drop-shadow-md">
                Arsitek Sistem
              </h1>
              <div className="w-20 h-1 bg-amber-600 mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(217,119,6,0.6)]"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {CREATORS.map((c) => (
                <div
                  key={c.id}
                  className={`bg-slate-900 border-l-4 ${c.color} p-6 rounded-r-xl shadow-lg hover:bg-slate-800 transition-colors group`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 bg-slate-950 rounded-full border border-slate-800 group-hover:border-slate-600 transition-colors">
                      <Users
                        size={20}
                        className="text-slate-400 group-hover:text-slate-200 transition-colors"
                      />
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
          <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 p-8 sm:p-12 rounded-2xl shadow-2xl text-center space-y-8 relative overflow-hidden transition-all">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
            <button
              onClick={() => {
                setViewState("LOBBY");
                setSelectedScenarioId(null);
              }}
              className="absolute top-6 left-6 text-slate-600 hover:text-white flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors"
            >
              <ArrowLeft size={14} /> Batal
            </button>
            <div className="w-24 h-24 bg-slate-950 rounded-full mx-auto flex items-center justify-center border-4 border-amber-900/30 shadow-inner group">
              <Briefcase
                size={40}
                className="text-amber-600 group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-wider mb-2 drop-shadow-lg">
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
              className="w-full sm:w-auto px-12 py-4 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded shadow-lg hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-3 tracking-widest uppercase text-sm group"
            >
              Mulai Simulasi{" "}
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        )}

        {/* VIEW: PLAYING */}
        {viewState === "PLAYING" && currentNode && (
          <div className="w-full max-w-4xl flex flex-col gap-6 relative animate-in fade-in">
            <HUD stats={stats} />
            {showFeedback && (
              <div className="absolute -top-12 left-0 w-full flex justify-center pointer-events-none z-50">
                <div className="bg-slate-950/90 border border-amber-500/50 text-amber-400 px-6 py-2 rounded-full shadow-lg font-mono text-xs font-bold animate-bounce tracking-wide backdrop-blur-sm">
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

        {/* VIEW: ENDING (Victory/Gameover) */}
        {(viewState === "GAMEOVER_RISK" ||
          viewState === "GAMEOVER_MONEY" ||
          viewState === "VICTORY") && (
          <div className="max-w-2xl w-full bg-slate-900 border-y-4 border-double border-slate-700 p-8 sm:p-12 rounded-xl shadow-2xl text-center">
            <div className="mb-6">
              {viewState === "GAMEOVER_RISK" && (
                <div className="inline-block p-4 bg-red-900/20 rounded-full mb-4 text-red-500 animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                  <Skull size={64} />
                </div>
              )}
              {viewState === "GAMEOVER_MONEY" && (
                <div className="inline-block p-4 bg-yellow-900/20 rounded-full mb-4 text-yellow-500 animate-bounce shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                  <AlertTriangle size={64} />
                </div>
              )}
              {viewState === "VICTORY" && (
                <div className="inline-block p-4 bg-amber-900/20 rounded-full mb-4 text-amber-500 shadow-[0_0_20px_rgba(217,119,6,0.3)]">
                  <Award size={64} />
                </div>
              )}

              <h2
                className={`text-4xl sm:text-5xl font-black uppercase mb-4 tracking-tighter drop-shadow-lg ${
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

            <div className="bg-slate-950 p-6 rounded-lg border border-slate-800 text-left max-h-48 overflow-y-auto mb-8 shadow-inner">
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
                className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-colors hover:shadow-lg"
              >
                <Home size={16} /> Ke Lobi
              </button>
              <button
                onClick={startGame}
                className="px-8 py-3 bg-amber-700 hover:bg-amber-600 text-white rounded font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-amber-500/20 hover:-translate-y-0.5"
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
