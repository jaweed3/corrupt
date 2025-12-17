import React from "react";
import { X, Play, LogOut } from "lucide-react";

const SystemMenu = ({ isOpen, onClose, onToLobby }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="max-w-sm w-full bg-slate-900 border border-slate-700 p-8 rounded-lg shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white"
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold text-center text-white mb-8 uppercase tracking-widest">
          System Menu
        </h2>
        <div className="space-y-3">
          <button
            onClick={onClose}
            className="w-full p-4 bg-amber-700 hover:bg-amber-600 text-white rounded font-bold flex items-center justify-center gap-3 transition-all"
          >
            <Play size={18} /> RESUME
          </button>
          <button
            onClick={() => {
              onClose();
              onToLobby();
            }}
            className="w-full p-4 bg-transparent hover:bg-red-900/30 text-red-400 border border-red-900/50 rounded font-bold flex items-center justify-center gap-3 transition-colors"
          >
            <LogOut size={18} /> EXIT TO LOBBY
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemMenu;
