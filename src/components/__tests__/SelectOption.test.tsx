import { cleanup, render } from '@testing-library/react'
import 'jest-dom/extend-expect'
import 'jest-styled-components'
import * as React from 'react'
import SelectOption from '../SelectOption'

afterAll(cleanup)

describe('SelectOption component tests', () => {
  const { getByTestId } = render(
    <SelectOption
      onChange={() => {}}
      value={'test'}
      name="test"
      label="SelectOption Test"
      error={'error'}
      options={['test1', 'test2']}
    />
  )
  const SelectContainer = getByTestId('select-option')

  test('SelectOption component rendered correctly', () => {
    expect(SelectContainer.parentElement).toBeInstanceOf(HTMLDivElement)
    expect(SelectContainer.previousSibling).toHaveTextContent('SelectOption Test')
    expect(SelectContainer.childElementCount).toBe(3)
    expect(SelectContainer.children.item(0)).toHaveTextContent('Select')
    expect(SelectContainer.children.item(1)).toHaveTextContent('test1')
    expect(SelectContainer.children.item(2)).toHaveTextContent('test2')
  })

  test('SelectOption styles rendered correctly', () => {
    expect(SelectContainer).toHaveStyle(`
      display: inline-block;
      width: 100%;
      padding: 0.5rem 1.75rem 0.5rem 0.75rem;
      vertical-align: middle;
      border: 1px solid #ced4da;
      font-size: 1rem;
    `)
  })
})
