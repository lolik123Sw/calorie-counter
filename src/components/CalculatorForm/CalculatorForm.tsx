import React, { ChangeEvent, FormEvent } from 'react';
import { useCalorieStore } from '../../store/useCalorieStore';

export const CalculatorForm: React.FC = () => {
  const {
    formData,
    errors,
    setGender,
    setAge,
    setHeight,
    setWeight,
    setActivity,
    validateForm,
    calculate,
    clearForm
  } = useCalorieStore();

  const isFormValid = !errors.age && !errors.height && !errors.weight && 
                      formData.age && formData.height && formData.weight;

  const handleCalculate = () => {
    if (validateForm()) {
      calculate();
    }
  };

  const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
  };

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  const handleActivityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setActivity(e.target.value as any);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };


  return (
    <form className="form" onSubmit={handleSubmit}>
      <fieldset className="form__group">
        <legend className="form__legend">Пол</legend>
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

      <fieldset className="form__group">
        <legend className="form__legend">Параметры человека</legend>
        <div className="form__row">
          <div className="form__group">
            <label htmlFor="age" className="form__label">Возраст</label>
            <span className="text-light">лет</span>
            <input
              type="number"
              id="age"
              className={`form__control ${errors.age ? 'form__control_error' : ''}`}
              value={formData.age}
              onChange={handleAgeChange}
              placeholder="0"
            />
            {errors.age && <span className="form__error">{errors.age}</span>}
          </div>

          <div className="form__group">
            <label htmlFor="height" className="form__label">Рост</label>
            <span className="text-light">см</span>
            <input
              type="number"
              id="height"
              className={`form__control ${errors.height ? 'form__control_error' : ''}`}
              value={formData.height}
              onChange={handleHeightChange}
              placeholder="0"
            />
            {errors.height && <span className="form__error">{errors.height}</span>}
          </div>

          <div className="form__group">
            <label htmlFor="weight" className="form__label">Вес</label>
            <span className="text-light">кг</span>
            <input
              type="number"
              id="weight"
              className={`form__control ${errors.weight ? 'form__control_error' : ''}`}
              value={formData.weight}
              onChange={handleWeightChange}
              placeholder="0"
            />
            {errors.weight && <span className="form__error">{errors.weight}</span>}
          </div>
        </div>
      </fieldset>

      <fieldset className="form__group">
        <legend className="form__legend">Физическая активность</legend>
        <div className="radioGroup">
          <label className="form__radio">
            <input
              type="radio"
              name="activity"
              value="minimal"
              checked={formData.activity === 'minimal'}
              onChange={handleActivityChange}
            />
            <label>
              <span>Минимальная</span>
              <span className="text-light">Сидячая работа, отсутствие физических нагрузок</span>
            </label>
          </label>

          <label className="form__radio">
            <input
              type="radio"
              name="activity"
              value="low"
              checked={formData.activity === 'low'}
              onChange={handleActivityChange}
            />
            <label>
              <span>Низкая</span>
              <span className="text-light">Редкие, нерегулярные тренировки, активность в быту</span>
            </label>
          </label>

          <label className="form__radio">
            <input
              type="radio"
              name="activity"
              value="medium"
              checked={formData.activity === 'medium'}
              onChange={handleActivityChange}
            />
            <label>
              <span>Средняя</span>
              <span className="text-light">Тренировки 3-5 раз в неделю</span>
            </label>
          </label>

          <label className="form__radio">
            <input
              type="radio"
              name="activity"
              value="high"
              checked={formData.activity === 'high'}
              onChange={handleActivityChange}
            />
            <label>
              <span>Высокая</span>
              <span className="text-light">Тренировки 6-7 раз в неделю</span>
            </label>
          </label>

          <label className="form__radio">
            <input
              type="radio"
              name="activity"
              value="veryHigh"
              checked={formData.activity === 'veryHigh'}
              onChange={handleActivityChange}
            />
            <label>
              <span>Очень высокая</span>
              <span className="text-light">Больше 6 тренировок в неделю и физическая работа</span>
            </label>
          </label>
        </div>
      </fieldset>

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
  );
};