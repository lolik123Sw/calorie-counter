export type Gender = 'male' | 'female';
export type ActivityLevel = 'minimal' | 'low' | 'medium' | 'high' | 'veryHigh';

export interface FormData {
  gender: Gender;
  age: string;
  height: string;
  weight: string;
  activity: ActivityLevel;
}

export interface FormErrors {
  age?: string;
  height?: string;
  weight?: string;
}

export interface CalculationResult {
  baseCalories: number;
  maintenanceCalories: number;
}