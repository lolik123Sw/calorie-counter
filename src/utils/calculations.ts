import { Gender, ActivityLevel } from '../types';

const activityCoefficients: Record<ActivityLevel, number> = {
  minimal: 1.2,
  low: 1.375,
  medium: 1.55,
  high: 1.7,
  veryHigh: 1.9
};

export const calculateBaseCalories = (
  gender: Gender,
  weight: number,
  height: number,
  age: number
): number => {
  if (gender === 'male') {
    return 66.5 + (13.75 * weight) + (5.003 * height) - (6.775 * age);
  } else {
    return 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
  }
};

export const calculateMaintenanceCalories = (
  baseCalories: number,
  activity: ActivityLevel
): number => {
  return baseCalories * activityCoefficients[activity];
};