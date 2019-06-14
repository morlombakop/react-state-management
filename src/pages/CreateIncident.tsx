import * as React from 'react'
import styled from 'styled-components'
import SelectOption from '../components/SelectOption'
import TextBox from '../components/TextBox'
import { IIncidentProps, ICreateIncident } from '../types/PropTypes'
import { incidentStatuses, assignees } from '../config/fixtures'

const Fieldset = styled.fieldset`
  padding: 0 15px;
  border-width: 0;
  & > * {
    margin: 15px 0;
  }
  input[type='submit'] {
    float: right;
    color: #fff;
    background-color: #95a5a6;
    border-color: transparent;
    line-height: 1.5;
    border-radius: 0.25rem;
    padding: 0.4rem 0.75rem;
    font-size: 1rem;
    cursor: not-allowed;
    &:not(:disabled) {
      cursor: pointer;
      background-color: #18bc9c;
    }
  }
`
class CreateIncident extends React.PureComponent<ICreateIncident, IIncidentProps> {
  readonly state: IIncidentProps = {
    title: '',
    assignee: '',
    status: '',
  }

  handleInputChange = (inputValue: string, inputName: string) => {
    this.setState(state => ({
      ...state,
      [inputName]: inputValue,
    }))
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    this.props.dispatchCreateIncident(this.state)
    this.props.history.push('/')
  }

  isValid = () => this.state.title && this.state.assignee && this.state.status

  render() {
    return (
      <form className="wrapper" data-testid="create-incident-form" onSubmit={this.handleSubmit}>
        <Fieldset>
          <h1>Create New Incident</h1>
          <TextBox
            onChange={this.handleInputChange}
            placeholder="Enter incident title"
            value={this.state.title}
            name="title"
            label="Title"
            error="Title is required and must be at least 5 characters"
          />
          <SelectOption
            onChange={this.handleInputChange}
            value={this.state.assignee}
            name="assignee"
            label="Assignee"
            error="Title is required"
            options={assignees}
          />
          <SelectOption
            onChange={this.handleInputChange}
            value={this.state.status}
            name="status"
            label="Status"
            error="Title is required "
            options={incidentStatuses}
          />
          <input value="Create" disabled={!this.isValid()} type="submit" title="Create Incident" />
        </Fieldset>
      </form>
    )
  }
}

export default CreateIncident
