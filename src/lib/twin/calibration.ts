import { prisma } from "@/lib/prisma";

/**
 * Calibrates the metabolic factor based on workout frequency and intensity.
 * Factor starts at 1.0.
 * +0.03 for each HIGH intensity workout in the last 7 days.
 * +0.01 for each MEDIUM intensity workout.
 * Max cap at 1.25 (25% increase).
 */
export async function calibrateMetabolicFactor(userId: string): Promise<number> {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentWorkouts = await prisma.workoutLog.findMany({
    where: {
      userId,
      createdAt: { gte: sevenDaysAgo }
    }
  });

  let adjustment = 0;
  recentWorkouts.forEach(workout => {
    if (workout.intensity === 'HIGH') adjustment += 0.03;
    else if (workout.intensity === 'MEDIUM') adjustment += 0.01;
  });

  // Base factor is 1.0
  const finalFactor = Math.min(1.0 + adjustment, 1.25);
  return finalFactor;
}
