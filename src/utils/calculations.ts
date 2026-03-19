import { create } from 'zustand'

export interface FormData {
  gender: 'male' | 'female'
  age: string
  height: string
  weight: string
  activity: 'minimal' | 'low' | 'medium' | 'high' | 'veryHigh'
}

export interface Errors {
  age: string
  height: string
  weight: string
}

export interface Result {
  dailyNorm: number
  maintenance: number
}

interface CalorieState {
  formData: FormData
  errors: Errors
  result: Result
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

const initialResult: Result = {
  dailyNorm: 0,
  maintenance: 0
}

export const useCalorieStore = create<CalorieState>((set, get) => ({
  formData: initialFormData,
  errors: initialErrors,
  result: initialResult,
  showResult: false,

  setGender: (gender) => {
    console.log('[STORE] setGender:', gender)
    set((state) => {
      const newState = {
        ...state,
        formData: { ...state.formData, gender },
        showResult: false
      }
      console.log('[STORE] new state:', newState)
      return newState
    })
  },

  setAge: (value) => {
    console.log('[STORE] setAge:', value)
    const numValue = value === '' ? '' : String(Math.max(0, parseInt(value) || 0))
    set((state) => {
      const newState = {
        ...state,
        formData: { ...state.formData, age: numValue },
        errors: { 
          ...state.errors, 
          age: numValue === '' || parseInt(numValue) <= 0 ? 'Введите корректный возраст' : '' 
        },
        showResult: false
      }
      console.log('[STORE] new state:', newState)
      return newState
    })
  },

  setHeight: (value) => {
    console.log('[STORE] setHeight:', value)
    const numValue = value === '' ? '' : String(Math.max(0, parseInt(value) || 0))
    set((state) => {
      const newState = {
        ...state,
        formData: { ...state.formData, height: numValue },
        errors: { 
          ...state.errors, 
          height: numValue === '' || parseInt(numValue) <= 0 ? 'Введите корректный рост' : '' 
        },
        showResult: false
      }
      console.log('[STORE] new state:', newState)
      return newState
    })
  },

  setWeight: (value) => {
    console.log('[STORE] setWeight:', value)
    const numValue = value === '' ? '' : String(Math.max(0, parseInt(value) || 0))
    set((state) => {
      const newState = {
        ...state,
        formData: { ...state.formData, weight: numValue },
        errors: { 
          ...state.errors, 
          weight: numValue === '' || parseInt(numValue) <= 0 ? 'Введите корректный вес' : '' 
        },
        showResult: false
      }
      console.log('[STORE] new state:', newState)
      return newState
    })
  },

  setActivity: (activity) => {
    console.log('[STORE] setActivity:', activity)
    set((state) => {
      const newState = {
        ...state,
        formData: { ...state.formData, activity },
        showResult: false
      }
      console.log('[STORE] new state:', newState)
      return newState
    })
  },

  validateForm: () => {
    console.log('[STORE] validateForm')
    const state = get()
    const newErrors: Errors = {
      age: !state.formData.age ? 'Введите возраст' : '',
      height: !state.formData.height ? 'Введите рост' : '',
      weight: !state.formData.weight ? 'Введите вес' : ''
    }
    
    console.log('[STORE] errors:', newErrors)
    
    set({ errors: newErrors })
    
    const isValid = !newErrors.age && !newErrors.height && !newErrors.weight
    console.log('[STORE] isValid:', isValid)
    return isValid
  },

  calculate: () => {
    console.log('[STORE] calculate called')
    const state = get()
    const { formData } = state
    
    console.log('[STORE] formData:', formData)
    
    if (!formData.age || !formData.height || !formData.weight) {
      console.error('[STORE] Не все поля заполнены!')
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

      const result = { dailyNorm, maintenance }
      
      console.log('[STORE] calculated result:', result)
      
      set({ 
        result, 
        showResult: true,
        errors: { age: '', height: '', weight: '' }
      })
      
      console.log('[STORE] state updated, showResult:', get().showResult)
    } catch (error) {
      console.error('[STORE] Ошибка расчета:', error)
    }
  },

  clearForm: () => {
    console.log('[STORE] clearForm')
    set({
      formData: { ...initialFormData },
      errors: { ...initialErrors },
      result: { ...initialResult },
      showResult: false
    })
  }
}))