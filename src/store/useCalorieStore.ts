import { create } from 'zustand'
import { FormData, Errors, CalculationResult } from '../types'

interface CalorieState {
  formData: FormData
  errors: Errors
  result: CalculationResult
  showResult: boolean
  
  setGender: (gender: 'male' | 'female') => void
  setAge: (value: string) => void
  setHeight: (value: string) => void
  setWeight: (value: string) => void
  setActivity: (activity: 'minimal' | 'low' | 'medium' | 'high' | 'veryHigh') => void
  validateForm: () => boolean
  calculate: () => void
  clearForm: () => void
}

const initialFormData: FormData = {
  gender: 'male',
  age: '',
  height: '',
  weight: '',
  activity: 'minimal'
}

const initialErrors: Errors = {
  age: '',
  height: '',
  weight: ''
}

const initialResult: CalculationResult = {
  dailyNorm: 0,
  maintenance: 0
}

export const useCalorieStore = create<CalorieState>((set, get) => ({
  formData: initialFormData,
  errors: initialErrors,
  result: initialResult,
  showResult: false,

  setGender: (gender) => {
    set((state) => ({
      ...state,
      formData: { ...state.formData, gender },
      showResult: false
    }))
  },

  setAge: (value) => {
    const numValue = value === '' ? '' : String(Math.max(0, parseInt(value) || 0))
    set((state) => ({
      ...state,
      formData: { ...state.formData, age: numValue },
      errors: { 
        ...state.errors, 
        age: numValue === '' || parseInt(numValue) <= 0 ? 'Введите корректный возраст' : '' 
      },
      showResult: false
    }))
  },

  setHeight: (value) => {
    const numValue = value === '' ? '' : String(Math.max(0, parseInt(value) || 0))
    set((state) => ({
      ...state,
      formData: { ...state.formData, height: numValue },
      errors: { 
        ...state.errors, 
        height: numValue === '' || parseInt(numValue) <= 0 ? 'Введите корректный рост' : '' 
      },
      showResult: false
    }))
  },

  setWeight: (value) => {
    const numValue = value === '' ? '' : String(Math.max(0, parseInt(value) || 0))
    set((state) => ({
      ...state,
      formData: { ...state.formData, weight: numValue },
      errors: { 
        ...state.errors, 
        weight: numValue === '' || parseInt(numValue) <= 0 ? 'Введите корректный вес' : '' 
      },
      showResult: false
    }))
  },

  setActivity: (activity) => {
    set((state) => ({
      ...state,
      formData: { ...state.formData, activity },
      showResult: false
    }))
  },

  validateForm: () => {
    const state = get()
    const newErrors: Errors = {
      age: !state.formData.age ? 'Введите возраст' : '',
      height: !state.formData.height ? 'Введите рост' : '',
      weight: !state.formData.weight ? 'Введите вес' : ''
    }
    
    set({ errors: newErrors })
    
    return !newErrors.age && !newErrors.height && !newErrors.weight
  },

  calculate: () => {
    const state = get()
    const { formData } = state
    
    if (!formData.age || !formData.height || !formData.weight) {
      console.error('Не все поля заполнены!')
      return
    }
    
    try {
      const age = parseInt(formData.age)
      const height = parseInt(formData.height)
      const weight = parseInt(formData.weight)
      
      // Формула Миффлина-Сан Жеора
      let bmr = 10 * weight + 6.25 * height - 5 * age
      
      if (formData.gender === 'male') {
        bmr += 5
      } else {
        bmr -= 161
      }

      // Коэффициенты активности
      const activityMultipliers = {
        minimal: 1.2,
        low: 1.375,
        medium: 1.55,
        high: 1.725,
        veryHigh: 1.9
      }

      const dailyNorm = Math.round(bmr * activityMultipliers[formData.activity])
      const maintenance = Math.round(dailyNorm * 1.2)

      const result: CalculationResult = { dailyNorm, maintenance }
      
      set({ 
        result, 
        showResult: true,
        errors: { age: '', height: '', weight: '' }
      })
    } catch (error) {
      console.error('Ошибка расчета:', error)
    }
  },

  clearForm: () => {
    set({
      formData: { ...initialFormData },
      errors: { ...initialErrors },
      result: { ...initialResult },
      showResult: false
    })
  }
}))