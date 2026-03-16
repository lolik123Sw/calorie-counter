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
    const numericValue = value.replace(/[^\d]/g, '')
    
    set((state) => ({
      ...state,
      formData: { ...state.formData, age: numericValue },
      showResult: false
    }))
  },

  setHeight: (value) => {
    const numericValue = value.replace(/[^\d]/g, '')
    
    set((state) => ({
      ...state,
      formData: { ...state.formData, height: numericValue },
      showResult: false
    }))
  },

  setWeight: (value) => {
    const numericValue = value.replace(/[^\d]/g, '')
    
    set((state) => ({
      ...state,
      formData: { ...state.formData, weight: numericValue },
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
    const { formData } = state
    
    const newErrors: Errors = {
      age: !formData.age ? 'Введите возраст' : 
           parseInt(formData.age) <= 0 ? 'Возраст должен быть больше 0' :
           parseInt(formData.age) > 150 ? 'Возраст не может быть больше 150 лет' : '',
      
      height: !formData.height ? 'Введите рост' : 
              parseInt(formData.height) <= 0 ? 'Рост должен быть больше 0' :
              parseInt(formData.height) > 300 ? 'Рост не может быть больше 300 см' : '',
      
      weight: !formData.weight ? 'Введите вес' : 
              parseInt(formData.weight) <= 0 ? 'Вес должен быть больше 0' :
              parseInt(formData.weight) > 500 ? 'Вес не может быть больше 500 кг' : ''
    }
    
    set({ errors: newErrors })
    
    return !newErrors.age && !newErrors.height && !newErrors.weight
  },

  calculate: () => {
    const state = get()
    const { formData } = state
    
    if (!state.validateForm()) {
      console.error('Форма содержит ошибки')
      return
    }
    
    try {
      const age = parseInt(formData.age)
      const height = parseInt(formData.height)
      const weight = parseInt(formData.weight)
      let bmr = 10 * weight + 6.25 * height - 5 * age
      
      if (formData.gender === 'male') {
        bmr += 5
      } else {
        bmr -= 161
      }

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
        showResult: true
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