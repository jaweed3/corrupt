import React from "react";
import { Skull, AlertTriangle, Award, Home, RefreshCcw } from "lucide-react";

export default function EndingScreen({
  viewState,
  currentNode,
  history,
  onRestart,
  onToLobby,
}) {
  return (
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
            viewState === "VICTORY" &&
            (currentNode?.description || "Your political journey has ended.")
          }`}
        >
          {viewState === "GAMEOVER_RISK" && "BUSTED!"}
          {viewState === "GAMEOVER_MONEY" && "BANKRUPT!"}
          {viewState === "VICTORY" && (currentNode?.title || "COMPLETED")}
        </h2>

        <p className="text-lg text-slate-400 max-w-md mx-auto leading-relaxed">
          {viewState === "GAMEOVER_RISK" &&
            "Risk level critical. Law enforcement finally found evidence of your corruption. Mr. Hayes' career ends behind Estambor's bars."}
          {viewState === "GAMEOVER_MONEY" &&
            "Your lifestyle and debts have drowned you. Without money, you have lost influence and your position."}
          {viewState === "VICTORY" &&
            (currentNode?.text || "Your political journey has ended.")}
        </p>
      </div>

      <div className="bg-slate-950 p-6 rounded-lg border border-slate-800 text-left max-h-48 overflow-y-auto mb-8 shadow-inner">
        <h3 className="text-xs font-bold text-slate-500 uppercase mb-4 sticky top-0 bg-slate-950 pb-2 border-b border-slate-800">
          Trace Log:
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
          onClick={onToLobby}
          className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-colors hover:shadow-lg"
        >
          <Home size={16} /> To Lobby
        </button>
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-amber-700 hover:bg-amber-600 text-white rounded font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-amber-500/20 hover:-translate-y-0.5"
        >
          <RefreshCcw size={16} /> Replay
        </button>
      </div>
    </div>
  );
}
