import React, { useState } from 'react';
import { TabBar } from '../components/ui/TabBar';
import { PlayerNavTab, PlayerProfile, RotationState, AppNotification } from '../types';
import { formatDuration, formatNumber } from '../lib/utils';
import { Clock, Flame, ShieldAlert, Bell } from 'lucide-react';
import { Pill } from '../components/ui/Pill';
import { NotificationsDrawer } from '../components/notifications/NotificationsDrawer';

export interface PlayerLayoutProps {
  activeTab: PlayerNavTab;
  onTabChange: (tab: PlayerNavTab) => void;
  player: PlayerProfile;
  rotation: RotationState;
  notifications: AppNotification[];
  onMarkNotificationAsRead: (id: string) => void;
  onSwitchToAdmin?: () => void;
  children: React.ReactNode;
}

export const PlayerLayout: React.FC<PlayerLayoutProps> = ({
  activeTab,
  onTabChange,
  player,
  rotation,
  notifications,
  onMarkNotificationAsRead,
  onSwitchToAdmin,
  children,
}) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative flex flex-col h-full w-full bg-[#FBF6EE] text-[#1A1310] overflow-hidden select-none">
      {/* Top Header Bar */}
      <header className="h-14 px-4 bg-[#FAF4EB] border-b border-[#EADBC8] flex items-center justify-between shrink-0 z-[30]">
        {/* Brand / Game Identity */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#F16321] text-[#FAF4EB] flex items-center justify-center font-bold font-display text-sm tracking-tighter shadow-xs">
            I9
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold font-display tracking-tight text-[#1A1310] leading-tight">
              PROJECT I9
            </span>
            <span className="text-[10px] text-[#70625B] leading-none font-body">
              Rot #{rotation.rotationNumber}
            </span>
          </div>
        </div>

        {/* Right Header Statuses: Timer, Notifications & Points */}
        <div className="flex items-center gap-2">
          {/* Notifications Button (Screen 08) */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            title="Campus Notifications"
            className="relative p-1.5 text-[#70625B] hover:text-[#1A1310] hover:bg-[#FBEEE1] rounded-lg transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#F16321] rounded-full ring-2 ring-[#FAF4EB]" />
            )}
          </button>

          {/* Rotation Timer Pill */}
          <Pill
            variant="timer"
            size="sm"
            icon={<Clock className="w-3 h-3 text-[#F16321]" />}
          >
            {formatDuration(rotation.nextRotationInSeconds)}
          </Pill>

          {/* Points Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FBEEE1] border border-[#EADBC8] rounded-lg">
            <Flame className="w-3.5 h-3.5 text-[#F16321] shrink-0 fill-[#F16321]" />
            <span className="text-xs font-bold font-display text-[#1A1310]">
              {formatNumber(player.totalPoints)}
            </span>
          </div>

          {/* Admin Switch Quick Button if role allows */}
          {onSwitchToAdmin && (
            <button
              onClick={onSwitchToAdmin}
              title="Admin Panel"
              className="p-1.5 text-[#70625B] hover:text-[#1A1310] hover:bg-[#FBEEE1] rounded-lg transition-colors"
            >
              <ShieldAlert className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      {/* Main Screen Viewport Container */}
      <main className="flex-1 overflow-hidden relative w-full flex flex-col">
        {children}
      </main>

      {/* Persistent Mobile Bottom Navigation Bar (Map, Leaderboard, Profile) */}
      <TabBar
        activeTab={activeTab}
        onTabChange={onTabChange}
        activeSpawnsBadge={rotation.totalActiveSpawns}
        claimBadgeCount={player.claimsCount}
      />

      {/* Screen 08: Notifications Drawer */}
      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        notifications={notifications}
        onClose={() => setIsNotificationsOpen(false)}
        onMarkAsRead={onMarkNotificationAsRead}
      />
    </div>
  );
};
