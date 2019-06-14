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
      background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e")
        no-repeat right 0.75rem center/8px 10px;
      ${!isValid(value) &&
        css`
          border: 1px solid red;
        `}
    }
    select,
    option {
      -webkit-appearance: none;
      -moz-appearance: none;
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
