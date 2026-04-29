import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = "relative overflow-hidden font-bold transition-all duration-300 rounded-xl flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brand-primary text-white shadow-[0_4px_15px_rgba(255,59,0,0.3)] hover:shadow-[0_8px_25px_rgba(255,59,0,0.5)] hover:brightness-110",
    secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/10",
    outline: "bg-transparent border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10",
    ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : children}
      
      {/* Subtle shine effect on hover for primary */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-[shimmer_2s_infinite] pointer-events-none" />
      )}
    </button>
  );
};
