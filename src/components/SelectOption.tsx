import * as React from 'react'
import { ISelectOptionProps } from '../types/PropTypes'

const SelectOption: React.FC<ISelectOptionProps> = ({
  onChange,
  value,
  name,
  label,
  error,
  options,
}) => {
  const isValid = (currentValue: string) => currentValue && currentValue.length
  const baseHandler = (inputValue: string) => {
    if (isValid(inputValue)) {
      onChange(inputValue, name)
    }
  }

  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) =>
    baseHandler(target.value)
  const handleLoseFocus = ({ target }: React.FocusEvent<HTMLSelectElement>) =>
    baseHandler(target.value)

  return (
    <select
      value={value}
      name={name}
      data-testid="select-option"
      onChange={handleChange}
      onBlur={handleLoseFocus}
    >
      <option value="" disabled={true} hidden={true}>
        Select
      </option>
      {options.map(value => (
        <option key={value}>{value}</option>
      ))}
    </select>
  )
}

export default SelectOption
