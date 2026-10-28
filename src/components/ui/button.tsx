import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-150 ease-out cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed active:scale-[0.98] whitespace-nowrap shrink-0 min-h-[44px] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2';

    const variants = {
      primary: 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm border border-neutral-900',
      secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border border-neutral-200/80',
      outline: 'bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-50 shadow-xs',
      ghost: 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 border border-transparent',
      accent: 'bg-[#B91C1C] text-white hover:bg-[#991B1B] shadow-sm border border-[#B91C1C]'
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 min-h-[44px]',
      md: 'text-sm px-4 py-2 min-h-[44px]',
      lg: 'text-base px-6 py-2.5 min-h-[48px]'
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
