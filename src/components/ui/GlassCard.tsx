import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  intensity?: 'low' | 'medium' | 'high';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  intensity = 'medium'
}) => {
  const intensities = {
    low: "bg-surface/40",
    medium: "bg-surface/70",
    high: "bg-surface/90",
  };

  return (
    <div className={`
      relative overflow-hidden rounded-2xl border border-white/5 backdrop-blur-2xl
      ${intensities[intensity]}
      ${hoverEffect ? 'transition-all duration-300 hover:border-brand-primary/30 hover:bg-surface/80 hover:-translate-y-1 shadow-2xl' : ''}
      ${className}
    `}>
      {/* Decorative inner glow */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/5 to-transparent" />
      
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Subtle bottom light leak */}
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-brand-primary/10 blur-[60px] rounded-full pointer-events-none" />
    </div>
  );
};
