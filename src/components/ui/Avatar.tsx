import React from 'react';
import { cn } from '../../lib/utils';
import { SpawnTier } from '../../types';

export interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  tier?: SpawnTier | string;
  showBadge?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  size = 'md',
  tier,
  showBadge = false,
  className,
}) => {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '??';

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-20 h-20 text-2xl',
  };

  const tierRing = {
    tier1: 'ring-2 ring-[#70625B]',
    tier2: 'ring-2 ring-[#D44E11]',
    tier3: 'ring-2 ring-[#F16321]',
    tier4: 'ring-2 ring-[#1A1310] ring-offset-2 ring-offset-[#F16321]',
  };

  return (
    <div className="relative inline-flex shrink-0 select-none">
      <div
        className={cn(
          'rounded-full flex items-center justify-center font-bold font-display overflow-hidden bg-[#FBEEE1] text-[#1A1310] border border-[#EADBC8] shadow-xs',
          sizeClasses[size],
          tier && tierRing[tier as keyof typeof tierRing],
          className
        )}
      >
        {src ? (
          <img
            src={src}
            alt={name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {showBadge && tier && (
        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#F16321] border-2 border-[#FAF4EB] rounded-full" />
      )}
    </div>
  );
};
