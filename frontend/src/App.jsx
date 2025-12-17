import React, { useState, useEffect } from "react";
// Components
import Navbar from "./components/Navbar";
import HUD from "./components/HUD";
import StoryScreen from "./components/StoryScreen";
import SystemMenu from "./components/SystemMenu";
import SplashScreen from "./components/SplashScreen";
import LobbyScreen from "./components/LobbyScreen";
import CreditsScreen from "./components/CreditsScreen";
import ScenarioIntroScreen from "./components/ScenarioIntroScreen";
import EndingScreen from "./components/EndingScreen";

// API Service
import { getStories, startGame, submitAnswer } from "./api"; // Import fungsi API tadi
import { CREATORS } from "./data/creators"; // Creators tetap lokal tidak masalah

export default function App() {
  // --- STATE ---
  const [viewState, setViewState] = useState("SPLASH");

  // Data dari Backend
  const [storiesList, setStoriesList] = useState([]); // Daftar cerita dari GET /stories
  const [sessionId, setSessionId] = useState(null); // Token sesi permainan
  const [activeStoryMeta, setActiveStoryMeta] = useState(null); // Metadata cerita yg dipilih

  // Gameplay State
  const [currentScenario, setCurrentScenario] = useState(null); // Isi chapter sekarang
  const [stats, setStats] = useState({ money: 0, trust: 0, risk: 0 });
  const [history, setHistory] = useState([]); // Log jejak langkah
  const [showFeedback, setShowFeedback] = useState(null); // Feedback text popup
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- EFFECTS ---

  // Load daftar cerita saat pertama kali buka LOBBY
  useEffect(() => {
    if (viewState === "LOBBY") {
      fetchStories();
    }
  }, [viewState]);

  // --- ACTIONS ---

  const fetchStories = async () => {
    try {
      const data = await getStories();
      setStoriesList(data);
    } catch (err) {
      alert("Gagal koneksi ke server Backend!");
    }
  };

  const handleSelectScenario = (storyId) => {
    // Cari metadata cerita berdasarkan ID untuk ditampilkan di Intro
    const selected = storiesList.find((s) => s.story_id === storyId);
    setActiveStoryMeta(selected);
    setViewState("STORY_INTRO");
  };

  const handleStartGame = async () => {
    if (!activeStoryMeta) return;

    try {
      // Panggil API /start-game
      const data = await startGame(activeStoryMeta.story_id);

      setSessionId(data.session_id);
      setStats(data.stats);
      setCurrentScenario(data.current_scenario);
      setHistory([]); // Reset history
      setViewState("PLAYING");
    } catch (err) {
      alert("Gagal memulai game. Cek backend.");
    }
  };

  const handleChoice = async (choiceId) => {
    if (!sessionId) return;

    try {
      // Panggil API /submit-answer
      const data = await submitAnswer(sessionId, choiceId);

      // 1. Update Stats
      setStats(data.stats_update);

      // 2. Tampilkan Feedback (Pop-up kecil)
      setShowFeedback(data.feedback_text);
      setTimeout(() => setShowFeedback(null), 3000);

      // 3. Catat History
      // Kita perlu cari teks pilihan yang tadi diklik user untuk history
      const choiceText =
        currentScenario.choices.find((c) => c.id === choiceId)?.description ||
        choiceId;
      setHistory((prev) => [
        ...prev,
        { title: currentScenario.title, choice: choiceText },
      ]);

      // 4. Cek Status Game (Menang/Kalah/Lanjut)
      if (data.game_status === "ONGOING" && data.next_scenario) {
        setCurrentScenario(data.next_scenario);
      } else if (data.game_status === "GAME_OVER_BUSTED") {
        setViewState("GAMEOVER_RISK");
      } else if (data.game_status === "GAME_OVER_FIRED") {
        setViewState("GAMEOVER_MONEY"); // Atau buat screen baru GAME_OVER_TRUST
      } else if (data.game_status === "WIN") {
        setViewState("VICTORY");
      }
    } catch (err) {
      alert("Terjadi kesalahan saat mengirim jawaban.");
    }
  };

  const toLobby = () => {
    setIsMenuOpen(false);
    setSessionId(null);
    setViewState("LOBBY");
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-serif flex flex-col overflow-x-hidden">
      <Navbar
        viewState={viewState}
        enterLobby={toLobby}
        goToCredits={() => setViewState("CREDITS")}
        toggleMenu={setIsMenuOpen}
      />

      <SystemMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onToLobby={toLobby}
      />

      <main className="flex-1 flex flex-col items-center justify-center p-4 w-full max-w-5xl mx-auto relative z-10">
        {viewState === "SPLASH" && <SplashScreen onEnterLobby={toLobby} />}

        {viewState === "LOBBY" && (
          // Kirim storiesList dari API ke component Lobby
          <LobbyScreen
            scenarios={storiesList}
            onSelectScenario={handleSelectScenario}
          />
        )}

        {viewState === "CREDITS" && (
          <CreditsScreen creators={CREATORS} onBack={toLobby} />
        )}

        {viewState === "STORY_INTRO" && (
          <ScenarioIntroScreen
            scenario={activeStoryMeta}
            onStart={handleStartGame}
            onBack={toLobby}
          />
        )}

        {viewState === "PLAYING" && currentScenario && (
          <div className="w-full max-w-4xl flex flex-col gap-6 relative animate-in fade-in">
            <HUD stats={stats} />

            {showFeedback && (
              <div className="absolute -top-12 left-0 w-full flex justify-center pointer-events-none z-50">
                <div className="bg-slate-950/90 border border-amber-500/50 text-amber-400 px-6 py-2 rounded-full shadow-lg font-mono text-xs font-bold animate-bounce tracking-wide backdrop-blur-sm text-center">
                  {showFeedback}
                </div>
              </div>
            )}

            {/* Kirim currentScenario dari API ke StoryScreen */}
            <StoryScreen
              currentNode={currentScenario}
              handleChoice={handleChoice}
            />
          </div>
        )}

        {/* Ending Screen menerima data terakhir */}
        {(viewState.includes("GAMEOVER") || viewState === "VICTORY") && (
          <EndingScreen
            viewState={viewState}
            currentNode={currentScenario} // Untuk menampilkan teks ending terakhir
            history={history}
            onRestart={toLobby} // Redirect ke lobi saja biar aman
            onToLobby={toLobby}
          />
        )}
      </main>
    </div>
  );
}
