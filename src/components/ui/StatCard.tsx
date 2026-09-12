import React from 'react';
import { cn, formatNumber } from '../../lib/utils';

export interface StatCardProps {
  label: string;
  value: number | string;
  sublabel?: string;
  icon?: React.ReactNode;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    text: string;
  };
  variant?: 'default' | 'highlight' | 'dark' | 'outline';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  sublabel,
  icon,
  trend,
  variant = 'default',
  className,
}) => {
  const variants = {
    default: 'bg-[#FBEEE1] border border-[#EADBC8] text-[#1A1310]',
    highlight: 'bg-[#F16321] text-[#FBF6EE] border border-[#D44E11] shadow-sm',
    dark: 'bg-[#1A1310] text-[#FBF6EE] border border-[#322520]',
    outline: 'bg-[#FAF4EB] border border-[#EADBC8] text-[#1A1310]',
  };

  const formattedValue = typeof value === 'number' ? formatNumber(value) : value;

  return (
    <div
      className={cn(
        'rounded-xl p-3.5 flex flex-col justify-between transition-all select-none',
        variants[variant],
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span
          className={cn(
            'text-xs font-medium tracking-tight truncate font-body',
            variant === 'highlight'
              ? 'text-[#FBF6EE]/80'
              : variant === 'dark'
              ? 'text-[#9B8C84]'
              : 'text-[#70625B]'
          )}
        >
          {label}
        </span>
        {icon && (
          <span
            className={cn(
              'shrink-0 text-current',
              variant === 'highlight' ? 'text-[#FBF6EE]' : 'text-[#F16321]'
            )}
          >
            {icon}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span
          className={cn(
            'text-2xl font-bold font-display tracking-tight leading-none',
            variant === 'highlight'
              ? 'text-[#FBF6EE]'
              : variant === 'dark'
              ? 'text-[#FBF6EE]'
              : 'text-[#1A1310]'
          )}
        >
          {formattedValue}
        </span>
        {trend && (
          <span
            className={cn(
              'text-[11px] font-semibold flex items-center gap-0.5',
              trend.direction === 'up'
                ? 'text-[#2E7D32]'
                : trend.direction === 'down'
                ? 'text-[#D32F2F]'
                : 'text-[#70625B]'
            )}
          >
            {trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '•'}
            {trend.text}
          </span>
        )}
      </div>

      {sublabel && (
        <span
          className={cn(
            'text-[11px] mt-1 truncate font-body',
            variant === 'highlight'
              ? 'text-[#FBF6EE]/75'
              : variant === 'dark'
              ? 'text-[#70625B]'
              : 'text-[#70625B]'
          )}
        >
          {sublabel}
        </span>
      )}
    </div>
  );
};
