import 'jest-dom/extend-expect'
import 'jest-styled-components'
import * as React from 'react'
import { cleanup, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from '../Header'

afterAll(cleanup)

describe('Header component tests', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  )
  const container = getByTestId('header-container')
  const ulEl = container.querySelector('ul')
  const listElements = container.querySelectorAll('li')

  test('Header component renders correctly', () => {
    expect(ulEl).not.toEqual(null)
    listElements.forEach(element => {
      expect(element).not.toEqual(null)
      expect(element).toHaveStyle('display: inline;')
    })
  })

  test('Header component styles renders correctly', () => {
    expect(container).toHaveStyle(`
      width: 100%;
      padding: 15px 0;
      background-color: #444444;
    `)
    container.querySelectorAll('a').forEach(element => {
      expect(element).toHaveStyle(`
      padding: 0px 10px;
      text-decoration: none;
      color: #d0d0d0;
    `)
    })
  })
})
