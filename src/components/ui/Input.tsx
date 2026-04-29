import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-white/50 ml-1">
          {label}
        </label>
      )}
      
      <div className="relative group">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-brand-primary transition-colors">
            {icon}
          </div>
        )}
        
        <input
          className={`
            w-full bg-surface-raised border border-white/5 rounded-xl px-4 py-3
            ${icon ? 'pl-11' : ''}
            text-white placeholder:text-white/20
            outline-none transition-all duration-300
            focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20
            hover:border-white/10
            ${error ? 'border-red-500/50 focus:border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      
      {error && (
        <span className="text-xs text-red-400 mt-0.5 ml-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
};
