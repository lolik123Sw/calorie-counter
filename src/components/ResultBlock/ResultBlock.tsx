import React from 'react';
import { useCalorieStore } from '../../store/useCalorieStore';

export const ResultBlock: React.FC = () => {
  const { result, showResult } = useCalorieStore();

  if (!showResult || !result) {
    return null;
  }

  return (
    <div className="counter-result counter-result_active">
      <h2 className="h2 counter-result__title">Ваш результат</h2>
      <p className="text counter-result__text">
        Суточная норма - <strong>{result.baseCalories} ккал</strong>, 
        необходимая организму для нормального функционирования.
      </p>
      <p className="text counter-result__text">
        Для поддержания веса нужно употреблять <strong>{result.maintenanceCalories} ккал</strong> в день.
      </p>
    </div>
  );
};