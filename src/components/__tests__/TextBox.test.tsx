import { cleanup, render, fireEvent } from "@testing-library/react";
import "jest-dom/extend-expect";
import "jest-styled-components";
import * as React from "react";
import TextBox from "../TextBox";
import { random } from "faker";

afterEach(cleanup);

describe("Input textbox component tests", () => {
  const props = {
    onChange: (value: string, name: string) => {},
    placeholder: "Enter title",
    value: "",
    name: "title",
    label: "Textbox Title",
    error: "Title is required and must be at least 5 characters"
  };

  const { getByTestId } = render(<TextBox {...props} />);
  const InputTextbox = getByTestId("input-text-box");
  const InputTextboxChildren = InputTextbox.children;
  const inputEl = InputTextboxChildren.item(1);

  test("Input textbox rendered correctly", () => {
    expect(InputTextbox).toBeInstanceOf(HTMLLabelElement);
    expect(InputTextbox.childElementCount).toBe(3);
    expect(InputTextboxChildren.item(0)).toHaveTextContent("Textbox Title");
    expect(inputEl).toBeInstanceOf(HTMLInputElement);
    expect(InputTextboxChildren.item(2)).toHaveTextContent(
      "Title is required and must be at least 5 characters"
    );
  });

  test("Input textbox styles rendered correctly", () => {
    expect(InputTextbox).toHaveStyle(`
      display: flex;
      width: 100%;
      flex-direction: column;
      background: #ffffff;
      box-sizing: border-box;
    `);
    expect(InputTextboxChildren.item(1)).toHaveStyle(`
      padding: 0.5rem 0.75rem;
      border: 1px solid red;
      border-radius: 0.25rem;
      font-size: 1rem;
    `);
    expect(InputTextboxChildren.item(2)).toHaveStyle(`
      color: red;
    `);
  });

  test("Onchange is called appropriate param when input value change", () => {
    const spy = jest.spyOn(props, "onChange");
    const value = random.word();
    fireEvent.change(inputEl!, { target: { value } });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(value, props.name);
  });

  test("Onchange is called appropriate param when input value change", () => {
    const spy = jest.spyOn(props, "onChange");
    // const value = random.word()
    fireEvent.focusOut(inputEl!);
    expect(spy).not.toHaveBeenCalled();
  });
});
