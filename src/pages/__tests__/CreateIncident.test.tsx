import { cleanup, fireEvent, render } from '@testing-library/react'
import 'jest-dom/extend-expect'
import 'jest-styled-components'
import * as React from 'react'
import { assignees, incidentStatuses } from '../../config/fixtures'
import { ICreateIncident, IIncidentProps } from '../../types/PropTypes'
import CreateIncident from '../CreateIncident'

afterEach(cleanup)

describe('CreateIncident component tests', () => {
  const props: ICreateIncident = {
    // @ts-ignore
    dispatchCreateIncident: (incident: IIncidentProps) => {},
    history: {
      // @ts-ignore
      push: (path: string) => {},
    },
  }

  const setUp = (componentProps = props) => {
    const { getByTestId } = render(<CreateIncident {...componentProps} />)

    const form = getByTestId('create-incident-form')
    const formFieldset = form.querySelector('fieldset')
    const formTitle = form.querySelector('h1')
    const formInputs = form.querySelectorAll('input')
    const formSelects = form.querySelectorAll('select')

    return {
      formFieldset,
      form,
      formTitle,
      formInputs,
      formSelects,
      titleInput: formInputs[0],
      submitBtn: formInputs[1],
      assigneeOption: formSelects[0],
      statusOption: formSelects[1],
    }
  }

  test('CreateIncident renders correctly', () => {
    const { formFieldset, form, formTitle, formInputs, submitBtn, formSelects } = setUp()

    expect(formFieldset).toBeInstanceOf(HTMLFieldSetElement)
    expect(form).toHaveFormValues({
      title: '',
      assignee: '',
      status: '',
      btnCreateIncident: 'Create',
    })
    expect(formTitle).toHaveTextContent('Create New Incident')

    expect(formSelects).toHaveLength(2)
    expect(formInputs).toHaveLength(2)

    expect(submitBtn).toHaveValue('Create')
    expect(submitBtn).toHaveAttribute('title', 'Create Incident')
    expect(submitBtn).toHaveAttribute('type', 'submit')
    expect(submitBtn).toBeDisabled()
  })

  test('CreateIncident styles renders correctly', () => {
    const { formFieldset, submitBtn } = setUp()

    expect(formFieldset).toHaveStyle(`
      padding: 0 15px;
      border-width: 0;
    `)
    expect(submitBtn).toHaveStyle(`
      float: right;
      color: #fff;
      background-color: #95a5a6;
      border-color: transparent;
      line-height: 1.5rem;
      padding: 0.4rem 0.75rem;
      font-size: 1rem;
      cursor: not-allowed;
    `)
  })

  test('CreateIncident submit button should not create an incident', () => {
    const { submitBtn } = setUp()
    const dispatchSpy = jest.spyOn(props, 'dispatchCreateIncident')
    const navigationSpy = jest.spyOn(props.history, 'push')

    fireEvent.click(submitBtn)

    expect(dispatchSpy).not.toHaveBeenCalled()
    expect(navigationSpy).not.toHaveBeenCalled()
  })

  test('CreateIncident form submit event should not create an incident', () => {
    const { form } = setUp()
    const dispatchSpy = jest.spyOn(props, 'dispatchCreateIncident')
    const navigationSpy = jest.spyOn(props.history, 'push')

    fireEvent.submit(form)

    expect(dispatchSpy).not.toHaveBeenCalled()
    expect(navigationSpy).not.toHaveBeenCalled()
  })

  test('CreateIncident submit button should create an incident', () => {
    const { submitBtn, titleInput, assigneeOption, statusOption } = setUp()
    const dispatchSpy = jest.spyOn(props, 'dispatchCreateIncident')
    const navigationSpy = jest.spyOn(props.history, 'push')

    const title = 'Hello World'
    fireEvent.change(titleInput, { target: { value: title } })

    const assignee = assignees[0]
    fireEvent.change(assigneeOption, { target: { value: assignee } })

    const status = incidentStatuses[0]
    fireEvent.change(statusOption, { target: { value: status } })

    fireEvent.click(submitBtn)

    expect(dispatchSpy).toBeCalledTimes(1)
    expect(dispatchSpy).toHaveBeenCalledWith({
      title,
      assignee,
      status,
    })
    expect(navigationSpy).toBeCalledTimes(1)
  })

  test('CreateIncident form submit event should create an incident', () => {
    const { form, titleInput, assigneeOption, statusOption } = setUp()
    const dispatchSpy = jest.spyOn(props, 'dispatchCreateIncident')
    const navigationSpy = jest.spyOn(props.history, 'push')

    const title = 'Hello World'
    fireEvent.change(titleInput, { target: { value: title } })

    const assignee = assignees[0]
    fireEvent.change(assigneeOption, { target: { value: assignee } })

    const status = incidentStatuses[0]
    fireEvent.change(statusOption, { target: { value: status } })

    fireEvent.submit(form)

    expect(dispatchSpy).toBeCalled()
    expect(dispatchSpy).toHaveBeenCalledWith({
      title,
      assignee,
      status,
    })
    expect(navigationSpy).toBeCalled()
  })
})
