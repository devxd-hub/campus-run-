import React, { useState } from 'react';
import { LeaderboardResetSchedule } from '../../types';
import { Button } from '../../components/ui/Button';
import { Pill } from '../../components/ui/Pill';
import {
  RotateCcw,
  Calendar,
  Clock,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Archive,
  Sparkles,
} from 'lucide-react';
import { formatRelativeTime } from '../../lib/utils';

export interface AdminResetTabProps {
  schedule: LeaderboardResetSchedule;
  onUpdateSchedule: (schedule: Partial<LeaderboardResetSchedule>) => Promise<void>;
  onResetWeeklyLeaderboard: () => Promise<{ success: boolean; playersResetCount: number; message: string }>;
}

export const AdminResetTab: React.FC<AdminResetTabProps> = ({
  schedule,
  onUpdateSchedule,
  onResetWeeklyLeaderboard,
}) => {
  const [resetDay, setResetDay] = useState(schedule.resetDay || 'Sunday');
  const [resetTime, setResetTime] = useState(schedule.resetTime || '11:59 PM');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [confirmationInput, setConfirmationInput] = useState('');

  const handleSaveSchedule = async () => {
    await onUpdateSchedule({
      resetDay: resetDay as LeaderboardResetSchedule['resetDay'],
      resetTime,
    });
  };

  const handleConfirmReset = async () => {
    setIsResetting(true);
    try {
      await onResetWeeklyLeaderboard();
      setShowConfirmModal(false);
      setConfirmationInput('');
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 font-body pb-20 select-none">
      {/* Header Banner */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-base font-bold font-display tracking-tight text-[#FBF6EE]">
            LEADERBOARD RESET
          </h2>
          <span className="text-[11px] text-[#9B8C84]">
            Weekly standings cycle & score archiving
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2E231E] border border-[#3E2E27] text-[#F16321] font-bold">
          SCHEDULED
        </span>
      </div>

      {/* A4 Critical Business Rule Notice Banner */}
      <div className="p-4 bg-[#231B17] border-2 border-[#F16321]/60 rounded-2xl flex flex-col gap-3 shadow-md">
        <div className="flex items-center gap-2 text-[#F16321]">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span className="text-xs font-bold font-display uppercase tracking-wider text-[#FBF6EE]">
            CRITICAL BUSINESS RULE
          </span>
        </div>

        <div className="flex flex-col gap-2 text-xs font-body text-[#FBF6EE] leading-relaxed">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#7A9B76] shrink-0 mt-0.5" />
            <span>
              <strong>Weekly Score:</strong> Resets to 0 for all players on the weekly board at the scheduled time.
            </span>
          </div>

          <div className="flex items-start gap-2">
            <Lock className="w-4 h-4 text-[#F16321] shrink-0 mt-0.5" />
            <span>
              <strong>All-Time Score:</strong> Remains permanently archived and accumulated. Never destroyed or reset.
            </span>
          </div>

          <div className="flex items-start gap-2">
            <Archive className="w-4 h-4 text-[#9B8C84] shrink-0 mt-0.5" />
            <span>
              <strong>Isolation:</strong> Weekly points and career totals are strictly partitioned database columns.
            </span>
          </div>
        </div>
      </div>

      {/* A4 Requirement: Weekly Reset Schedule */}
      <div className="p-4 bg-[#231B17] border border-[#322520] rounded-2xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold font-display uppercase tracking-wider text-[#FBF6EE]">
            WEEKLY RESET SCHEDULE
          </span>
          <span className="text-[10px] font-mono text-[#F16321]">DOCUMENTED DEFAULT</span>
        </div>

        {/* Schedule Day Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#FBF6EE]">Scheduled Reset Day</label>
          <div className="grid grid-cols-4 gap-1.5">
            {['Sunday', 'Monday', 'Friday', 'Saturday'].map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setResetDay(day as LeaderboardResetSchedule['resetDay'])}
                className={`py-2 rounded-xl text-xs font-display font-bold border transition-colors ${
                  resetDay === day
                    ? 'bg-[#F16321] text-[#FAF4EB] border-[#D44E11]'
                    : 'bg-[#1A1310] text-[#9B8C84] border-[#322520] hover:text-[#FBF6EE]'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-[#9B8C84]">
            Documented default: <strong>Sunday</strong> (closes weekly competition)
          </span>
        </div>

        {/* Schedule Time Selector */}
        <div className="flex flex-col gap-1.5 pt-3 border-t border-[#2E231E]">
          <label className="text-xs font-bold text-[#FBF6EE]">Scheduled Reset Time</label>
          <div className="grid grid-cols-3 gap-1.5">
            {['11:59 PM', '10:00 PM', 'Midnight (12:00 AM)'].map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setResetTime(time)}
                className={`py-2 px-1 rounded-xl text-xs font-mono font-bold border truncate transition-colors ${
                  resetTime === time
                    ? 'bg-[#F16321] text-[#FAF4EB] border-[#D44E11]'
                    : 'bg-[#1A1310] text-[#9B8C84] border-[#322520] hover:text-[#FBF6EE]'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-[#9B8C84]">
            Documented default: <strong>11:59 PM</strong>
          </span>
        </div>

        {/* Next Scheduled Reset Pill */}
        <div className="p-3 bg-[#1A1310] border border-[#2E231E] rounded-xl flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-[#9B8C84]">
            <Clock className="w-4 h-4 text-[#F16321]" />
            <span>Next Automated Reset:</span>
          </div>
          <span className="text-[#F16321] font-bold">Sun 11:59 PM (2d 14h)</span>
        </div>

        <Button
          variant="outline"
          className="w-full border-[#322520] hover:bg-[#2E231E] text-xs"
          onClick={handleSaveSchedule}
        >
          Save Reset Schedule
        </Button>
      </div>

      {/* A4 Requirement: Manual Reset Action */}
      <div className="p-4 bg-[#231B17] border border-[#322520] rounded-2xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold font-display uppercase tracking-wider text-[#FBF6EE]">
              MANUAL STANDINGS RESET
            </span>
            <span className="text-[10px] text-[#9B8C84]">
              Immediate reset of weekly standings table
            </span>
          </div>
          <RotateCcw className="w-4 h-4 text-[#F16321]" />
        </div>

        <p className="text-xs text-[#9B8C84] leading-relaxed font-body">
          Forces an immediate start of a new weekly cycle. All player weekly scores reset to 0. All-time career totals and claim histories are preserved without loss.
        </p>

        <Button
          variant="primary"
          className="w-full"
          leftIcon={<RotateCcw className="w-4 h-4" />}
          onClick={() => setShowConfirmModal(true)}
        >
          RESET WEEKLY LEADERBOARD NOW
        </Button>
      </div>

      {/* A4 Requirement: Strict Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-[#1A1310]/85 backdrop-blur-xs flex items-center justify-center p-4 select-none">
          <div className="w-full max-w-sm bg-[#231B17] border border-[#322520] rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#2E231E] border border-[#3E2E27] flex items-center justify-center text-[#F16321]">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-bold font-display text-[#FBF6EE]">
                RESET WEEKLY STANDINGS?
              </h3>
              <p className="text-xs text-[#9B8C84] leading-relaxed font-body">
                This will reset weekly score to 0 PTS for all registered students. <strong>All-time points will NOT be affected.</strong>
              </p>
            </div>

            <div className="w-full p-3 bg-[#1A1310] border border-[#322520] rounded-xl text-left text-xs text-[#9B8C84] flex flex-col gap-1 font-mono">
              <div className="flex justify-between">
                <span>Weekly Points:</span>
                <span className="text-[#F16321] font-bold">→ 0 PTS (All players)</span>
              </div>
              <div className="flex justify-between">
                <span>All-Time Career:</span>
                <span className="text-[#7A9B76] font-bold">PRESERVED (No change)</span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2 mt-2">
              <Button
                variant="primary"
                className="w-full"
                isLoading={isResetting}
                onClick={handleConfirmReset}
              >
                YES, RESET WEEKLY SCORES
              </Button>

              <Button
                variant="outline"
                className="w-full border-[#322520]"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
