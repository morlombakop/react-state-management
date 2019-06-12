import * as React from 'react'
import styled from 'styled-components'
import { ITextBoxPops } from '../types/PropTypes';

const TextBox: React.FC<ITextBoxPops> = ({ onChange, value, id, label, error, placeholder }) => {
  // const [isValid, setValidity] = React.useState<boolean>(false)
  // const [className, setClassName] = React.useState<string>('input')

  const isValid = (currentValue: string) => currentValue && currentValue.length > 5
  const baseHandler = (inputValue: string) => {
    if (isValid(inputValue)) {
      // if(!isValid){
      //   setValidity(true);
      // }
      onChange(value)
    }
  }

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => baseHandler(target.value)
  const handleLoseFocus = ({ target }: React.FocusEvent<HTMLInputElement>) => baseHandler(target.value)

  const Container = styled.label`
    margin: 7px 0;
    display: flex;
    width: 100%;
    flex-direction: column;
    background: #ffffff;
    input {
      padding: 10px 15px;
      margin: 5px 0;
    }
    strong {
      font-weight: 600;
    }
    span {
      color: red;
    }
  `

  return (
    <Container htmlFor={id}>
      <strong>{label}</strong>
      <input
        type="text"
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={handleChange}
        onBlur={handleLoseFocus}
      />
      {isValid(value) && <span>{error}</span>}
    </Container>
  )
}

export default TextBox
