"use client";

import React, { useState } from 'react';
import { calculateTargetMacros } from '@/lib/rules/engine';
import { Flame, Droplet, Wheat, Dumbbell, ShieldCheck, RefreshCw, Activity, Cpu, TrendingUp } from 'lucide-react';
import { syncDigitalTwin } from '@/app/actions/twin';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { LayoutContainer } from '@/components/ui/LayoutContainer';

interface MacroDashboardProps {
  tdee: number;
  weight: number;
  goal: "CUTTING" | "BULKING" | "MAINTENANCE";
  metabolicFactor?: number;
}

export default function MacroDashboard({ tdee, weight, goal, metabolicFactor = 1.0 }: MacroDashboardProps) {
  const [currentFactor, setCurrentFactor] = useState(metabolicFactor);
  const [isSyncing, setIsSyncing] = useState(false);

  // Adjusted TDEE based on Digital Twin Factor
  const adjustedTdee = tdee * currentFactor;
  const macros = calculateTargetMacros(adjustedTdee, weight, goal);

  const handleSync = async () => {
    setIsSyncing(true);
    const result = await syncDigitalTwin();
    if (result.success && result.factor) {
      setCurrentFactor(result.factor);
    }
    setIsSyncing(false);
  };

  const macroCards = [
    { 
      label: 'Proteína', 
      value: Math.round(macros.protein), 
      unit: 'g', 
      icon: <Dumbbell className="text-brand-primary" size={20} />,
    },
    { 
      label: 'Gordura', 
      value: Math.round(macros.fat), 
      unit: 'g', 
      icon: <Droplet className="text-brand-secondary" size={20} />,
    },
    { 
      label: 'Carbo', 
      value: Math.round(macros.carbs), 
      unit: 'g', 
      icon: <Wheat className="text-white" size={20} />,
    },
  ];

  return (
    <LayoutContainer>
      <PageHeader 
        title={<>ViDa<span className="text-brand-primary">.</span>OS</>}
        subtitle="Calibração Metabólica em Tempo Real"
        category="Performance Dashboard"
        actions={
          <>
            <GlassCard className="px-6 py-4 flex items-center gap-4">
              <div className="p-3 bg-brand-primary/10 rounded-xl border border-brand-primary/20">
                <Activity className="text-brand-primary" size={24} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/30 font-bold">Fator Twin</p>
                <p className="text-2xl font-black text-white tracking-tight">x{currentFactor.toFixed(2)}</p>
              </div>
            </GlassCard>
            
            <GlassCard className="px-6 py-4 flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <Flame className="text-white" size={24} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/30 font-bold">Budget Calórico</p>
                <p className="text-2xl font-black text-white tracking-tight">
                  {Math.round(macros.calories)} <span className="text-xs font-normal text-white/20">KCAL</span>
                </p>
              </div>
            </GlassCard>
          </>
        }
      />

      {/* Macros Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {macroCards.map((card) => (
          <GlassCard key={card.label} hoverEffect className="p-8 group">
            <div className="flex justify-between items-start mb-8">
              <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-brand-primary/10 transition-colors">
                {card.icon}
              </div>
              <div className="text-right">
                <span className="block text-3xl font-black text-white tracking-tighter">{card.value}g</span>
                <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold">{card.label}</span>
              </div>
            </div>
            
            <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`absolute top-0 left-0 h-full lava-gradient rounded-full opacity-80 group-hover:opacity-100 transition-all duration-700`} 
                style={{ width: '65%' }} 
              />
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Digital Twin Intelligence Section */}
      <section className="relative overflow-hidden rounded-[32px] p-1 md:p-[2px] lava-gradient mb-10">
        <div className="bg-background rounded-[30px] p-8 md:p-12 h-full flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-primary/20 rounded-lg">
                <Cpu className="text-brand-primary" size={20} />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-white italic">Neural Twin Calibration</h3>
            </div>
            
            <p className="text-white/50 text-lg leading-relaxed font-medium">
              O motor de IA detectou uma variação metabólica de <span className="text-brand-primary font-black">+{((currentFactor - 1) * 100).toFixed(0)}%</span>. 
              Sua dieta foi ajustada dinamicamente para prevenir platôs e otimizar a síntese proteica.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                onClick={handleSync}
                isLoading={isSyncing}
                variant="primary"
                className="min-w-[200px]"
              >
                <RefreshCw size={18} className={`${isSyncing ? "animate-spin" : ""} transition-transform duration-500`} />
                <span>{isSyncing ? "CALIBRANDO..." : "SINCRONIZAR GÊMEO"}</span>
              </Button>
              
              <Button variant="secondary" className="px-8">
                ANÁLISE DE TRENDS
              </Button>
            </div>
          </div>

          <div className="w-full md:w-64 h-64 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border-4 border-brand-primary/20 animate-ping absolute" />
              <div className="w-32 h-32 rounded-full border-2 border-brand-primary/40 animate-pulse absolute" />
              <div className="w-32 h-32 rounded-full flex items-center justify-center border border-brand-primary/50 bg-surface/80 backdrop-blur-xl">
                <TrendingUp className="text-brand-primary" size={40} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Audit Info */}
      <footer className="flex items-center justify-center gap-6 py-6 opacity-20">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} />
          <span className="text-[10px] font-bold tracking-widest uppercase">Mifflin-St Jeor Verified</span>
        </div>
        <div className="h-1 w-1 rounded-full bg-white/50" />
        <span className="text-[10px] font-bold tracking-widest uppercase italic">Phase B3 Compliance</span>
      </footer>
    </LayoutContainer>
  );
}
