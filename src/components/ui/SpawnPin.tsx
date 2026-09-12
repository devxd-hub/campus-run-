import React from 'react';
import { cn } from '../../lib/utils';
import { SpawnPoint, SpawnTier } from '../../types';

export interface SpawnPinProps {
  spawn: SpawnPoint;
  isSelected?: boolean;
  isNearby?: boolean;
  onClick?: (spawn: SpawnPoint) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SpawnPin: React.FC<SpawnPinProps> = ({
  spawn,
  isSelected = false,
  isNearby = false,
  onClick,
  size = 'md',
  className,
}) => {
  const isClaimed = spawn.status === 'claimed';

  const tierColors: Record<SpawnTier, { bg: string; text: string; border: string; glow: string }> = {
    tier1: {
      bg: '#FAF4EB',
      text: '#1A1310',
      border: '#70625B',
      glow: 'rgba(112, 98, 91, 0.25)',
    },
    tier2: {
      bg: '#FBEEE1',
      text: '#D44E11',
      border: '#D44E11',
      glow: 'rgba(212, 78, 17, 0.35)',
    },
    tier3: {
      bg: '#F16321',
      text: '#FBF6EE',
      border: '#FAF4EB',
      glow: 'rgba(241, 99, 33, 0.45)',
    },
    tier4: {
      bg: '#1A1310',
      text: '#F16321',
      border: '#F16321',
      glow: 'rgba(241, 99, 33, 0.65)',
    },
  };

  const style = tierColors[spawn.tier];

  const sizeClasses = {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-9 h-9 text-xs',
    lg: 'w-11 h-11 text-sm',
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(spawn);
      }}
      className={cn(
        'relative inline-flex items-center justify-center cursor-pointer transition-transform duration-200 select-none group',
        isSelected && 'scale-125 z-30',
        !isSelected && 'hover:scale-110 active:scale-95',
        isClaimed && 'opacity-60 grayscale-[30%]',
        className
      )}
      style={{
        filter: isSelected
          ? `drop-shadow(0 0 10px ${style.glow})`
          : undefined,
      }}
    >
      {/* Radar pulse for active rare/epic/legendary spawns or nearby */}
      {!isClaimed && (spawn.tier === 'tier3' || spawn.tier === 'tier4' || isNearby) && (
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-40 pointer-events-none"
          style={{ backgroundColor: style.border }}
        />
      )}

      {/* Pin Body */}
      <div
        className={cn(
          'relative rounded-full flex items-center justify-center font-bold font-display shadow-md border-2 transition-all',
          sizeClasses[size]
        )}
        style={{
          backgroundColor: isClaimed ? '#EADBC8' : style.bg,
          color: isClaimed ? '#70625B' : style.text,
          borderColor: isClaimed ? '#70625B' : style.border,
        }}
      >
        <span className="leading-none tracking-tight">
          {spawn.points}
        </span>

        {/* Small claim check indicator */}
        {isClaimed && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#70625B] text-[#FBF6EE] rounded-full flex items-center justify-center text-[8px] font-bold border border-[#FAF4EB]">
            ✓
          </span>
        )}
      </div>

      {/* Pointer tip triangle */}
      <div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-[5px]"
        style={{
          borderTopColor: isClaimed ? '#70625B' : style.border,
        }}
      />
    </div>
  );
};
