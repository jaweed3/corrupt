import React from "react";
import { Briefcase, Info, Menu } from "lucide-react";

const Navbar = ({ viewState, enterLobby, goToCredits, toggleMenu }) => {
  if (viewState === "SPLASH") return null;
  return (
    <nav className="w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50 p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={
            viewState === "LOBBY" || viewState === "CREDITS"
              ? enterLobby
              : () => toggleMenu(true)
          }
        >
          <div className="p-1.5 bg-amber-900/20 rounded border border-amber-900/50 group-hover:bg-amber-900/40 transition-colors">
            <Briefcase className="text-amber-500" size={20} />
          </div>
          <span className="font-bold text-lg tracking-widest text-slate-200 uppercase group-hover:text-amber-500 transition-colors">
            The Corrupt
          </span>
        </div>
        <div className="flex items-center gap-4">
          {viewState === "LOBBY" && (
            <button
              onClick={goToCredits}
              className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-800 rounded-full text-slate-400 hover:text-amber-500 transition-colors text-xs font-medium uppercase tracking-wide"
            >
              <Info size={16} /> <span>Tim</span>
            </button>
          )}
          {viewState !== "LOBBY" && viewState !== "CREDITS" && (
            <button
              onClick={() => toggleMenu(true)}
              className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
            >
              <Menu size={20} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
