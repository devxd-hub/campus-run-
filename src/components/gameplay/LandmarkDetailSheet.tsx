import React, { useState } from 'react';
import { CampusLandmark, LandmarkCategory } from '../../data/landmarks';
import { getLandmarkCategoryToken } from '../../styles/tokens';
import { SpawnPoint } from '../../types';
import { Button } from '../ui/Button';
import { getTurfDistanceMeters } from '../../lib/geo';
import {
  Building2,
  Sparkles,
  MapPin,
  Clock,
  Flame,
  CheckCircle2,
  ChevronRight,
  Compass,
  Trophy,
  GraduationCap,
  UtensilsCrossed,
  Loader2,
  Zap,
} from 'lucide-react';

export interface LandmarkDetailSheetProps {
  landmark: CampusLandmark;
  nearbySpawns: SpawnPoint[];
  playerLat?: number;
  playerLng?: number;
  onSelectSpawn: (spawn: SpawnPoint) => void;
  onClaimSpawn?: (spawnId: string) => Promise<void>;
  onClose: () => void;
}

function getCategoryIcon(category: LandmarkCategory) {
  switch (category) {
    case 'hostel':
      return Building2;
    case 'lecture_hall':
      return GraduationCap;
    case 'academic':
      return GraduationCap;
    case 'sports':
      return Trophy;
    case 'dining':
      return UtensilsCrossed;
    case 'facility':
      return Compass;
    case 'admin':
      return Building2;
    default:
      return Building2;
  }
}

function formatTimeRemaining(expiresAt?: string): string | null {
  if (!expiresAt) return null;
  const diffMs = new Date(expiresAt).getTime() - Date.now();
  if (diffMs <= 0) return 'Ending soon';
  const mins = Math.floor(diffMs / (1000 * 60));
  if (mins < 60) return `${mins}m left`;
  const hours = Math.floor(mins / 60);
  const remMins = mins % 60;
  return `${hours}h ${remMins}m left`;
}

export const LandmarkDetailSheet: React.FC<LandmarkDetailSheetProps> = ({
  landmark,
  nearbySpawns,
  playerLat,
  playerLng,
  onSelectSpawn,
  onClaimSpawn,
  onClose,
}) => {
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const CategoryIcon = getCategoryIcon(landmark.category);
  const categoryToken = getLandmarkCategoryToken(landmark.category, landmark.id);

  const handleDirectClaim = async (e: React.MouseEvent, spawnId: string) => {
    e.stopPropagation();
    if (!onClaimSpawn || claimingId) return;
    setClaimingId(spawnId);
    try {
      await onClaimSpawn(spawnId);
    } finally {
      setClaimingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-4 text-[#1A1310] select-none pb-2">
      {/* Top Header Identity with Category-matched SVG Palette */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div
            className="w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 mt-0.5 shadow-2xs transition-colors"
            style={{
              backgroundColor: categoryToken.bg,
              borderColor: categoryToken.border,
              color: categoryToken.color,
            }}
          >
            <CategoryIcon className="w-6 h-6" />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-[10px] font-bold uppercase tracking-wider font-mono px-2 py-0.5 border rounded-md flex items-center gap-1.5"
                style={{
                  backgroundColor: categoryToken.bg,
                  borderColor: categoryToken.border,
                  color: categoryToken.color,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full border border-black/25 shrink-0"
                  style={{ backgroundColor: categoryToken.fill }}
                />
                {landmark.categoryLabel}
              </span>
              <span className="text-[10px] font-mono text-[#70625B]">
                {landmark.code}
              </span>
            </div>

            <h2 className="text-base font-bold font-display tracking-tight text-[#1A1310] mt-1">
              {landmark.name}
            </h2>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-[#70625B] leading-relaxed font-body bg-[#FAF4EB] p-3.5 rounded-xl border border-[#EADBC8]">
        {landmark.description}
      </p>

      {/* Active Drops at this Landmark */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F16321]" />
            <span className="text-xs font-bold font-display uppercase tracking-wider text-[#1A1310]">
              ACTIVE CAMPUS DROPS ({nearbySpawns.length})
            </span>
          </div>
          {nearbySpawns.length > 0 && (
            <span className="text-[10px] font-mono text-[#70625B]">
              Tap drop to focus
            </span>
          )}
        </div>

        {nearbySpawns.length === 0 ? (
          <div className="p-4 bg-[#FAF4EB] border border-[#EADBC8] rounded-xl text-center flex flex-col items-center gap-1 text-[#70625B]">
            <Compass className="w-5 h-5 opacity-40 text-[#70625B]" />
            <span className="text-xs font-medium text-[#1A1310]">
              No active drops at this building
            </span>
            <p className="text-[11px] text-[#70625B]">
              New spawn points rotate periodically across campus zones.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {nearbySpawns.map((spawn) => {
              const distanceMeters =
                playerLat !== undefined && playerLng !== undefined
                  ? Math.round(getTurfDistanceMeters(playerLat, playerLng, spawn.lat, spawn.lng))
                  : null;
              const inRange = distanceMeters !== null && distanceMeters <= spawn.claimRadiusMeters;
              const isClaimed = spawn.status === 'claimed';
              const timeRemaining = formatTimeRemaining(spawn.expiresAt);
              const isCurrentClaiming = claimingId === spawn.id;

              return (
                <div
                  key={spawn.id}
                  onClick={() => onSelectSpawn(spawn)}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 shadow-2xs cursor-pointer transition-all active:scale-[0.99] ${
                    inRange && !isClaimed
                      ? 'bg-[#FFF8F2] border-[#F16321]/40 hover:border-[#F16321]'
                      : 'bg-[#FAF4EB] hover:bg-[#FBEEE1] border-[#EADBC8] hover:border-[#F16321]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Points Badge */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold font-display text-xs shrink-0 shadow-xs ${
                        isClaimed
                          ? 'bg-[#1A1310] text-[#FAF4EB]'
                          : 'bg-[#F16321] text-[#FAF4EB]'
                      }`}
                    >
                      {isClaimed ? (
                        <CheckCircle2 className="w-5 h-5 text-[#FAF4EB]" />
                      ) : (
                        `+${spawn.points}`
                      )}
                    </div>

                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1A1310] truncate font-display">
                          {spawn.title}
                        </span>
                        {inRange && !isClaimed && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-[#F16321] bg-[#FBEEE1] border border-[#F16321]/30 px-1.5 py-0.2 rounded">
                            IN RANGE
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-[#70625B] font-mono mt-0.5">
                        {distanceMeters !== null && (
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-[#F16321]" />
                            {distanceMeters}m
                          </span>
                        )}
                        {timeRemaining && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-0.5">
                              <Clock className="w-3 h-3 text-[#70625B]" />
                              {timeRemaining}
                            </span>
                          </>
                        )}
                        <span>·</span>
                        <span className="text-[#F16321] uppercase font-bold">
                          {spawn.tier}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5">
                    {inRange && !isClaimed && onClaimSpawn ? (
                      <Button
                        size="sm"
                        variant="primary"
                        disabled={isCurrentClaiming}
                        className="text-xs px-3 shadow-xs font-bold"
                        onClick={(e) => handleDirectClaim(e, spawn.id)}
                      >
                        {isCurrentClaiming ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <>
                            <Zap className="w-3.5 h-3.5 mr-1" />
                            CLAIM
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs px-3 font-medium text-[#1A1310] hover:text-[#F16321]"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectSpawn(spawn);
                        }}
                      >
                        VIEW
                        <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Dismiss Action */}
      <div className="pt-1">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs text-[#70625B]"
          onClick={onClose}
        >
          CLOSE LANDMARK
        </Button>
      </div>
    </div>
  );
};
