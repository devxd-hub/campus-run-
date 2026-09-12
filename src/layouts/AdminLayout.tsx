import React from 'react';
import { AdminNavTab } from '../types';
import { AdminTabBar } from '../components/admin/AdminTabBar';
import { ArrowLeft, ShieldCheck, Radio } from 'lucide-react';

export interface AdminLayoutProps {
  activeTab: AdminNavTab;
  onTabChange: (tab: AdminNavTab) => void;
  onBackToGame: () => void;
  activeSpawnsCount?: number;
  rotationNumber?: number;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  onTabChange,
  onBackToGame,
  activeSpawnsCount,
  rotationNumber = 142,
  children,
}) => {
  return (
    <div className="flex flex-col h-full w-full bg-[#1A1310] text-[#FBF6EE] overflow-hidden select-none">
      {/* Mobile Admin Top Navigation Header */}
      <header className="h-14 px-4 bg-[#231B17] border-b border-[#322520] flex items-center justify-between shrink-0 z-30 select-none">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBackToGame}
            className="p-1.5 -ml-1 text-[#9B8C84] hover:text-[#FBF6EE] active:bg-[#2E231E] rounded-lg transition-colors flex items-center gap-1 text-xs font-display font-medium"
            aria-label="Back to Player Game"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Game</span>
          </button>

          <div className="h-4 w-px bg-[#322520]" />

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F16321] animate-pulse" />
              <h1 className="text-xs font-bold font-display uppercase tracking-wider text-[#FBF6EE]">
                PROJECT I9 ADMIN
              </h1>
            </div>
            <span className="text-[10px] text-[#9B8C84] font-mono">
              ROT #{rotationNumber} · CAMPUS AUTH
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#2E231E] border border-[#3E2E27] rounded text-[10px] font-mono text-[#F16321]">
          <ShieldCheck className="w-3 h-3" />
          <span className="font-bold">AUTHORIZED</span>
        </div>
      </header>

      {/* Main Admin Content View Area */}
      <main className="flex-1 overflow-y-auto p-4 relative scrollbar-none">
        {children}
      </main>

      {/* Mobile-First 5-Tab Admin Navigation Bar (A1-A5: Overview, Points, Rotate, Reset, Stats) */}
      <AdminTabBar
        activeTab={activeTab}
        onTabChange={onTabChange}
        activeSpawnsCount={activeSpawnsCount}
      />
    </div>
  );
};
