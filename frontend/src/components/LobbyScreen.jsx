// src/components/LobbyScreen.jsx
import React from "react";
import { FileText } from "lucide-react";

export default function LobbyScreen({ scenarios, onSelectScenario }) {
  // Jika loading data belum selesai
  if (!scenarios || scenarios.length === 0) {
    return <div className="text-white text-center">Loading Archives...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-10 py-10">
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-white uppercase drop-shadow-lg">
          Case Archives
        </h1>
        <p className="text-slate-400 font-light tracking-wide">
          Choose your political destiny
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenarios.map((scenario) => (
          <div
            key={scenario.story_id} // Gunakan story_id dari backend
            onClick={() => onSelectScenario(scenario.story_id)}
            className="group relative bg-slate-900 border border-slate-700 hover:border-amber-500 cursor-pointer hover:-translate-y-1 p-6 rounded-xl transition-all duration-300 shadow-xl overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4 relative z-10">
              <span className="p-2 rounded-lg bg-amber-900/30 text-amber-500 group-hover:bg-amber-900/50 transition-colors">
                <FileText size={20} />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 border border-slate-800 px-2 py-1 rounded">
                {scenario.role} {/* Tampilkan Role Name */}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 relative z-10 text-slate-200 group-hover:text-amber-400 transition-colors">
              {scenario.title}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed relative z-10 line-clamp-3">
              {scenario.desc} {/* Deskripsi dari backend */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
