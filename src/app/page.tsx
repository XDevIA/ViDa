"use client";

import React, { useState } from 'react';
import SafetyScreening from "@/components/onboarding/SafetyScreening";
import MacroDashboard from "@/components/dashboard/MacroDashboard";
import TrainingLog from "@/components/training/TrainingLog";
import { User, Dumbbell, LayoutDashboard } from 'lucide-react';
import { upsertProfile, getProfile } from '@/app/actions/profile';
import { calculateTDEE, Gender } from '@/lib/rules/engine';
import { useEffect } from 'react';
import LandingHero from '@/components/landing/LandingHero';
import LandingFeatures from '@/components/landing/LandingFeatures';

interface DashboardData {
  tdee: number;
  weight: number;
  goal: "CUTTING" | "BULKING" | "MAINTENANCE";
  metabolicFactor?: number;
}

export default function Home() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'training'>('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const result = await getProfile();
      if (result.success && result.profile) {
        const p = result.profile;
        const tdee = calculateTDEE({
          age: p.age,
          height: p.height,
          weight: result.lastWeight || 0,
          gender: p.gender as Gender,
          activityLevel: p.activityLevel,
          metabolicFactor: result.digitalTwin?.metabolicFactor || 1.0
        });

        setDashboardData({
          tdee: tdee,
          weight: result.lastWeight || 0,
          goal: p.goal as any,
          metabolicFactor: result.digitalTwin?.metabolicFactor || 1.0
        });
        setShowLanding(false);
      }
      setIsLoading(false);
    }
    loadProfile();
  }, []);

  const handleOnboardingComplete = async (data: any) => {
    // Persist to DB
    const result = await upsertProfile({
      age: data.age,
      height: data.height,
      weight: data.weight,
      gender: data.gender,
      activityLevel: data.activityLevel,
      goal: data.goal,
      conditions: data.conditions
    });

    if (result.success) {
      setDashboardData({
        ...data,
        metabolicFactor: 1.0 // Initial factor
      });
    } else {
      alert("Erro ao salvar perfil: " + result.error);
    }
  };

  if (isLoading) {
    return (
      <main className="flex flex-col min-h-screen bg-background items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Sincronizando ViDa OS...</p>
        </div>
      </main>
    );
  }

  if (showLanding && !dashboardData) {
    return (
      <main className="flex flex-col min-h-screen bg-background">
        <LandingHero onStart={() => setShowLanding(false)} />
        <LandingFeatures />
        <footer className="p-8 text-center text-gray-600 text-[10px] tracking-[0.3em] uppercase">
          © 2026 ViDa Systems | Protocolo Elite | v0.1.0-alpha
        </footer>
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-background">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-brand-secondary/5 blur-[100px] rounded-full" />
      </div>

      {/* Navigation (Only after onboarding) */}
      {dashboardData && (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-card px-6 py-2 border-brand-primary/20 flex gap-8 items-center">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'dashboard' ? 'text-brand-primary' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <LayoutDashboard size={14} />
            Dashboard
          </button>
          <div className="w-px h-4 bg-gray-800" />
          <button 
            onClick={() => setActiveTab('training')}
            className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'training' ? 'text-brand-primary' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Dumbbell size={14} />
            Treino
          </button>
        </nav>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center pt-12 px-4 pb-20">
        {!dashboardData ? (
          <div className="mt-20 w-full max-w-4xl">
            <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <h1 className="text-7xl font-black lava-text tracking-tighter mb-4 italic">
                ViDa
              </h1>
              <p className="text-xl text-gray-400 font-medium max-w-md mx-auto">
                Iniciando Protocolo de Segurança <br/>
                <span className="text-brand-primary text-sm font-bold uppercase tracking-widest mt-2 block">Identidade Digital Requerida</span>
              </p>
            </div>
            <SafetyScreening onComplete={handleOnboardingComplete} />
          </div>
        ) : (
          <div className="w-full mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'dashboard' ? (
              <MacroDashboard 
                tdee={dashboardData.tdee} 
                weight={dashboardData.weight} 
                goal={dashboardData.goal} 
              />
            ) : (
              <TrainingLog />
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="p-8 text-center text-gray-600 text-[10px] tracking-[0.3em] uppercase">
        © 2026 ViDa Systems | Built for Viviane & Daniel | v0.1.0-alpha
      </footer>
    </main>
  );
}
