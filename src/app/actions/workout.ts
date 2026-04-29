"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function logWorkout(data: {
  exercises: any[];
  duration: number;
  intensity: string;
}) {
  try {
    const defaultEmail = "daniel@vida.app";
    const user = await prisma.user.findUnique({
      where: { email: defaultEmail },
    });

    if (!user) {
      throw new Error("User not found. Please complete profile first.");
    }

    const workout = await prisma.workoutLog.create({
      data: {
        userId: user.id,
        exercises: data.exercises,
        duration: data.duration,
        intensity: data.intensity,
      },
    });

    revalidatePath("/");
    return { success: true, workout };
  } catch (error) {
    console.error("Error logging workout:", error);
    return { success: false, error: "Falha ao registrar treino." };
  }
}
