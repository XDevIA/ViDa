"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ChevronRight, ShieldCheck, Zap, Activity } from 'lucide-react';

interface LandingHeroProps {
  onStart: () => void;
}

export default function LandingHero({ onStart }: LandingHeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Background Cinematic Asset */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/assets/hero-twin.png"
          alt="ViDa Digital Twin Hero"
          fill
          className="object-cover opacity-60 mask-fade-bottom scale-105 animate-float"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-8 animate-reveal" style={{ animationDelay: '200ms' }}>
          <Activity size={12} />
          Protocolo V.0.1.0-ALPHA
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6 animate-reveal" style={{ animationDelay: '400ms' }}>
          O SEU <span className="lava-text italic">GÊMEO</span> <br/> 
          DIGITAL DE <span className="text-white/90">ELITE</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 font-medium max-w-2xl mx-auto mb-10 animate-reveal" style={{ animationDelay: '600ms' }}>
          Bio-algoritmos de precisão para Viviane e Daniel. <br/>
          Sincronização total entre nutrição, performance e fisiologia.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center animate-reveal" style={{ animationDelay: '800ms' }}>
          <Button 
            onClick={onStart}
            variant="primary"
            className="group w-full sm:w-auto text-sm py-4 px-10 rounded-full lava-glow-strong"
          >
            INICIAR PROTOCOLO
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Button>
          
          <div className="flex items-center gap-6 text-gray-500 text-[10px] font-bold uppercase tracking-widest ml-4">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-brand-primary" /> 
              Sincronizado
            </span>
            <span className="flex items-center gap-1.5">
              <Zap size={14} className="text-brand-secondary" /> 
              Real-time
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <div className="w-px h-12 bg-gradient-to-b from-brand-primary/50 to-transparent" />
        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-500">Discover</span>
      </div>
    </section>
  );
}
