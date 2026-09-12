import React from 'react';
import { cn } from '../../lib/utils';

export interface ToggleProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  id,
  checked,
  onChange,
  disabled = false,
  label,
  description,
  size = 'md',
  className,
}) => {
  const switchId = id || React.useId();

  return (
    <label
      htmlFor={switchId}
      className={cn(
        'inline-flex items-center justify-between gap-3 cursor-pointer select-none group min-h-[44px]',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-sm font-medium text-[#1A1310] group-hover:text-[#F16321] transition-colors">
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-[#70625B] leading-tight mt-0.5">
              {description}
            </span>
          )}
        </div>
      )}

      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'relative inline-flex shrink-0 transition-colors duration-200 ease-in-out rounded-full border-2 border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F16321] focus-visible:ring-offset-2',
          size === 'sm' ? 'h-6 w-11' : 'h-7 w-13',
          checked ? 'bg-[#F16321]' : 'bg-[#EADBC8]'
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block rounded-full bg-[#FBF6EE] shadow-sm transform transition duration-200 ease-in-out',
            size === 'sm'
              ? checked
                ? 'translate-x-5 h-5 w-5'
                : 'translate-x-0 h-5 w-5'
              : checked
              ? 'translate-x-6 h-6 w-6'
              : 'translate-x-0 h-6 w-6'
          )}
        />
      </button>
    </label>
  );
};
