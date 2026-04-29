"use client";

import React, { useState } from 'react';
import { Dumbbell, Plus, Trash2, Clock, Zap, Loader2, Target, TrendingUp } from 'lucide-react';
import { logWorkout } from '@/app/actions/workout';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { LayoutContainer } from '@/components/ui/LayoutContainer';
import { Input } from '@/components/ui/Input';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

export default function TrainingLog() {
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: '', sets: 3, reps: 10, weight: 0 }
  ]);
  const [duration, setDuration] = useState(60);
  const [intensity, setIntensity] = useState('MEDIUM');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const result = await logWorkout({
      exercises,
      duration,
      intensity
    });
    
    setIsSaving(false);
    if (result.success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } else {
      alert(result.error);
    }
  };

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: 3, reps: 10, weight: 0 }]);
  };

  const removeExercise = (index: number) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter((_, i) => i !== index));
    }
  };

  const updateExercise = (index: number, field: keyof Exercise, value: string | number) => {
    const newExercises = [...exercises];
    (newExercises[index] as any)[field] = value;
    setExercises(newExercises);
  };

  return (
    <LayoutContainer>
      <PageHeader 
        title={<>Treino<span className="text-brand-primary">.</span>Log</>}
        subtitle="Registro de Atividade de Alta Intensidade"
        category="Training Protocol"
        actions={
          <GlassCard className="px-6 py-4 flex items-center gap-4">
            <div className="p-3 bg-brand-primary/10 rounded-xl border border-brand-primary/20">
              <Clock className="text-brand-primary" size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/30 font-bold">Duração</p>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  value={duration} 
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-12 bg-transparent text-2xl font-black text-white focus:text-brand-primary outline-none tracking-tight"
                />
                <span className="text-xs font-normal text-white/20">MIN</span>
              </div>
            </div>
          </GlassCard>
        }
      />

      <div className="space-y-6">
        {exercises.map((ex, index) => (
          <GlassCard key={index} className="p-6 group hover:border-brand-primary/20 transition-all duration-300">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="flex-1 w-full">
                <Input 
                  label={`Exercício #${index + 1}`}
                  icon={<Dumbbell size={18} />}
                  placeholder="Ex: Supino Inclinado com Halteres"
                  value={ex.name}
                  onChange={(e) => updateExercise(index, 'name', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4 w-full lg:w-auto pt-4 lg:pt-6 border-t lg:border-t-0 border-white/5">
                <div className="space-y-1">
                  <p className="text-[10px] text-white/30 uppercase font-black tracking-widest text-center">Séries</p>
                  <input 
                    type="number" 
                    value={ex.sets}
                    onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value))}
                    className="w-full lg:w-20 bg-surface-raised rounded-xl py-3 text-center text-white border border-white/5 focus:border-brand-primary outline-none font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-white/30 uppercase font-black tracking-widest text-center">Reps</p>
                  <input 
                    type="number" 
                    value={ex.reps}
                    onChange={(e) => updateExercise(index, 'reps', parseInt(e.target.value))}
                    className="w-full lg:w-20 bg-surface-raised rounded-xl py-3 text-center text-white border border-white/5 focus:border-brand-primary outline-none font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-white/30 uppercase font-black tracking-widest text-center">Peso</p>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={ex.weight}
                      onChange={(e) => updateExercise(index, 'weight', parseFloat(e.target.value))}
                      className="w-full lg:w-24 bg-surface-raised rounded-xl py-3 text-center text-white border border-white/5 focus:border-brand-primary outline-none font-bold pr-6"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] font-black text-white/20">KG</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  onClick={() => removeExercise(index)}
                  className="p-3 text-white/20 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                  title="Remover"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </GlassCard>
        ))}

        <button 
          onClick={addExercise}
          className="w-full py-8 border-2 border-dashed border-white/5 rounded-[32px] text-white/20 hover:border-brand-primary/50 hover:text-brand-primary hover:bg-brand-primary/5 transition-all flex items-center justify-center gap-3 group"
        >
          <div className="p-2 rounded-full border border-current group-hover:rotate-90 transition-transform">
            <Plus size={20} />
          </div>
          <span className="font-black uppercase tracking-[0.2em] text-xs">Adicionar Exercício</span>
        </button>
      </div>

      <footer className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-3 w-full md:w-auto">
          <p className="text-[10px] text-white/30 uppercase font-black tracking-[0.2em]">Intensidade do Esforço</p>
          <div className="flex gap-2 p-1 bg-surface-raised rounded-2xl border border-white/5">
            {['LOW', 'MEDIUM', 'HIGH'].map(lv => (
              <button 
                key={lv}
                onClick={() => setIntensity(lv)}
                className={`flex-1 md:flex-none px-6 py-2 rounded-xl text-[10px] font-black transition-all tracking-widest ${
                  intensity === lv 
                    ? 'bg-brand-primary text-white shadow-lg' 
                    : 'text-white/30 hover:text-white hover:bg-white/5'
                }`}
              >
                {lv}
              </button>
            ))}
          </div>
        </div>

        <Button 
          onClick={handleSave}
          disabled={isSaving || saveSuccess}
          variant="primary"
          className="w-full md:w-auto min-w-[280px] py-6 rounded-[24px] lava-glow-strong italic tracking-tighter"
        >
          {isSaving ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              CALIBRANDO...
            </>
          ) : saveSuccess ? (
            "✓ PROTOCOLO SINCRONIZADO"
          ) : (
            <>
              <Zap size={20} fill="currentColor" />
              FINALIZAR PROTOCOLO
            </>
          )}
        </Button>
      </footer>

      {/* Background Decor */}
      <div className="fixed top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-brand-primary/5 blur-[100px] -z-10 rounded-full" />
    </LayoutContainer>
  );
}
