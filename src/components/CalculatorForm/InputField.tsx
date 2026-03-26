import React from 'react'

interface InputFieldProps {
  label: string
  value: string
  error?: string
  onChange: (value: string) => void
}

export const InputField: React.FC<InputFieldProps> = ({ label, value, error, onChange }) => {
  return (
    <div className="form__group">
      <label className="form__label h2">
        {label}
        <input
          type="number"
          className={`form__control ${error ? 'form__control_error' : ''}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === '-' || e.key === 'e' || e.key === 'E') e.preventDefault()
          }}
        />
      </label>
      {error && <span className="form__error">{error}</span>}
    </div>
  )
}