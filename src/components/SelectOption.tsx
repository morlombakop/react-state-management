import * as React from 'react'
import { ISelectOptionProps } from '../types/PropTypes';

const SelectOption: React.FC<ISelectOptionProps> = ({ onChange, value, name, label, error, options }) => (
  <select>
    <option>Hello</option>
    <option>Hello 1</option>
    <option>Hello 2</option>
  </select>
)

export default SelectOption
