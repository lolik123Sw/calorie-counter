import { CalculatorForm } from './components/CalculatorForm';
import { ResultBlock } from './components/ResultBlock';
import './styles/index.css';

function App() {
  return (
    <div className="counter">
      <div className="bg">
        <div className="bg__overlay"></div>
      </div>
      
      <h1 className="h1 counter__title">Счетчик калорий</h1>
      
      <div className="wrapper">
        <CalculatorForm />
        <ResultBlock />
      </div>
    </div>
  );
}

export default App;