import React, { useState, useEffect } from "react";
// Hapus yang tidak dipakai
import {
  Briefcase,
  // Skull, (Hapus)
  // AlertTriangle, (Hapus)
  // Award, (Hapus)
  Home,
  // RefreshCcw, (Hapus)
  Power,
  Lock,
  FileText,
  // ArrowLeft, (Hapus)
  // Users, (Hapus)
  // ChevronRight, (Hapus)
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
    // ... (Logika handleChoice sama persis seperti sebelumnya) ...
    // Pastikan copy semua logika perhitungan stat di sini
    const newStats = {
      money: stats.money + (choice.effect.money || 0),
      trust: Math.min(
        100,
        Math.max(0, stats.trust + (choice.effect.trust || 0))
      ),
      risk: Math.min(100, Math.max(0, stats.risk + (choice.effect.risk || 0))),
    };
    setStats(newStats);

    // Feedback text logic
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

      <SystemMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onToLobby={() => {
          setViewState("LOBBY");
          setSelectedScenarioId(null);
        }}
      />

      <main className="flex-1 flex flex-col items-center justify-center p-4 w-full max-w-5xl mx-auto relative z-10">
        {/* VIEW: SPLASH */}
        {viewState === "SPLASH" && (
          <div className="flex flex-col items-center justify-center h-[80vh] w-full text-center space-y-8 animate-in zoom-in duration-700">
            {/* ... Isi konten Splash Screen ... */}
            <Briefcase
              size={100}
              className="text-amber-600 relative z-10 drop-shadow-2xl"
            />
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase mb-2 drop-shadow-lg">
              The Corrupt
            </h1>
            <button
              onClick={() => setViewState("LOBBY")}
              className="mt-8 px-10 py-4 bg-white text-black font-bold uppercase rounded flex items-center gap-3"
            >
              <Power size={20} /> Masuk Sistem
            </button>
          </div>
        )}

        {/* VIEW: LOBBY */}
        {viewState === "LOBBY" && (
          <div className="w-full flex flex-col gap-10 py-10">
            {/* ... Mapping SCENARIOS ... */}
            {SCENARIOS.map((scenario) => (
              <div
                key={scenario.id}
                onClick={() =>
                  !scenario.locked &&
                  (setSelectedScenarioId(scenario.id),
                  setViewState("STORY_INTRO"))
                }
                className="bg-slate-900 border border-slate-700 p-6 rounded-xl cursor-pointer"
              >
                <h3 className="text-xl font-bold text-white">
                  {scenario.title}
                </h3>
                <p className="text-slate-400">{scenario.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* VIEW: CREDITS */}
        {viewState === "CREDITS" && (
          <div className="w-full max-w-4xl py-10">
            {/* ... Mapping CREATORS ... */}
            {CREATORS.map((c) => (
              <div
                key={c.id}
                className={`bg-slate-900 border-l-4 ${c.color} p-6 mb-4`}
              >
                <h3 className="font-bold text-white">
                  {c.name} - {c.role}
                </h3>
              </div>
            ))}
          </div>
        )}

        {/* VIEW: STORY INTRO */}
        {viewState === "STORY_INTRO" && activeScenario && (
          <div className="max-w-2xl bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center">
            <h1 className="text-3xl font-bold text-white">
              {activeScenario.title}
            </h1>
            <p className="text-slate-300 my-4">{activeScenario.description}</p>
            <button
              onClick={startGame}
              className="px-12 py-4 bg-amber-700 text-white font-bold rounded uppercase"
            >
              Mulai Simulasi
            </button>
          </div>
        )}

        {/* VIEW: PLAYING */}
        {viewState === "PLAYING" && currentNode && (
          <div className="w-full max-w-4xl flex flex-col gap-6 animate-in fade-in relative">
            <HUD stats={stats} />
            {showFeedback && (
              <div className="absolute -top-12 left-0 w-full flex justify-center pointer-events-none z-50">
                <div className="bg-slate-950 px-6 py-2 rounded-full text-amber-400 font-bold">
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
          <div className="max-w-2xl bg-slate-900 border-slate-700 p-12 rounded-xl text-center">
            {/* ... Tampilan Ending ... */}
            <h2 className="text-4xl font-black mb-4">
              {viewState === "VICTORY" ? "MENANG" : "GAME OVER"}
            </h2>
            <p className="text-slate-400 mb-8">
              {viewState === "VICTORY"
                ? currentNode?.text
                : "Perjalanan Anda berakhir di sini."}
            </p>
            <button
              onClick={() => setViewState("LOBBY")}
              className="px-8 py-3 bg-amber-700 text-white font-bold rounded"
            >
              <Home size={16} /> Ke Lobi
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
