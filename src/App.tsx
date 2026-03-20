import { CalculatorForm } from './components/CalculatorForm'
import { useCalorieStore } from './store/useCalorieStore'
import bgWebp from './assets/images/bg.webp'
import bgJpeg from './assets/images/bg.jpeg'
function App() {
  const showResult = useCalorieStore((state) => state.showResult)
  const result = useCalorieStore((state) => state.result)

  return (
    <>
      <div className="bg">
        <div className="bg__overlay"></div>
        <picture className="bg__img">
          <source src={bgWebp} type="image/webp" />
          <img src={bgJpeg} alt="Фоновое изображение" />
        </picture>
      </div>

      <div className="counter">
        <h1 className="counter__title h1">Счетчик калорий</h1>
        <div className="counter__body wrapper">
          <CalculatorForm />  {}
        </div>
      </div>

      {showResult && (
        <div className="counter-result counter-result_active wrapper">
          <h2 className="counter-result__title h2">Ваш результат</h2>
          <div className="counter-result__body">
            <p className="counter-result__text text">
              Суточная норма - <strong>{result.dailyNorm} каллорий</strong>
            </p>
            <p className="counter-result__text text">
              Для поддержания веса: <strong>{result.maintenance} каллорий</strong>
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default App