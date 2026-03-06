import { create } from 'zustand';
import { FormData, FormErrors, CalculationResult, ActivityLevel, Gender } from '../types';
import { calculateBaseCalories, calculateMaintenanceCalories } from '../utils/calculations';

interface CalorieState {
  formData: FormData;
  errors: FormErrors;
  result: CalculationResult | null;
  showResult: boolean;
  
  setGender: (gender: Gender) => void;
  setAge: (age: string) => void;
  setHeight: (height: string) => void;
  setWeight: (weight: string) => void;
  setActivity: (activity: ActivityLevel) => void;
  validateField: (name: keyof FormData, value: string) => string | undefined;
  validateForm: () => boolean;
  calculate: () => void;
  clearForm: () => void;
}

const initialState: FormData = {
  gender: 'male',
  age: '',
  height: '',
  weight: '',
  activity: 'minimal'
};

export const useCalorieStore = create<CalorieState>((set, get) => ({
  formData: initialState,
  errors: {},
  result: null,
  showResult: false,

  setGender: (gender) => {
    set((state) => ({
      formData: { ...state.formData, gender }
    }));
  },

  setAge: (age) => {
    let value = age;
    let numValue = parseInt(age) || 0;
    
    if (numValue < 0) {
      value = '0';
    } else if (numValue > 150) {
      value = '150';
    }
    
    set((state) => ({
      formData: { ...state.formData, age: value }
    }));
    get().validateField('age', value);
  },

  setHeight: (height) => {
    let value = height;
    let numValue = parseInt(height) || 0;
    
    if (numValue < 0) {
      value = '0';
    }
    
    set((state) => ({
      formData: { ...state.formData, height: value }
    }));
    get().validateField('height', value);
  },

  setWeight: (weight) => {
    let value = weight;
    let numValue = parseInt(weight) || 0;
    
    if (numValue < 0) {
      value = '0';
    }
    
    set((state) => ({
      formData: { ...state.formData, weight: value }
    }));
    get().validateField('weight', value);
  },

  setActivity: (activity: ActivityLevel) => {
    set((state) => ({
      formData: { ...state.formData, activity }
    }));
  },

  validateField: (name, value) => {
    const numValue = parseInt(value) || 0;
    let error: string | undefined;

    switch (name) {
      case 'age':
        if (!value) {
          error = 'Поле не должно быть пустым';
        } else if (numValue <= 0) {
          error = 'Возраст должен быть больше 0';
        } else if (numValue > 150) {
          error = 'Возраст не может быть больше 150';
        }
        break;
      case 'height':
        if (!value) {
          error = 'Поле не должно быть пустым';
        } else if (numValue < 0) {
          error = 'Значение не должно быть отрицательным';
        }
        break;
      case 'weight':
        if (!value) {
          error = 'Поле не должно быть пустым';
        } else if (numValue < 0) {
          error = 'Значение не должно быть отрицательным';
        }
        break;
    }

    set((state) => ({
      errors: { ...state.errors, [name]: error }
    }));

    return error;
  },

  validateForm: () => {
    const { formData, validateField } = get();
    validateField('age', formData.age);
    validateField('height', formData.height);
    validateField('weight', formData.weight);

    const { errors } = get();
    return !errors.age && !errors.height && !errors.weight;
  },

  calculate: () => {
    const { formData } = get();
    const weight = parseInt(formData.weight) || 0;
    const height = parseInt(formData.height) || 0;
    const age = parseInt(formData.age) || 0;

    const baseCalories = calculateBaseCalories(
      formData.gender,
      weight,
      height,
      age
    );

    const maintenanceCalories = calculateMaintenanceCalories(
      baseCalories,
      formData.activity
    );

    set({
      result: {
        baseCalories: Math.round(baseCalories),
        maintenanceCalories: Math.round(maintenanceCalories)
      },
      showResult: true
    });
  },

  clearForm: () => {
    set({
      formData: initialState,
      errors: {},
      result: null,
      showResult: false
    });
  }
}));