import { cleanup, fireEvent, render } from '@testing-library/react'
import { random } from 'faker'
import 'jest-dom/extend-expect'
import 'jest-styled-components'
import * as React from 'react'
import { ISelectOptionProps } from '../../types/PropTypes'
import SelectOption from '../SelectOption'

afterEach(cleanup)

describe('SelectOption component tests', () => {
  const props: ISelectOptionProps = {
    onChange: (value: string, name: string) => {},
    value: '',
    name: random.word(),
    label: random.words(2),
    error: random.words(4),
    options: [random.word(), random.word()],
  }

  const selectStyle = `
    display: inline-block;
    width: 100%;
    padding: 0.5rem 1.75rem 0.5rem 0.75rem;
    vertical-align: middle;
    border: 1px solid #ced4da;
    font-size: 1rem;
    border-radius: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
  `

  const setUp = (selectOptionProps = props) => {
    const { container } = render(<SelectOption {...selectOptionProps} />)
    const selectOption = container.querySelector('select')

    return { selectOption, container }
  }

  test('SelectOption component rendered correctly', () => {
    const { selectOption, container } = setUp()

    expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
    expect(container.firstElementChild!.childElementCount).toEqual(2)
    expect(container.querySelector('strong')).toHaveTextContent(props.label)
    expect(selectOption).toHaveValue(props.value)
    expect(selectOption!.options).toHaveLength(props.options.length + 1)

    const defaultOption = selectOption!.children.item(0)
    expect(defaultOption).toHaveTextContent('Select')
    expect(defaultOption).toBeDisabled()

    expect(selectOption!.children.item(1)).toHaveTextContent(props.options[0])
    expect(selectOption!.children.item(2)).toHaveTextContent(props.options[1])
  })

  test('SelectOption styles rendered correctly', () => {
    const { selectOption, container } = setUp()

    expect(selectOption).toHaveStyle(selectStyle)

    container.querySelectorAll('option').forEach(option => {
      expect(option).toHaveStyle(`
        -webkit-appearance: none;
        -moz-appearance: none;
      `)
    })

    expect(container.firstChild).toHaveStyle('box-sizing: border-box;')
  })

  test('SelectOption should call onChange function on change event', () => {
    const spy = jest.spyOn(props, 'onChange')
    const value = props.options[0]
    const { selectOption } = setUp()

    fireEvent.change(selectOption!, { target: { value } })
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(value, props.name)
  })

  test('SelectOption should call onChange on focus lost event', () => {
    const spy = jest.spyOn(props, 'onChange')
    const { selectOption } = setUp()

    fireEvent.blur(selectOption!)
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenCalledWith(props.value, props.name)
  })

  test('SelectOption should display errors', () => {
    const { container, selectOption } = setUp()
    fireEvent.blur(selectOption!)
    const errorEl = container.querySelector('span')

    expect(container.firstElementChild!.childElementCount).toBe(3)
    expect(errorEl).toHaveTextContent(props.error)
    expect(selectOption).toHaveStyle(`
      display: inline-block;
      width: 100%;
      padding: 0.5rem 1.75rem 0.5rem 0.75rem;
      vertical-align: middle;
      border: 1px solid red;
      font-size: 1rem;
      border-radius: 0;
      -webkit-appearance: none;
      -moz-appearance: none;
    `)
    expect(errorEl).toHaveStyle(`
      color: red;
      font-size: 0.8rem;
    `)
  })

  test('SelectOption should not display errors', () => {
    const componentProps = { ...props, value: props.options[0] }
    const { container, selectOption } = setUp(componentProps)
    fireEvent.blur(selectOption!)

    expect(container.firstElementChild!.childElementCount).toBe(2)
    expect(selectOption).toHaveStyle(selectStyle)
  })
})
