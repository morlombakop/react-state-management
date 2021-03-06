import * as React from 'react'
import styled from 'styled-components'
import { ISelectOptionProps } from '../types/PropTypes'

const SelectContainer = styled.div`
  box-sizing: border-box;
  select {
    display: inline-block;
    width: 100%;
    padding: 0.5rem 1.75rem 0.5rem 0.75rem;
    vertical-align: middle;
    border: 1px solid #ced4da;
    border-radius: 0;
    font-size: 1rem;
    background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e")
      no-repeat right 0.75rem center/8px 10px;
    &:required {
      border: 1px solid red;
    }
  }
  select,
  option {
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  span {
    color: red;
    font-size: 0.8rem;
  }
  strong {
    font-size: 0.85rem;
  }
`

const SelectOption: React.FC<ISelectOptionProps> = ({
  onChange,
  value,
  name,
  label,
  error,
  options,
}) => {
  const [isTouched, setTouched] = React.useState<boolean>(false)

  const isInvalid = () => isTouched && value.length < 5

  const baseHandler = (inputValue: string) => onChange(inputValue, name)

  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) =>
    baseHandler(target.value)
  const handleLoseFocus = ({ target }: React.FocusEvent<HTMLSelectElement>) => {
    if (!isTouched) {
      setTouched(true)
    }
    baseHandler(target.value)
  }

  return (
    <SelectContainer>
      <strong>{label}</strong>
      <select
        value={value}
        name={name}
        data-testid="select-option"
        required={isInvalid()}
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
      {isInvalid() && <span>{error}</span>}
    </SelectContainer>
  )
}

export default SelectOption
