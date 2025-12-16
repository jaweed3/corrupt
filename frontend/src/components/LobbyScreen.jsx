import React from "react";
import { Lock, FileText } from "lucide-react";

export default function LobbyScreen({ scenarios, onSelectScenario }) {
  return (
    <div className="w-full flex flex-col gap-10 py-10">
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-white uppercase drop-shadow-lg">
          Case Archives
        </h1>
        <p className="text-slate-400 font-light tracking-wide">
          Choose your political destiny
        </p>
        <div className="w-20 h-1 bg-amber-600 mx-auto mt-6 rounded-full shadow-[0_0_10px_rgba(217,119,6,0.6)]"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            onClick={() => !scenario.locked && onSelectScenario(scenario.id)}
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
                {scenario.locked ? <Lock size={20} /> : <FileText size={20} />}
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
  );
}
