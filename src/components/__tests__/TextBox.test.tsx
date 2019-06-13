import { cleanup, render } from '@testing-library/react'
import 'jest-dom/extend-expect'
import 'jest-styled-components'
import * as React from 'react'
import TextBox from '../TextBox'

afterAll(cleanup)

describe('Incident component tests', () => {
  const { getByTestId } = render(
    <TextBox
      onChange={() => {}}
      placeholder="Enter title"
      value=""
      name="title"
      label="Textbox Title"
      error="Title is required and must be at least 5 characters"
    />
  )
  const InputTextbox = getByTestId('input-text-box')
  const InputTextboxChildren = InputTextbox.children

  test('Input textbox rendered correctly', () => {
    expect(InputTextbox).toBeInstanceOf(HTMLLabelElement)
    expect(InputTextbox.childElementCount).toBe(3)
    expect(InputTextboxChildren.item(0)).toHaveTextContent('Textbox Title')
    expect(InputTextboxChildren.item(1)).toBeInstanceOf(HTMLInputElement)
    expect(InputTextboxChildren.item(2)).toHaveTextContent(
      'Title is required and must be at least 5 characters'
    )
  })

  test('Input textbox styles rendered correctly', () => {
    expect(InputTextbox).toHaveStyle(`
      display: flex;
      width: 100%;
      flex-direction: column;
      background: #ffffff;
      box-sizing: border-box;
    `)
    expect(InputTextboxChildren.item(1)).toHaveStyle(`
      padding: 0.4rem 0.75rem;
      color: #7b8a8b;
      border: 1px solid red;
      border-radius: 0.25rem;
    `)
    expect(InputTextboxChildren.item(2)).toHaveStyle(`
      color: red;
    `)
  })
})
