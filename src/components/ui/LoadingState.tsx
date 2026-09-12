import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export interface LoadingStateProps {
  message?: string;
  subtext?: string;
  variant?: 'spinner' | 'skeleton' | 'full';
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading campus data...',
  subtext,
  variant = 'spinner',
  className,
}) => {
  if (variant === 'skeleton') {
    return (
      <div className={cn('w-full space-y-3 p-4 animate-pulse', className)}>
        <div className="h-6 bg-[#FBEEE1] rounded-lg w-1/3" />
        <div className="h-16 bg-[#FBEEE1] rounded-xl w-full" />
        <div className="h-16 bg-[#FBEEE1] rounded-xl w-full" />
        <div className="h-16 bg-[#FBEEE1] rounded-xl w-full" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center select-none min-h-[160px]',
        variant === 'full' && 'h-full flex-1',
        className
      )}
    >
      <div className="relative mb-3">
        <div className="w-10 h-10 rounded-full bg-[#FBEEE1] flex items-center justify-center border border-[#EADBC8]">
          <Loader2 className="w-5 h-5 text-[#F16321] animate-spin" />
        </div>
      </div>
      <p className="text-sm font-semibold font-display tracking-wide text-[#1A1310]">
        {message}
      </p>
      {subtext && (
        <p className="text-xs text-[#70625B] font-body mt-1 max-w-xs">
          {subtext}
        </p>
      )}
    </div>
  );
};
