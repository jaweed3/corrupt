import React from "react";
import { BookOpen } from "lucide-react";

const StoryScreen = ({ currentNode, handleChoice }) => {
  if (!currentNode) return null;
  return (
    <div className="bg-slate-900/80 backdrop-blur border border-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl min-h-[400px] flex flex-col justify-between relative animate-fade-in">
      <div>
        <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
          <BookOpen size={20} className="text-amber-600" />
          <h2 className="text-lg sm:text-xl text-amber-500 font-bold uppercase tracking-widest">
            {currentNode.title}
          </h2>
        </div>
        <p className="text-lg leading-relaxed text-slate-300 font-light">
          {currentNode.text}
        </p>
      </div>

      <div className="mt-8 space-y-3">
        {currentNode.choices.map((choice, idx) => (
          <button
            key={idx}
            onClick={() => handleChoice(choice)}
            className="w-full text-left p-5 bg-slate-800/50 hover:bg-slate-800 border-l-4 border-slate-700 hover:border-amber-500 rounded-r-lg transition-all group relative overflow-hidden"
          >
            <div className="relative z-10">
              <span className="block font-bold text-slate-200 group-hover:text-amber-400 mb-2 text-lg">
                {choice.text}
              </span>

              {/* BAGIAN INI YANG HILANG SEBELUMNYA (Logic Efek) */}
              <div className="flex flex-wrap gap-3 text-xs font-mono text-slate-500 group-hover:text-slate-400 transition-colors">
                {/* Efek Uang */}
                {choice.effect.money !== 0 && (
                  <span
                    className={
                      choice.effect.money > 0
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {choice.effect.money > 0 ? "+" : ""}${choice.effect.money}
                  </span>
                )}

                {/* Efek Trust */}
                {choice.effect.trust !== 0 && (
                  <span
                    className={
                      choice.effect.trust > 0 ? "text-blue-400" : "text-red-400"
                    }
                  >
                    {choice.effect.trust > 0 ? "+" : ""}
                    {choice.effect.trust}% Trust
                  </span>
                )}

                {/* Efek Risk */}
                {choice.effect.risk !== 0 && (
                  <span
                    className={
                      choice.effect.risk > 0
                        ? "text-orange-400"
                        : "text-green-400"
                    }
                  >
                    {choice.effect.risk > 0 ? "+" : ""}
                    {choice.effect.risk}% Risk
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StoryScreen;
