import { cleanup, render } from '@testing-library/react'
import { random } from 'faker'
import 'jest-dom/extend-expect'
import 'jest-styled-components'
import * as React from 'react'
import Incident from '../Incident'

afterAll(cleanup)

describe('Incident component tests', () => {
  const props = {
    title: random.words(),
    assignee: random.words(2),
    status: random.words(2),
  }
  const { getByTestId } = render(
    <Incident {...props} />
  )
  const container = getByTestId('incident-container')
  const titleEl = container.children.item(0)
  const incidentSpanCollection = container.getElementsByTagName('span')

  test('Incident component renders correctly', () => {
    expect(container.parentElement).toBeInstanceOf(HTMLDivElement)
    expect(container.childElementCount).toBe(3)
    expect(titleEl).toBeInstanceOf(HTMLParagraphElement)
    expect(titleEl).toHaveTextContent(props.title)
    expect(container.children.item(1)).toBeInstanceOf(HTMLParagraphElement)
    expect(container.children.item(2)).toBeInstanceOf(HTMLParagraphElement)
    expect(incidentSpanCollection.item(0)).toHaveTextContent('Assignee:')
    expect(incidentSpanCollection.item(1)).toHaveTextContent(props.assignee)
    expect(incidentSpanCollection.item(2)).toHaveTextContent('Status:')
    expect(incidentSpanCollection.item(3)).toHaveTextContent(props.status)
  })

  test('Incident styles renders correctly', () => {
    expect(container).toHaveStyle(`
      display: flex;
      flex-direction: column;
      width: 100%;
      border: 1px solid #d3d3d3;
      border-radius: 0.25rem;
      margin-bottom: 1rem;
    `)
    expect(titleEl).toHaveStyle(`
      display: flex;
      margin: 0;
      padding: 0.75rem 1.25rem;
      border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
      background-color: rgba(0, 0, 0, 0.03);
      border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    `)
    expect(incidentSpanCollection.item(0)).toHaveStyle(`width: 15%;`)
  })
})
