import React from "react";
import { ArrowLeft, Users } from "lucide-react";

export default function CreditsScreen({ creators, onBack }) {
  return (
    <div className="w-full max-w-4xl flex flex-col gap-10 py-10">
      <div className="text-center relative">
        <button
          onClick={onBack}
          className="absolute left-0 top-1 text-slate-500 hover:text-white flex items-center gap-2 text-sm transition-colors"
        >
          <ArrowLeft size={16} /> BACK
        </button>
        <h1 className="text-3xl font-bold tracking-widest text-white uppercase drop-shadow-md">
          System Architects
        </h1>
        <div className="w-20 h-1 bg-amber-600 mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(217,119,6,0.6)]"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {creators.map((c) => (
          <div
            key={c.id}
            className={`bg-slate-900 border-l-4 ${c.color} p-6 rounded-r-xl shadow-lg hover:bg-slate-800 transition-colors group`}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-slate-950 rounded-full border border-slate-800 group-hover:border-slate-600 transition-colors">
                <Users
                  size={20}
                  className="text-slate-400 group-hover:text-slate-200 transition-colors"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{c.name}</h3>
                <span className="text-xs font-mono text-amber-600 uppercase tracking-widest">
                  {c.role}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 italic">"{c.quote}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
