import * as React from 'react'
import { ISelectOptionProps } from '../types/PropTypes';

const SelectOption: React.FC<ISelectOptionProps> = ({ title, assignee, status }) => (
  <div style={{ border: '1px solid black' }}>
    <p>{title}</p>
    <p>Assignee: {assignee.name}</p>
    <p>Status: {status}</p>
  </div>
)

export default SelectOption
