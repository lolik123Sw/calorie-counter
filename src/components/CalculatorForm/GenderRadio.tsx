import React from 'react'

interface GenderRadioProps {
  gender: 'male' | 'female'
  onChange: (gender: 'male' | 'female') => void
}

export const GenderRadio: React.FC<GenderRadioProps> = ({ gender, onChange }) => {
  return (
    <fieldset className="form__group">
      <legend className="form__legend h2">Пол</legend>
      <div className="form__btn-radios">
        <div className="form__btn-radio">
          <input
            type="radio"
            id="male"
            name="gender"
            checked={gender === 'male'}
            onChange={() => onChange('male')}
          />
          <label htmlFor="male">Мужской</label>
        </div>
        <div className="form__btn-radio">
          <input
            type="radio"
            id="female"
            name="gender"
            checked={gender === 'female'}
            onChange={() => onChange('female')}
          />
          <label htmlFor="female">Женский</label>
        </div>
      </div>
    </fieldset>
  )
}