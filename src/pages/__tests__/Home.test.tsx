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
  const IncidentContainer = getByTestId('home-container')
  const IncidentListChildren = IncidentContainer.children

  test('CreateIncident form component rendered correctly', () => {
    expect(IncidentContainer).toBeInstanceOf(HTMLDivElement)
    expect(IncidentContainer.classList.contains('wrapper')).toEqual(true)
    expect(IncidentContainer.childElementCount).toBe(3)
    expect(IncidentListChildren.item(0)).toHaveTextContent('Incident Lists')
    expect(IncidentListChildren.item(1)).toBeInstanceOf(HTMLDivElement)
    expect(IncidentListChildren.item(2)).toBeInstanceOf(HTMLDivElement)
  })
})
