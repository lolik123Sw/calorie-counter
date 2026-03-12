import React, { ChangeEvent, FormEvent, useEffect } from 'react'
import { useCalorieStore } from '../../store/useCalorieStore'

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

  const isFormValid = 
    formData.age !== '' && 
    formData.height !== '' && 
    formData.weight !== '' &&
    !errors.age && 
    !errors.height && 
    !errors.weight

  const handleCalculate = () => {
    calculate()
  }

  const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value)
  }

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value)
  }

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value)
  }

  const handleActivityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setActivity(e.target.value as 'minimal' | 'low' | 'medium' | 'high' | 'veryHigh')
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const preventNegativeInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '-' || e.key === 'e' || e.key === 'E') {
      e.preventDefault()
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {}
      <fieldset className="form__group">
        <legend className="form__legend h2">Пол</legend>
        <div className="form__btn-radios">
          <div className="form__btn-radio">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={() => setGender('male')}
            />
            <label htmlFor="male">Мужской</label>
          </div>
          <div className="form__btn-radio">
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={() => setGender('female')}
            />
            <label htmlFor="female">Женский</label>
          </div>
        </div>
      </fieldset>

      {}
      <fieldset className="form__group form__row">
        <legend className="visually-hidden">Параметры человека</legend>
        
        {}
        <div className="form__group">
          <label className="form__label h2" htmlFor="age">
            Возраст
            <span className="text-light">лет</span>
          </label>
          <input
            type="number"
            id="age"
            className={`form__control ${errors.age ? 'form__control_error' : ''}`}
            value={formData.age}
            onChange={handleAgeChange}
            onKeyDown={preventNegativeInput}
            placeholder="0"
            min="0"
            max="150"
            step="1"
          />
          {errors.age && <span className="form__error">{errors.age}</span>}
        </div>

        {}
        <div className="form__group">
          <label className="form__label h2" htmlFor="height">
            Рост
            <span className="text-light">см</span>
          </label>
          <input
            type="number"
            id="height"
            className={`form__control ${errors.height ? 'form__control_error' : ''}`}
            value={formData.height}
            onChange={handleHeightChange}
            onKeyDown={preventNegativeInput}
            placeholder="0"
            min="0"
            max="300"
            step="1"
          />
          {errors.height && <span className="form__error">{errors.height}</span>}
        </div>

        {/* Вес */}
        <div className="form__group">
          <label className="form__label h2" htmlFor="weight">
            Вес
            <span className="text-light">кг</span>
          </label>
          <input
            type="number"
            id="weight"
            className={`form__control ${errors.weight ? 'form__control_error' : ''}`}
            value={formData.weight}
            onChange={handleWeightChange}
            onKeyDown={preventNegativeInput}
            placeholder="0"
            min="0"
            max="500"
            step="1"
          />
          {errors.weight && <span className="form__error">{errors.weight}</span>}
        </div>
      </fieldset>

      {}
      <fieldset className="form__group">
        <legend className="form__legend h2">Физическая активность</legend>
        
        {}
        <div className="form__radio">
          <input
            type="radio"
            name="activity"
            id="minimal"
            value="minimal"
            checked={formData.activity === 'minimal'}
            onChange={handleActivityChange}
          />
          <label className="text" htmlFor="minimal">
            Минимальная
            <span className="text-light">Сидячая работа, отсутствие физических нагрузок</span>
          </label>
        </div>

        {}
        <div className="form__radio">
          <input
            type="radio"
            name="activity"
            id="low"
            value="low"
            checked={formData.activity === 'low'}
            onChange={handleActivityChange}
          />
          <label className="text" htmlFor="low">
            Низкая
            <span className="text-light">Редкие, нерегулярные тренировки, активность в быту</span>
          </label>
        </div>

        {}
        <div className="form__radio">
          <input
            type="radio"
            name="activity"
            id="medium"
            value="medium"
            checked={formData.activity === 'medium'}
            onChange={handleActivityChange}
          />
          <label className="text" htmlFor="medium">
            Средняя
            <span className="text-light">Тренировки 3-5 раз в неделю</span>
          </label>
        </div>

        {}
        <div className="form__radio">
          <input
            type="radio"
            name="activity"
            id="high"
            value="high"
            checked={formData.activity === 'high'}
            onChange={handleActivityChange}
          />
          <label className="text" htmlFor="high">
            Высокая
            <span className="text-light">Тренировки 6-7 раз в неделю</span>
          </label>
        </div>

        {}
        <div className="form__radio">
          <input
            type="radio"
            name="activity"
            id="veryHigh"
            value="veryHigh"
            checked={formData.activity === 'veryHigh'}
            onChange={handleActivityChange}
          />
          <label className="text" htmlFor="veryHigh">
            Очень высокая
            <span className="text-light">Больше 6 тренировок в неделю и физическая работа</span>
          </label>
        </div>
      </fieldset>

      {}
      <div className="form__btns">
        <button
          type="button"
          className="btn"
          onClick={handleCalculate}
          disabled={!isFormValid}
        >
          Рассчитать
        </button>
        <button
          type="button"
          className="btn btn_transparent"
          onClick={clearForm}
        >
          Очистить поля
        </button>
      </div>
    </form>
  )
}