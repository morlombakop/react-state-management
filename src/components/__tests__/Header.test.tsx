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
  const HeaderContainer = getByTestId('header-container')
  const HeaderFirstChild = HeaderContainer.firstChild || new HTMLElement()
  const HomeLink = HeaderFirstChild.firstChild
  const CreateLink = HeaderFirstChild.lastChild

  test('Header component rendered correctly', () => {
    expect(HeaderFirstChild).toBeInstanceOf(HTMLUListElement)
    expect(HomeLink).toBeInstanceOf(HTMLLIElement)
    expect(CreateLink).toBeInstanceOf(HTMLLIElement)
  })

  test('Header component styles rendered correctly', () => {
    expect(HeaderContainer).toHaveStyle(`
      width: 100%;
      padding: 15px 0;
      background-color: #444444;
    `)
    expect(HeaderContainer.getElementsByTagName('a').item(0)).toHaveStyle(`
      padding: 0px 10px;
      text-decoration: none;
      color: #d0d0d0;
    `)
  })
})
