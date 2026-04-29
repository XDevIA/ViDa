"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function upsertProfile(data: {
  age: number;
  height: number;
  weight: number;
  gender: string;
  activityLevel: number;
  goal: string;
  conditions: string[];
}) {
  try {
    // Hardcoded default user for MVP
    const defaultEmail = "daniel@vida.app";
    
    const user = await prisma.user.upsert({
      where: { email: defaultEmail },
      update: {},
      create: {
        email: defaultEmail,
      },
    });

    const profile = await prisma.profile.upsert({
      where: { userId: user.id },
      update: {
        age: data.age,
        gender: data.gender,
        height: data.height,
        activityLevel: data.activityLevel,
        goal: data.goal,
        conditions: data.conditions || [],
        isSafetyPass: true,
      },
      create: {
        userId: user.id,
        age: data.age,
        gender: data.gender,
        height: data.height,
        activityLevel: data.activityLevel,
        goal: data.goal,
        conditions: data.conditions || [],
        isSafetyPass: true,
      },
    });

    // Also log the initial measurement
    await prisma.measurement.create({
      data: {
        userId: user.id,
        weight: data.weight,
      }
    });

    revalidatePath("/");
    return { success: true, profile };
  } catch (error) {
    console.error("Error upserting profile:", error);
    return { success: false, error: "Falha ao salvar perfil." };
  }
}

export async function getProfile() {
  try {
    const defaultEmail = "daniel@vida.app";
    const user = await prisma.user.findUnique({
      where: { email: defaultEmail },
      include: { 
        profile: true,
        digitalTwin: true,
        measurements: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });

    if (!user || !user.profile) return { success: false, error: "Perfil não encontrado" };

    return { 
      success: true, 
      profile: user.profile,
      digitalTwin: user.digitalTwin,
      lastWeight: user.measurements[0]?.weight
    };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { success: false, error: "Erro ao buscar perfil." };
  }
}

