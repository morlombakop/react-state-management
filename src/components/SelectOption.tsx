import * as React from 'react'
import styled, { css } from 'styled-components'
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

  const SelectContainer = styled.div`
    box-sizing: border-box;
    select {
      display: inline-block;
      width: 100%;
      padding: 0.375rem 1.75rem 0.375rem 0.75rem;
      color: #7b8a8b;
      vertical-align: middle;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      ${!isValid(value) &&
        css`
          border: 1px solid red;
        `}
    }
    span {
      color: red;
    }
  `

  return (
    <SelectContainer>
      <strong>{label}</strong>
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
      {!isValid(value) && <span>{error}</span>}
    </SelectContainer>
  )
}

export default SelectOption
