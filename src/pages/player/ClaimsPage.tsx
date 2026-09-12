import React from 'react';
import { ClaimRecord, PlayerProfile } from '../../types';
import { Pill } from '../../components/ui/Pill';
import { StatCard } from '../../components/ui/StatCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { formatNumber } from '../../lib/utils';
import { Award, Zap, Flame, CheckCircle2 } from 'lucide-react';

export interface ClaimsPageProps {
  claims: ClaimRecord[];
  player: PlayerProfile;
  onExploreClick?: () => void;
}

export const ClaimsPage: React.FC<ClaimsPageProps> = ({
  claims,
  player,
  onExploreClick,
}) => {
  return (
    <div className="flex-1 w-full p-4 flex flex-col gap-4 overflow-y-auto">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold font-display tracking-tight text-[#1A1310]">
          My Claims & History
        </h2>
        <p className="text-xs text-[#70625B]">
          Verified campus spawn collections and point earnings.
        </p>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        <StatCard
          label="Total Earned"
          value={player.totalPoints}
          sublabel="All rotations"
          icon={<Flame className="w-4 h-4" />}
          variant="highlight"
        />
        <StatCard
          label="Spawns Claimed"
          value={claims.length}
          sublabel={`${player.currentStreakDays} day streak`}
          icon={<Award className="w-4 h-4" />}
        />
      </div>

      {/* Claims History Log */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-bold font-display uppercase tracking-wider text-[#70625B] mt-1">
          Recent Verified Claims
        </h3>

        {claims.length === 0 ? (
          <EmptyState
            icon={<Award className="w-6 h-6" />}
            title="No claims yet"
            description="Explore the campus map and reach active spawn points to earn points."
            actionLabel="View Campus Map"
            onAction={onExploreClick}
          />
        ) : (
          claims.map((claim) => (
            <div
              key={claim.id}
              className="p-3 bg-[#FAF4EB] border border-[#EADBC8] rounded-xl flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#FBEEE1] border border-[#EADBC8] flex items-center justify-center text-[#2E7D32] shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-[#1A1310] truncate font-body">
                    {claim.spawnTitle}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#70625B]">
                    <span>{claim.zoneName}</span>
                    <span>•</span>
                    <span className="font-mono text-[11px]">{claim.distanceAtClaimMeters.toFixed(1)}m</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0">
                <span className="text-sm font-bold font-display text-[#F16321]">
                  +{formatNumber(claim.pointsAwarded)} PTS
                </span>
                <Pill tier={claim.tier} size="xs" className="mt-1">
                  {claim.tier.toUpperCase()}
                </Pill>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
