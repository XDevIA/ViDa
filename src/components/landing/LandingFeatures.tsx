"use client";

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Brain, Target, Flame, Database } from 'lucide-react';

const features = [
  {
    title: "Mente e Foco",
    description: "Algoritmos que monitoram o seu estado cognitivo e sugerem ajustes para performance máxima.",
    icon: <Brain className="text-brand-primary" size={24} />,
    color: "lava"
  },
  {
    title: "Metas Preditivas",
    description: "Cálculo de TDEE e macros que se adaptam ao seu metabolismo em tempo real.",
    icon: <Target className="text-brand-secondary" size={24} />,
    color: "cyan"
  },
  {
    title: "Gasto Térmico",
    description: "Visualização precisa da queima calórica e fator metabólico personalizado.",
    icon: <Flame className="text-orange-500" size={24} />,
    color: "lava"
  },
  {
    title: "Base Obsidian",
    description: "Segurança de dados e armazenamento persistente em infraestrutura de elite.",
    icon: <Database className="text-gray-400" size={24} />,
    color: "neutral"
  }
];

export default function LandingFeatures() {
  return (
    <section className="py-32 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
            PODER <span className="text-gray-500">COMPUTACIONAL</span> <br/>
            PARA O SEU <span className="lava-text italic">CORPO</span>
          </h2>
          <div className="w-20 h-1 bg-brand-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <GlassCard 
              key={index}
              className="p-8 group hover:border-brand-primary/20 transition-all duration-500"
              intensity="medium"
            >
              <div className="mb-6 p-3 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-brand-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
