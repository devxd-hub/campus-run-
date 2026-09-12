import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center rounded-2xl bg-[#FBEEE1]/60 border border-[#EADBC8] select-none my-4',
        className
      )}
    >
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-[#FBEEE1] flex items-center justify-center text-[#F16321] border border-[#EADBC8] mb-3 shrink-0">
          {icon}
        </div>
      )}

      <h4 className="text-base font-bold font-display tracking-tight text-[#1A1310]">
        {title}
      </h4>

      {description && (
        <p className="text-xs text-[#70625B] font-body mt-1 max-w-xs leading-relaxed">
          {description}
        </p>
      )}

      {actionLabel && onAction && (
        <div className="mt-4">
          <Button variant="secondary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
