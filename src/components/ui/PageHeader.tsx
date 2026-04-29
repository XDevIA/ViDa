import React from 'react';

interface PageHeaderProps {
  title: React.ReactNode;
  subtitle?: string;
  category?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  category,
  actions,
  className = ''
}) => {
  return (
    <header className={`flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-10 mb-10 ${className}`}>
      <div className="space-y-2">
        {category && (
          <div className="flex items-center gap-2">
            <div className="h-1 w-8 bg-brand-primary rounded-full" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black">{category}</span>
          </div>
        )}
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/40 font-medium">{subtitle}</p>
        )}
      </div>

      {actions && (
        <div className="flex flex-wrap gap-4">
          {actions}
        </div>
      )}
    </header>
  );
};
