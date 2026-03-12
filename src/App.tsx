import React from 'react'
import { CalculatorForm } from './components/CalculatorForm'
import { useCalorieStore } from './store/useCalorieStore'

function App() {
  const showResult = useCalorieStore((state) => state.showResult)
  const result = useCalorieStore((state) => state.result)

  return (
    <>
      <div className="bg">
        <div className="bg__overlay"></div>
        <picture className="bg__img">
          <source src="/assets/images/bg.webp" type="image/webp" />
          <img src="/assets/images/bg.jpeg" alt="Фоновое изображение" />
        </picture>
      </div>

      <div className="counter">
        <h1 className="counter__title h1">Счетчик калорий</h1>
        <div className="counter__body wrapper">
          <CalculatorForm />  {/* ← ЭТОТ КОМПОНЕНТ ДОЛЖЕН БЫТЬ ЗДЕСЬ */}
        </div>
      </div>

      {showResult && (
        <div className="counter-result counter-result_active wrapper">
          <h2 className="counter-result__title h2">Ваш результат</h2>
          <div className="counter-result__body">
            <p className="counter-result__text text">
              Суточная норма - <strong>{result.dailyNorm} ккал</strong>
            </p>
            <p className="counter-result__text text">
              Для поддержания веса: <strong>{result.maintenance} ккал</strong>
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default App