import React from "react";
import { DollarSign, Users, AlertTriangle } from "lucide-react";

const HUD = ({ stats }) => (
  <div className="grid grid-cols-3 gap-2 sm:gap-4 bg-slate-900/90 backdrop-blur border-b-2 border-amber-900/50 p-4 rounded-xl shadow-2xl animate-fade-in-down">
    {/* BAGIAN UANG (MONEY) */}
    <div className="flex items-center gap-3 justify-center">
      <div className="p-2 bg-green-900/20 rounded-lg text-green-500 ring-1 ring-green-900/50">
        <DollarSign size={20} />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
          Dana
        </span>
        <span className="text-lg font-mono font-bold text-green-400">
          ${stats.money.toLocaleString()}
        </span>
      </div>
    </div>

    {/* BAGIAN KEPERCAYAAN (TRUST) - INI YANG HILANG SEBELUMNYA */}
    <div className="flex items-center gap-3 justify-center border-x border-slate-800/50">
      <div className="p-2 bg-blue-900/20 rounded-lg text-blue-500 ring-1 ring-blue-900/50">
        <Users size={20} />
      </div>
      <div className="flex flex-col w-full max-w-[100px]">
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
          Trust
        </span>
        <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: `${stats.trust}%` }}
          ></div>
        </div>
      </div>
    </div>

    {/* BAGIAN RISIKO (RISK) */}
    <div className="flex items-center gap-3 justify-center">
      <div
        className={`p-2 rounded-lg ring-1 transition-colors ${
          stats.risk > 70
            ? "bg-red-900/20 text-red-500 ring-red-900/50 animate-pulse"
            : "bg-orange-900/20 text-orange-500 ring-orange-900/50"
        }`}
      >
        <AlertTriangle size={20} />
      </div>
      <div className="flex flex-col w-full max-w-[100px]">
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
          Risiko
        </span>
        <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              stats.risk > 70 ? "bg-red-500" : "bg-orange-500"
            }`}
            style={{ width: `${stats.risk}%` }}
          ></div>
        </div>
      </div>
    </div>
  </div>
);

export default HUD;
