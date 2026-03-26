import React, { FormEvent } from 'react'
import { useCalorieStore } from '../../store/useCalorieStore'
import { GenderRadio } from './GenderRadio'
import { InputField } from './InputField'
import { ActivityRadio } from './ActivityRadio'
import { FormButtons } from './FormButtons'

export const CalculatorForm: React.FC = () => {
  const formData = useCalorieStore((state) => state.formData)
  const errors = useCalorieStore((state) => state.errors)
  const setGender = useCalorieStore((state) => state.setGender)
  const setAge = useCalorieStore((state) => state.setAge)
  const setHeight = useCalorieStore((state) => state.setHeight)
  const setWeight = useCalorieStore((state) => state.setWeight)
  const setActivity = useCalorieStore((state) => state.setActivity)
  const calculate = useCalorieStore((state) => state.calculate)
  const clearForm = useCalorieStore((state) => state.clearForm)

  const isValid = Boolean(
    formData.age && 
    formData.height && 
    formData.weight && 
    !errors.age && 
    !errors.height && 
    !errors.weight
  )

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isValid) {
      calculate()
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <GenderRadio gender={formData.gender} onChange={setGender} />
      
      <fieldset className="form__group form__row">
        <legend className="visually-hidden">Параметры человека</legend>
        
        <InputField 
          label="Возраст" 
          value={formData.age} 
          error={errors.age} 
          onChange={setAge} 
        />
        
        <InputField 
          label="Рост" 
          value={formData.height} 
          error={errors.height} 
          onChange={setHeight} 
        />
        
        <InputField 
          label="Вес" 
          value={formData.weight} 
          error={errors.weight} 
          onChange={setWeight} 
        />
      </fieldset>
      
      <ActivityRadio activity={formData.activity} onChange={setActivity} />
      
      <FormButtons 
        isValid={isValid} 
        onClear={clearForm} 
      />
    </form>
  )
}