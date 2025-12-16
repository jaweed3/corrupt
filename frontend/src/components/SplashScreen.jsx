import React from "react";
import { Briefcase, Power } from "lucide-react";

export default function SplashScreen({ onStart, onEnterLobby }) {
  return (
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
        "In this country, honesty is the currency that holds no value."
      </p>
      <button
        onClick={onEnterLobby}
        className="mt-8 px-10 py-4 bg-white text-black hover:bg-amber-500 hover:text-white font-bold tracking-widest uppercase transition-all duration-300 rounded shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-amber-500/50 flex items-center gap-3"
      >
        <Power size={20} /> Enter System
      </button>
    </div>
  );
}
