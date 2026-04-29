/**
 * ViDa Rules Engine
 * Deterministic mathematical core for metabolic calculations.
 * Based on Mifflin-St Jeor Equation.
 */

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

/**
 * Activity Factors based on PAL (Physical Activity Level)
 */
export const ActivityFactors = {
  SEDENTARY: 1.2,    // Little or no exercise
  LIGHT: 1.375,      // Light exercise/sports 1-3 days/week
  MODERATE: 1.55,    // Moderate exercise/sports 3-5 days/week
  ACTIVE: 1.725,     // Hard exercise/sports 6-7 days a week
  VERY_ACTIVE: 1.9,  // Very hard exercise/physical job & training 2x/day
} as const;

export type ActivityLevelKey = keyof typeof ActivityFactors;

export interface ProfileData {
  gender: Gender;
  weight: number; // in kg
  height: number; // in cm
  age: number;
  activityLevel: number; // Multiplier
  metabolicFactor?: number; // Optional calibration from Digital Twin
}

/**
 * Calculates Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation.
 */
export function calculateBMR(data: ProfileData): number {
  const { gender, weight, height, age } = data;
  
  // Deterministic formula
  if (gender === Gender.MALE) {
    return (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    return (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }
}

/**
 * Calculates Total Daily Energy Expenditure (TDEE).
 * Includes the metabolicFactor for personalized calibration.
 */
export function calculateTDEE(data: ProfileData): number {
  const bmr = calculateBMR(data);
  const factor = data.metabolicFactor || 1.0;
  
  return bmr * data.activityLevel * factor;
}

/**
 * Safety Guardrail: Validates AI recommendations against deterministic calculations.
 * Default threshold is 10% (0.10).
 */
export function validateAIRecommendation(
  suggestedCalories: number,
  profile: ProfileData,
  threshold: number = 0.10
): { isValid: boolean; expected: number; deviation: number } {
  const expected = calculateTDEE(profile);
  const deviation = Math.abs(suggestedCalories - expected) / expected;
  
  return {
    isValid: deviation <= threshold,
    expected,
    deviation,
  };
}

/**
 * Default Macro Distribution Logic (Cutting/Bulking/Maintenance)
 * Based on high-performance sports nutrition standards.
 */
export function calculateTargetMacros(
  tdee: number, 
  weight: number, 
  goal: "CUTTING" | "BULKING" | "MAINTENANCE"
) {
  let targetCalories = tdee;
  
  // Adjust based on goal
  if (goal === "CUTTING") targetCalories -= 500;
  if (goal === "BULKING") targetCalories += 300;
  
  // Protein: 2g/kg (High priority for wellness/fitness)
  const proteinGrams = weight * 2;
  const proteinCalories = proteinGrams * 4;
  
  // Fat: 0.8g/kg
  const fatGrams = weight * 0.8;
  const fatCalories = fatGrams * 9;
  
  // Carbs: Remainder
  const carbCalories = targetCalories - proteinCalories - fatCalories;
  const carbGrams = carbCalories / 4;
  
  return {
    calories: targetCalories,
    protein: proteinGrams,
    fat: fatGrams,
    carbs: carbGrams,
  };
}
