"use client";

import React, { useState } from 'react';
import { calculateTDEE, validateAIRecommendation } from '@/lib/rules/engine';
import { ShieldCheck, User, Scale, Ruler, Heart, CheckCircle2, AlertCircle, ChevronRight, ArrowLeft, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/Input';

interface BioData {
  age: number;
  height: number;
  weight: number;
  gender: 'MALE' | 'FEMALE';
  activityLevel: number;
  goal: 'CUTTING' | 'BULKING' | 'MAINTENANCE';
}

interface SafetyScreeningProps {
  onComplete: (data: { 
    tdee: number; 
    weight: number; 
    goal: "CUTTING" | "BULKING" | "MAINTENANCE";
    age: number;
    height: number;
    gender: 'MALE' | 'FEMALE';
    activityLevel: number;
    conditions: string[];
  }) => void;
}

export default function SafetyScreening({ onComplete }: SafetyScreeningProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BioData>({
    age: 25,
    height: 170,
    weight: 70,
    gender: 'MALE',
    activityLevel: 1.2,
    goal: 'MAINTENANCE',
  });
  
  const [healthConditions, setHealthConditions] = useState<string[]>([]);
  const [results, setResults] = useState<any>(null);

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2) calculateResults();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const calculateResults = () => {
    const profile = {
      gender: data.gender as any,
      weight: data.weight,
      height: data.height,
      age: data.age,
      activityLevel: data.activityLevel,
    };

    const tdee = calculateTDEE(profile);
    const validation = validateAIRecommendation(tdee - 500, profile);
    
    setResults({
      tdee,
      isSafetyPass: validation.isValid,
      expected: validation.expected,
      deviation: validation.deviation,
      reason: validation.isValid ? "Parâmetros validados pelo protocolo ViDa." : "Déficit agressivo detectado."
    });
    setStep(3);
  };

  const progress = (step / 3) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 animate-in fade-in duration-1000">
      {/* Progress Bar */}
      <div className="w-full max-w-xl mb-12 space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-white font-black tracking-tighter text-2xl">Onboarding <span className="text-brand-primary">Protocol</span></h3>
            <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold">Configurando sua Identidade Digital</p>
          </div>
          <span className="text-brand-primary font-black text-sm italic">{step}/3</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full lava-gradient transition-all duration-700 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>

      <GlassCard className="w-full max-w-xl p-8 md:p-12 rounded-[40px] relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl" />
        
        {step < 3 && step > 1 && (
          <button onClick={handleBack} className="absolute top-8 left-8 text-white/20 hover:text-white transition-colors z-20">
            <ArrowLeft size={20} />
          </button>
        )}

        {step === 1 && (
          <div className="space-y-10 animate-in slide-in-from-right-8 duration-500">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white tracking-tight">Biometria Digital</h2>
              <p className="text-white/40 text-sm">Insira seus dados para calibrar o motor metabólico.</p>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <Input 
                  label="Idade"
                  type="number"
                  value={data.age}
                  onChange={(e) => setData({...data, age: parseInt(e.target.value)})}
                  icon={<User size={18} />}
                  className="text-xl font-bold"
                />
                <Input 
                  label="Peso (kg)"
                  type="number"
                  value={data.weight}
                  onChange={(e) => setData({...data, weight: parseInt(e.target.value)})}
                  icon={<Scale size={18} />}
                  className="text-xl font-bold"
                />
              </div>

              <Input 
                label="Altura (cm)"
                type="number"
                value={data.height}
                onChange={(e) => setData({...data, height: parseInt(e.target.value)})}
                icon={<Ruler size={18} />}
                className="text-xl font-bold"
              />

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/30 font-black">Gênero</label>
                <div className="flex gap-4">
                  {(['MALE', 'FEMALE'] as const).map(g => (
                    <Button 
                      key={g}
                      variant={data.gender === g ? 'primary' : 'secondary'}
                      onClick={() => setData({...data, gender: g})}
                      className="flex-1 py-6"
                    >
                      {g === 'MALE' ? 'MASCULINO' : 'FEMININO'}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-10 animate-in slide-in-from-right-8 duration-500">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white tracking-tight">Security Audit</h2>
              <p className="text-white/40 text-sm">Selecione condições que possam impactar o algoritmo.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {['Diabetes', 'Hipertensão', 'Alergia Glúten', 'Vegano'].map(condition => (
                <label 
                  key={condition} 
                  className={`flex items-center justify-between p-6 rounded-2xl border cursor-pointer transition-all ${
                    healthConditions.includes(condition)
                    ? 'bg-brand-primary/10 border-brand-primary/40 text-white'
                    : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Heart size={20} className={healthConditions.includes(condition) ? 'text-brand-primary' : 'text-white/20'} />
                    <span className="font-bold tracking-tight">{condition.toUpperCase()}</span>
                  </div>
                  <input 
                    type="checkbox" 
                    hidden
                    onChange={(e) => {
                      if (e.target.checked) setHealthConditions([...healthConditions, condition]);
                      else setHealthConditions(healthConditions.filter(c => c !== condition));
                    }}
                  />
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    healthConditions.includes(condition) ? 'bg-brand-primary border-brand-primary' : 'border-white/10'
                  }`}>
                    {healthConditions.includes(condition) && <CheckCircle2 size={14} className="text-white" />}
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 3 && results && (
          <div className="space-y-10 text-center animate-in zoom-in duration-700">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white tracking-tight italic">Protocolo Finalizado</h2>
              <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Sua Assinatura Metabólica foi Gerada</p>
            </div>

            <div className="relative inline-block">
              <div className="absolute inset-0 bg-brand-primary/20 rounded-full blur-3xl animate-pulse" />
              <div className="relative p-12 rounded-full border border-brand-primary/30 bg-surface/80 backdrop-blur-3xl inline-flex flex-col items-center">
                <span className="text-6xl font-black text-white tracking-tighter">{Math.round(results.tdee)}</span>
                <span className="text-brand-primary text-[10px] font-black uppercase tracking-[0.4em]">Base TDEE</span>
              </div>
            </div>
            
            <div className={`p-6 rounded-3xl border flex items-center gap-4 ${
              results.isSafetyPass 
              ? 'bg-green-500/5 border-green-500/20 text-green-400' 
              : 'bg-yellow-500/5 border-yellow-500/20 text-yellow-500'
            }`}>
              {results.isSafetyPass ? <CheckCircle2 /> : <AlertCircle />}
              <div className="text-left">
                <p className="font-black text-sm uppercase tracking-tight">{results.isSafetyPass ? 'SAFE MODE ACTIVE' : 'RISK DETECTED'}</p>
                <p className="text-xs opacity-60 font-medium">{results.reason}</p>
              </div>
            </div>
            
            <Button 
              onClick={() => onComplete({
                tdee: results.tdee,
                weight: data.weight,
                goal: data.goal,
                age: data.age,
                height: data.height,
                gender: data.gender,
                activityLevel: data.activityLevel,
                conditions: healthConditions
              })}
              variant="primary"
              className="w-full py-5 text-lg group"
            >
              <div className="flex items-center justify-center gap-3">
                <span>INICIALIZAR GÊMEO DIGITAL</span>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Button>
          </div>
        )}

        {step < 3 && (
          <Button 
            onClick={handleNext}
            variant="primary"
            className="w-full mt-10 py-5 group"
          >
            <div className="flex items-center justify-center gap-3">
              <span>{step === 1 ? 'CONTINUAR' : 'ANALISAR PERFIL'}</span>
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Button>
        )}
      </GlassCard>
      
      <p className="mt-12 text-white/10 text-[10px] font-black uppercase tracking-[0.5em]">ViDa OS System 1.0 // Elite Security Layer</p>
    </div>
  );
}
