// src/components/StoryScreen.jsx
import React from "react";

export default function StoryScreen({ currentNode, handleChoice }) {
  // currentNode sekarang berisi data dari API (current_scenario)

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-4 duration-500">
      {/* Kartu Cerita Utama */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-10 rounded-xl shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-6 text-center">
          <h2 className="text-2xl font-bold text-amber-500 uppercase tracking-widest drop-shadow-md">
            {currentNode.title}
          </h2>

          <div className="w-16 h-1 bg-slate-800 mx-auto rounded-full"></div>

          <p className="text-lg leading-relaxed text-slate-300 font-light">
            {currentNode.description}
          </p>

          {/* Dilemma Question */}
          <div className="pt-4">
            <p className="text-amber-600 font-mono text-sm tracking-widest uppercase animate-pulse">
              {currentNode.dilemma}
            </p>
          </div>
        </div>
      </div>

      {/* Pilihan / Choices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentNode.choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => handleChoice(choice.id)} // Kirim "A" atau "B" ke handler
            className="group relative overflow-hidden p-6 rounded-lg border border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:border-amber-600 transition-all duration-300 text-left shadow-lg hover:shadow-amber-900/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 font-bold group-hover:bg-amber-600 group-hover:text-white transition-colors">
                {choice.id}
              </span>
              <div>
                <p className="text-slate-300 group-hover:text-white font-medium transition-colors">
                  {choice.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
