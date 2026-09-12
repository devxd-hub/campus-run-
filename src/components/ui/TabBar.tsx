import React from 'react';
import { cn } from '../../lib/utils';
import { PlayerNavTab } from '../../types';
import { MapPin, Trophy, User } from 'lucide-react';

export interface TabBarProps {
  activeTab: PlayerNavTab;
  onTabChange: (tab: PlayerNavTab) => void;
  claimBadgeCount?: number;
  activeSpawnsBadge?: number;
}

interface TabItem {
  id: PlayerNavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export const TabBar: React.FC<TabBarProps> = ({
  activeTab,
  onTabChange,
  activeSpawnsBadge,
}) => {
  // Exact 3 Core Tabs as mandated in the technical spec: Map, Leaderboard, Profile
  const tabs: TabItem[] = [
    { id: 'map', label: 'Map', icon: MapPin, badge: activeSpawnsBadge },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav
      aria-label="Main Player Navigation"
      className="w-full bg-[#FAF4EB]/95 backdrop-blur-md border-t border-[#EADBC8] px-3 pt-1 pb-safe shrink-0 z-[40]"
    >
      <div className="flex items-center justify-around h-14 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'relative flex flex-col items-center justify-center flex-1 h-full min-h-[44px] min-w-[44px] transition-all cursor-pointer group',
                isActive ? 'text-[#F16321]' : 'text-[#70625B] hover:text-[#1A1310]'
              )}
            >
              {/* Active Pill background highlight */}
              {isActive && (
                <span className="absolute inset-x-3 inset-y-1.5 bg-[#FBEEE1] rounded-xl -z-10 transition-all border border-[#F3DEC9]" />
              )}

              <div className="relative flex items-center justify-center">
                <Icon
                  className={cn(
                    'w-5 h-5 transition-transform group-active:scale-95',
                    isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'
                  )}
                />
                {tab.badge && tab.badge > 0 && !isActive && (
                  <span className="absolute -top-1 -right-2 px-1.5 py-0.2 bg-[#F16321] text-[#FAF4EB] text-[9px] font-bold rounded-full font-mono">
                    {tab.badge}
                  </span>
                )}
              </div>

              <span
                className={cn(
                  'text-[10px] mt-0.5 tracking-tight font-display select-none',
                  isActive ? 'font-bold text-[#F16321]' : 'font-medium text-[#70625B]'
                )}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
