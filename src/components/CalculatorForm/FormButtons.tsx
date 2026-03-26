
import React from 'react'

interface FormButtonsProps {
  isValid: boolean
  onClear: () => void

}

export const FormButtons: React.FC<FormButtonsProps> = ({ isValid, onClear }) => {
  return (
    <div className="form__btns">
      <button 
        type="submit"  
        className="btn" 
        disabled={!isValid}
      >
        Рассчитать
      </button>
      <button 
        type="button" 
        className="btn btn_transparent" 
        onClick={onClear}
      >
        Очистить поля
      </button>
    </div>
  )
}