import * as React from 'react'
import styled from 'styled-components'
import { ITextBoxPops } from '../types/PropTypes'

const Container = styled.label`
  display: flex;
  width: 100%;
  flex-direction: column;
  background: #ffffff;
  box-sizing: border-box;
  input {
    padding: 0.5rem 0.75rem;
    border: 1px solid #ced4da;
    font-size: 1rem;
    &:required {
      border: 1px solid red;
    }
  }
  span {
    color: red;
    font-size: 0.8rem;
  }
  strong {
    font-size: 0.85rem;
  }
`

const TextBox: React.FC<ITextBoxPops> = ({ onChange, value, name, label, error, placeholder }) => {
  const [isTouched, setTouched] = React.useState<boolean>(false)

  const isInvalid = () => isTouched && value.length < 5

  const baseHandler = (inputValue: string) => onChange(inputValue, name)

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    baseHandler(target.value)

  const handleLoseFocus = ({ target }: React.FocusEvent<HTMLInputElement>) => {
    if (!isTouched) {
      setTouched(true)
    }
    baseHandler(target.value)
  }

  return (
    <Container htmlFor={name} data-testid="input-text-container">
      <strong>{label}</strong>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        name={name}
        required={isInvalid()}
        onChange={handleChange}
        onBlur={handleLoseFocus}
      />
      {isInvalid() && <span>{error}</span>}
    </Container>
  )
}

export default TextBox
