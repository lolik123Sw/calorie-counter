import React from 'react'
import { useCalorieStore } from '../../store/useCalorieStore'

export const ResultBlock: React.FC = () => {
  const showResult = useCalorieStore((state) => state.showResult)
  const result = useCalorieStore((state) => state.result)

  if (!showResult) {
    return null
  }

  return (
    <div className="counter-result counter-result_active wrapper">
      <h2 className="counter-result__title h2">Ваш результат</h2>
      <div className="counter-result__body">
        <p className="counter-result__text text">
          Суточная норма - <strong>{result.dailyNorm} ккал</strong>, 
          необходимая организму для нормального функционирования.
        </p>
        <p className="counter-result__text text">
          Для поддержания веса нужно употреблять{' '}
          <strong>{result.maintenance} ккал</strong> в день.
        </p>
      </div>
    </div>
  )
}