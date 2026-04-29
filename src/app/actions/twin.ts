"use server";

import { prisma } from "@/lib/prisma";
import { calibrateMetabolicFactor } from "@/lib/twin/calibration";
import { revalidatePath } from "next/cache";

export async function syncDigitalTwin() {
  try {
    const defaultEmail = "daniel@vida.app";
    const user = await prisma.user.findUnique({
      where: { email: defaultEmail },
      include: { digitalTwin: true }
    });

    if (!user) throw new Error("User not found");

    const newFactor = await calibrateMetabolicFactor(user.id);

    const updatedTwin = await prisma.digitalTwinState.upsert({
      where: { userId: user.id },
      update: {
        metabolicFactor: newFactor,
        lastSync: new Date()
      },
      create: {
        userId: user.id,
        metabolicFactor: newFactor,
        lastSync: new Date()
      }
    });

    revalidatePath("/");
    return { success: true, factor: newFactor };
  } catch (error) {
    console.error("Error syncing digital twin:", error);
    return { success: false, error: "Falha ao sincronizar Gêmeo Digital." };
  }
}
