import { cleanup, render, fireEvent } from '@testing-library/react'
import 'jest-dom/extend-expect'
import 'jest-styled-components'
import * as React from 'react'
import CreateIncident from '../CreateIncident'

afterAll(cleanup)

describe('CreateIncident form component tests', () => {
  const { getByTestId } = render(<CreateIncident />)
  const CreateIncidentForm = getByTestId('create-incident-form')
  const CreateIncidentFormFieldset = CreateIncidentForm.children.item(0) || new HTMLElement()
  const CreateIncidentFormTitle = CreateIncidentFormFieldset.firstChild
  const CreateIncidentFormButton = CreateIncidentFormFieldset.children.item(4) || new HTMLElement()

  test('CreateIncident form component rendered correctly', () => {
    expect(CreateIncidentFormFieldset.childElementCount).toBe(5)
    expect(CreateIncidentFormTitle).toHaveTextContent('Create New Incident')
    expect(CreateIncidentFormButton.firstChild).toBeInstanceOf(HTMLInputElement)
    expect(CreateIncidentFormButton.firstChild).toHaveTextContent('Create')
  })

  test('CreateIncident form component styles rendered correctly', () => {
    expect(CreateIncidentFormFieldset).toHaveStyle(`
      padding: 15px;
      border-width: 0;
    `)
    expect(CreateIncidentFormButton).toHaveStyle(`
      float: right;
      color: #fff;
      background-color: #95a5a6;
      border-color: transparent;
      line-height: 1.5;
      border-radius: 0.25rem;
      padding: 0.375rem 0.75rem;
    `)
  })

  test('CreateIncident form component Create button', () => {
    fireEvent.click(CreateIncidentFormButton)
    // something happens
  })
})
