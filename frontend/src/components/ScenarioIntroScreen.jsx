import React from "react";
import { ArrowLeft, Briefcase, ChevronRight } from "lucide-react";

export default function ScenarioIntroScreen({ scenario, onStart, onBack }) {
  if (!scenario) return null;

  return (
    <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 p-8 sm:p-12 rounded-2xl shadow-2xl text-center space-y-8 relative overflow-hidden transition-all">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
      <button
        onClick={onBack}
        className="absolute top-6 left-6 text-slate-600 hover:text-white flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors"
      >
        <ArrowLeft size={14} /> Cancel
      </button>
      <div className="w-24 h-24 bg-slate-950 rounded-full mx-auto flex items-center justify-center border-4 border-amber-900/30 shadow-inner group">
        <Briefcase
          size={40}
          className="text-amber-600 group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-wider mb-2 drop-shadow-lg">
          {scenario.title}
        </h1>
        <p className="text-amber-600 font-mono text-sm tracking-[0.2em] uppercase">
          "{scenario.subtitle}"
        </p>
      </div>
      <div className="bg-slate-950/50 p-6 rounded-lg border border-slate-800/50 text-sm leading-relaxed text-slate-300">
        {scenario.desc}
      </div>
      <button
        onClick={onStart}
        className="w-full sm:w-auto px-12 py-4 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded shadow-lg hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-3 tracking-widest uppercase text-sm group"
      >
        Start Simulation{" "}
        <ChevronRight
          size={16}
          className="group-hover:translate-x-1 transition-transform"
        />
      </button>
    </div>
  );
}
