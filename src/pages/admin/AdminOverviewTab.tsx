import React from 'react';
import { AdminOverviewStats } from '../../types';
import { StatCard } from '../../components/ui/StatCard';
import { formatNumber } from '../../lib/utils';
import {
  Users,
  Award,
  Crosshair,
  Trophy,
  Flame,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export interface AdminOverviewTabProps {
  stats: AdminOverviewStats;
  rotationNumber: number;
}

export const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({
  stats,
  rotationNumber,
}) => {
  const maxClaims = Math.max(...stats.participationOverTime.map((p) => p.claims), 100);

  return (
    <div className="flex flex-col gap-4 font-body pb-20 select-none">
      {/* Header Banner */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-base font-bold font-display tracking-tight text-[#FBF6EE]">
            CAMPUS TELEMETRY
          </h2>
          <span className="text-[11px] text-[#9B8C84]">
            Live rotation #{rotationNumber} metrics
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2E231E] border border-[#3E2E27] text-[#F16321] font-bold">
          UPDATED REALTIME
        </span>
      </div>

      {/* A1 Requirement: 4 Stat Cards in I9 Component Style (Large number, small label, restrained card, strong hierarchy) */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* 1. Active Players */}
        <StatCard
          label="ACTIVE PLAYERS"
          value={stats.activePlayersCount}
          sublabel="Within campus GPS bounds"
          icon={<Users className="w-4 h-4" />}
          variant="dark"
          trend={{ direction: 'up', text: '+18% today' }}
        />

        {/* 2. Points Claimed Today */}
        <StatCard
          label="POINTS CLAIMED"
          value={stats.pointsClaimedToday}
          sublabel="Across all campus zones"
          icon={<Award className="w-4 h-4" />}
          variant="dark"
        />

        {/* 3. Spawns Currently Live */}
        <StatCard
          label="SPAWNS LIVE"
          value={stats.spawnsLiveCount}
          sublabel={`of ${stats.totalSpawnsPool} total pool`}
          icon={<Crosshair className="w-4 h-4" />}
          variant="dark"
        />

        {/* 4. Top Score This Week */}
        <StatCard
          label="TOP SCORE"
          value={`${formatNumber(stats.topScoreThisWeek)}`}
          sublabel={stats.topPlayerUsername}
          icon={<Trophy className="w-4 h-4" />}
          variant="dark"
        />
      </div>

      {/* A1 Requirement: Participation-Over-Time Chart */}
      <div className="p-4 bg-[#231B17] border border-[#322520] rounded-2xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold font-display uppercase tracking-wider text-[#FBF6EE]">
              PARTICIPATION TODAY
            </span>
            <span className="text-[10px] text-[#9B8C84]">
              Hourly claims volume & student activity
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#F16321]">
            <span className="w-2 h-2 rounded-full bg-[#F16321]" />
            <span>CLAIMS</span>
          </div>
        </div>

        {/* Mobile SVG Bar/Trend Chart */}
        <div className="w-full h-36 flex items-end justify-between gap-2 pt-4 pb-2 border-b border-[#322520]">
          {stats.participationOverTime.map((item, idx) => {
            const heightPercent = Math.max(12, Math.round((item.claims / maxClaims) * 100));

            return (
              <div
                key={item.hour}
                className="flex-1 flex flex-col items-center justify-end h-full group cursor-pointer"
              >
                {/* Tooltip on tap/hover */}
                <div className="opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity mb-1 bg-[#1A1310] border border-[#3E2E27] px-1.5 py-0.5 rounded text-[9px] font-mono text-[#FBF6EE] whitespace-nowrap z-10 pointer-events-none">
                  {item.claims} claims
                </div>

                {/* Bar */}
                <div
                  className={`w-full rounded-t-sm transition-all ${
                    idx === stats.participationOverTime.length - 2
                      ? 'bg-[#F16321]'
                      : 'bg-[#3E2E27] group-hover:bg-[#F16321]/80'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>
            );
          })}
        </div>

        {/* Hour Labels */}
        <div className="flex items-center justify-between text-[10px] font-mono text-[#9B8C84] px-1">
          {stats.participationOverTime.map((item) => (
            <span key={`lbl-${item.hour}`}>{item.hour}</span>
          ))}
        </div>
      </div>

      {/* A1 Requirement: Most-Claimed Spots */}
      <div className="p-4 bg-[#231B17] border border-[#322520] rounded-2xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold font-display uppercase tracking-wider text-[#FBF6EE]">
              MOST-CLAIMED CAMPUS SPOTS
            </span>
            <span className="text-[10px] text-[#9B8C84]">
              High foot-traffic landmark destinations
            </span>
          </div>
          <Flame className="w-4 h-4 text-[#F16321]" />
        </div>

        <div className="flex flex-col gap-2 mt-1">
          {stats.mostClaimedSpots.map((spot, index) => {
            const maxSpotClaims = stats.mostClaimedSpots[0]?.claimsCount || 1;
            const widthPct = Math.max(15, Math.round((spot.claimsCount / maxSpotClaims) * 100));

            return (
              <div
                key={spot.id}
                className="p-3 bg-[#1A1310] border border-[#2E231E] rounded-xl flex flex-col gap-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded bg-[#2E231E] text-[#F16321] text-[10px] font-bold font-display flex items-center justify-center shrink-0">
                      #{index + 1}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-[#FBF6EE] truncate font-display">
                        {spot.title}
                      </span>
                      <span className="text-[10px] text-[#9B8C84] font-body truncate">
                        {spot.zoneName} · {spot.code}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-xs font-bold font-mono text-[#F16321]">
                      {spot.claimsCount} claims
                    </span>
                    <span className="text-[10px] text-[#9B8C84] font-mono">
                      +{spot.points} pts
                    </span>
                  </div>
                </div>

                {/* Progress Density Bar */}
                <div className="w-full h-1.5 bg-[#2E231E] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#F16321] to-[#E65100] rounded-full"
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
