import React from 'react';

interface LayoutContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'full' | 'narrow';
}

export const LayoutContainer: React.FC<LayoutContainerProps> = ({
  children,
  className = '',
  variant = 'full'
}) => {
  const variants = {
    full: "max-w-7xl",
    narrow: "max-w-4xl",
  };

  return (
    <main className={`
      w-full mx-auto px-4 md:px-8 py-12 md:py-20
      animate-in fade-in slide-in-from-bottom-4 duration-700
      ${variants[variant]}
      ${className}
    `}>
      {children}
    </main>
  );
};
