import React from 'react'

type ActivityLevel = 'minimal' | 'low' | 'medium' | 'high' | 'veryHigh'

interface ActivityRadioProps {
  activity: ActivityLevel
  onChange: (activity: ActivityLevel) => void
}

const activityOptions: { value: ActivityLevel; label: string; description: string }[] = [
  { value: 'minimal', label: 'Минимальная', description: 'Сидячая работа, отсутствие физических нагрузок' },
  { value: 'low', label: 'Низкая', description: 'Редкие, нерегулярные тренировки, активность в быту' },
  { value: 'medium', label: 'Средняя', description: 'Тренировки 3-5 раз в неделю' },
  { value: 'high', label: 'Высокая', description: 'Тренировки 6-7 раз в неделю' },
  { value: 'veryHigh', label: 'Очень высокая', description: 'Больше 6 тренировок в неделю и физическая работа' }
]

export const ActivityRadio: React.FC<ActivityRadioProps> = ({ activity, onChange }) => {
  return (
    <fieldset className="form__group">
      <legend className="form__legend h2">Физическая активность</legend>
      
      {activityOptions.map(option => (
        <div className="form__radio" key={option.value}>
          <input
            type="radio"
            name="activity"
            id={option.value}
            value={option.value}
            checked={activity === option.value}
            onChange={() => onChange(option.value)}  
          />
          <label className="text" htmlFor={option.value}>
            {option.label}
            <span className="text-light">{option.description}</span>
          </label>
        </div>
      ))}
    </fieldset>
  )
}