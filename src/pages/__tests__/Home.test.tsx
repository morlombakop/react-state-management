import { cleanup, render } from '@testing-library/react'
import 'jest-dom/extend-expect'
import 'jest-styled-components'
import * as React from 'react'
import { incidents } from '../../config/fixtures'
import { IHome } from '../../types/PropTypes'
import Home from '../Home'

afterAll(cleanup)

describe('CreateIncident form component tests', () => {
  const props: IHome = {
    incidents,
  }
  const { getByTestId } = render(<Home {...props} />)
  const container = getByTestId('home-container')
  const containerChildren = container.children

  test('CreateIncident form component rendered correctly', () => {
    expect(container).toBeInstanceOf(HTMLDivElement)
    expect(container.classList.contains('wrapper')).toEqual(true)
    expect(container.childElementCount).toBe(3)
    expect(container.querySelector('h1')).toHaveTextContent('Incident Lists')
    expect(containerChildren.item(1)).toBeInstanceOf(HTMLDivElement)
    expect(containerChildren.item(2)).toBeInstanceOf(HTMLDivElement)
  })
})
