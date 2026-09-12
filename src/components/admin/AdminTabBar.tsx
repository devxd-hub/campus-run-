import React from 'react';
import { AdminNavTab } from '../../types';
import { cn } from '../../lib/utils';
import {
  LayoutDashboard,
  MapPin,
  RefreshCw,
  RotateCcw,
  BarChart3,
} from 'lucide-react';

export interface AdminTabBarProps {
  activeTab: AdminNavTab;
  onTabChange: (tab: AdminNavTab) => void;
  activeSpawnsCount?: number;
}

interface AdminTabItem {
  id: AdminNavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export const AdminTabBar: React.FC<AdminTabBarProps> = ({
  activeTab,
  onTabChange,
  activeSpawnsCount,
}) => {
  // Documented exact 5-tab navigation: Overview, Points, Rotate, Reset, Stats
  const tabs: AdminTabItem[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'points', label: 'Points', icon: MapPin, badge: activeSpawnsCount },
    { id: 'rotate', label: 'Rotate', icon: RefreshCw },
    { id: 'reset', label: 'Reset', icon: RotateCcw },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
  ];

  return (
    <nav
      aria-label="Admin Navigation"
      className="w-full bg-[#231B17] border-t border-[#322520] px-2 pt-1 pb-safe shrink-0 z-40 select-none"
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
                isActive ? 'text-[#F16321]' : 'text-[#9B8C84] hover:text-[#FBF6EE]'
              )}
            >
              {/* Active Tab Background Highlight */}
              {isActive && (
                <span className="absolute inset-x-1 inset-y-1.5 bg-[#2E231E] rounded-xl -z-10 transition-all border border-[#3E2E27]" />
              )}

              <div className="relative flex items-center justify-center">
                <Icon
                  className={cn(
                    'w-5 h-5 transition-transform group-active:scale-95',
                    isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'
                  )}
                />
                {tab.badge !== undefined && tab.badge > 0 && !isActive && (
                  <span className="absolute -top-1 -right-2 px-1.5 py-0.2 bg-[#F16321] text-[#FAF4EB] text-[9px] font-bold rounded-full font-mono">
                    {tab.badge}
                  </span>
                )}
              </div>

              <span
                className={cn(
                  'text-[10px] mt-0.5 tracking-tight font-display select-none',
                  isActive ? 'font-bold text-[#F16321]' : 'font-medium text-[#9B8C84]'
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
