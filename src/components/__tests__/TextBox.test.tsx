import { cleanup, fireEvent, render } from "@testing-library/react";
import { random } from "faker";
import "jest-dom/extend-expect";
import "jest-styled-components";
import * as React from "react";
import { ITextBoxPops } from "../../types/PropTypes";
import TextBox from "../TextBox";

afterEach(cleanup);

describe("Textbox component tests", () => {
  const props: ITextBoxPops = {
    onChange: (value: string, name: string) => {},
    placeholder: random.words(3),
    value: "",
    name: random.word(),
    label:  random.words(2),
    error:  random.words(5),
  };

  const setUp = (componentProps = props) => {
    const { getByTestId} = render(<TextBox {...componentProps} />);
    const container = getByTestId("input-text-container");
    const inputText = container.querySelector('input')

    return { container, inputText }
  }
 
  test("Textbox renders correctly", () => {
    const { container, inputText } = setUp()
    expect(container).toBeInstanceOf(HTMLLabelElement);
    expect(container.childElementCount).toBe(2);

    const titleEl = container.querySelector('strong')
    expect(titleEl).toHaveTextContent(props.label);
    expect(titleEl).toHaveStyle(`
      font-size: 0.85rem;
    `);

    expect(inputText).toHaveAttribute('name', props.name)
    expect(inputText).toHaveValue(props.value)
    expect(inputText).toHaveAttribute('placeHolder', props.placeholder)
  });

  test("Textbox items have correct styles", () => {
    const { container, inputText } = setUp()
    expect(container).toHaveStyle(`
      display: flex;
      width: 100%;
      flex-direction: column;
      background: #ffffff;
      box-sizing: border-box;
    `);
    expect(inputText).toHaveStyle(`
      padding: 0.5rem 0.75rem;
      border: 1px solid #ced4da;
      font-size: 1rem;
    `)
  });

  test("TextBox should call onChange function on change event", () => {
    const spy = jest.spyOn(props, "onChange")
    const value = random.word()
    const { inputText } = setUp()

    fireEvent.change(inputText!, { target: { value } });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(value, props.name);
  });

  test("TextBox should call onChange on focus lost event", () => {
    const spy = jest.spyOn(props, "onChange")
    const { inputText } = setUp()

    fireEvent.blur(inputText!);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(props.value, props.name);
  });

  test("TextBox should display errors", () => {
    const { container, inputText } = setUp()
    fireEvent.blur(inputText!);
    const errorEl = container.querySelector('span')

    expect(container.childElementCount).toBe(3)
    expect(errorEl).toHaveTextContent(props.error)
    expect(inputText).toHaveStyle(`
      padding: 0.5rem 0.75rem;
      border: 1px solid red;
      font-size: 1rem;
    `)
    expect(errorEl).toHaveStyle(`
      color: red;
      font-size: 0.8rem;
    `)
  });

  test("TextBox should not display errors", () => {
    const componentProps = { ...props, value: 'Hello World'}
    const { container, inputText } = setUp(componentProps)
    fireEvent.blur(inputText!);

    expect(container.childElementCount).toBe(2)
    expect(inputText).toHaveStyle(`
      padding: 0.5rem 0.75rem;
      border: 1px solid #ced4da;
      font-size: 1rem;
    `)
  });
});
