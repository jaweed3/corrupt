import React, { useState } from "react";

// Import Data
import { SCENARIOS } from "./data/scenarios";
import { CREATORS } from "./data/creators";

// Import Components (Layout & Logic)
import Navbar from "./components/Navbar";
import HUD from "./components/HUD";
import StoryScreen from "./components/StoryScreen";
import SystemMenu from "./components/SystemMenu";

// Import Refactored Screens
import SplashScreen from "./components/SplashScreen";
import LobbyScreen from "./components/LobbyScreen";
import CreditsScreen from "./components/CreditsScreen";
import ScenarioIntroScreen from "./components/ScenarioIntroScreen";
import EndingScreen from "./components/EndingScreen";

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

  const toLobby = () => {
    setIsMenuOpen(false);
    setViewState("LOBBY");
    setSelectedScenarioId(null);
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
        onToLobby={toLobby}
      />

      <main className="flex-1 flex flex-col items-center justify-center p-4 w-full max-w-5xl mx-auto relative z-10">
        {/* VIEW: SPLASH */}
        {viewState === "SPLASH" && (
          <SplashScreen onEnterLobby={() => setViewState("LOBBY")} />
        )}

        {/* VIEW: LOBBY */}
        {viewState === "LOBBY" && (
          <LobbyScreen
            scenarios={SCENARIOS}
            onSelectScenario={(id) => {
              setSelectedScenarioId(id);
              setViewState("STORY_INTRO");
            }}
          />
        )}

        {/* VIEW: CREDITS */}
        {viewState === "CREDITS" && (
          <CreditsScreen
            creators={CREATORS}
            onBack={() => setViewState("LOBBY")}
          />
        )}

        {/* VIEW: STORY INTRO */}
        {viewState === "STORY_INTRO" && (
          <ScenarioIntroScreen
            scenario={activeScenario}
            onStart={startGame}
            onBack={toLobby}
          />
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

        {/* VIEW: ENDING (Combined) */}
        {(viewState === "GAMEOVER_RISK" ||
          viewState === "GAMEOVER_MONEY" ||
          viewState === "VICTORY") && (
          <EndingScreen
            viewState={viewState}
            currentNode={currentNode}
            history={history}
            onRestart={startGame}
            onToLobby={toLobby}
          />
        )}
      </main>
    </div>
  );
}
