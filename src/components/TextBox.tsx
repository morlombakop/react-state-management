import * as React from 'react'
import styled, { css } from 'styled-components'
import { ITextBoxPops } from '../types/PropTypes'

const TextBox: React.FC<ITextBoxPops> = ({ onChange, value, name, label, error, placeholder }) => {
  const [currentValue, setValue] = React.useState<string>(value)

  const isValid = (currentValue: string) => currentValue && currentValue.length > 5

  const baseHandler = (inputValue: string) => {
    if (isValid(inputValue)) {
      onChange(inputValue, name)
    }
    setValue(inputValue)
  }

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    baseHandler(target.value)
  const handleLoseFocus = ({ target }: React.FocusEvent<HTMLInputElement>) =>
    baseHandler(target.value)

  const Container = styled.label`
    display: flex;
    width: 100%;
    flex-direction: column;
    background: #ffffff;
    box-sizing: border-box;
    input {
      padding: 0.4rem 0.75rem;
      color: #7b8a8b;
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
    <Container htmlFor={name} data-testid="input-text-box">
      <strong>{label}</strong>
      <input
        type="text"
        placeholder={placeholder}
        value={currentValue}
        name={name}
        onChange={handleChange}
        autoFocus={true}
        onBlur={handleLoseFocus}
      />
      {!isValid(value) && <span>{error}</span>}
    </Container>
  )
}

export default TextBox
