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

export interface CalculationResult {
  dailyNorm: number
  maintenance: number
}