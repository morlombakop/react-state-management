import { cleanup, render } from '@testing-library/react'
import 'jest-dom/extend-expect'
import 'jest-styled-components'
import * as React from 'react'
import Incident from '../Incident'

afterAll(cleanup)

describe('Incident component tests', () => {
  const { getByTestId } = render(
    <Incident title="Incident title" assignee="Title assignee" status="Acknowledged" />
  )
  const IncidentContainer = getByTestId('incident-container')
  const IncidentTitle = IncidentContainer.children.item(0)
  const IncidentSpanCollection = IncidentContainer.getElementsByTagName('span')

  test('Incident component rendered correctly', () => {
    expect(IncidentContainer.parentElement).toBeInstanceOf(HTMLDivElement)
    expect(IncidentContainer.childElementCount).toBe(3)
    expect(IncidentTitle).toBeInstanceOf(HTMLParagraphElement)
    expect(IncidentTitle).toHaveTextContent('Incident title')
    expect(IncidentContainer.children.item(1)).toBeInstanceOf(HTMLParagraphElement)
    expect(IncidentContainer.children.item(2)).toBeInstanceOf(HTMLParagraphElement)
    expect(IncidentSpanCollection.item(0)).toHaveTextContent('Assignee:')
    expect(IncidentSpanCollection.item(1)).toHaveTextContent('Title assignee')
    expect(IncidentSpanCollection.item(2)).toHaveTextContent('Status:')
    expect(IncidentSpanCollection.item(3)).toHaveTextContent('Acknowledged')
  })

  test('Incident styles rendered correctly', () => {
    expect(IncidentContainer).toHaveStyle(`
      display: flex;
      flex-direction: column;
      width: 100%;
      border: 1px solid #d3d3d3;
      border-radius: 0.25rem;
      margin-bottom: 1rem;
    `)
    expect(IncidentTitle).toHaveStyle(`
      display: flex;
      margin: 0;
      padding: 0.75rem 1.25rem;
      border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
      background-color: rgba(0, 0, 0, 0.03);
      border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    `)
    expect(IncidentSpanCollection.item(0)).toHaveStyle(`width: 15%;`)
  })
})
