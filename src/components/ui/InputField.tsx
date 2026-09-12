import React from 'react';
import { cn } from '../../lib/utils';

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  wrapperClassName?: string;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      className,
      wrapperClassName,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={cn('flex flex-col gap-1.5 w-full font-body', wrapperClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold uppercase tracking-wider text-[#70625B] select-none"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3.5 text-[#70625B] pointer-events-none flex items-center">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              'w-full h-11 min-h-[44px] px-3.5 bg-[#FAF4EB] text-[#1A1310] border border-[#EADBC8] rounded-xl text-sm font-body',
              'placeholder:text-[#9B8C84] transition-all',
              'focus:outline-none focus:border-[#F16321] focus:ring-2 focus:ring-[#F16321]/20 focus:bg-[#FFFFFF]',
              'disabled:opacity-50 disabled:bg-[#FBEEE1] disabled:cursor-not-allowed',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-[#D32F2F] focus:border-[#D32F2F] focus:ring-[#D32F2F]/20',
              className
            )}
            {...props}
          />

          {rightIcon && (
            <span className="absolute right-3.5 text-[#70625B] flex items-center">
              {rightIcon}
            </span>
          )}
        </div>

        {error ? (
          <span className="text-xs text-[#D32F2F] font-medium leading-tight">
            {error}
          </span>
        ) : helperText ? (
          <span className="text-xs text-[#70625B] leading-tight">
            {helperText}
          </span>
        ) : null}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
