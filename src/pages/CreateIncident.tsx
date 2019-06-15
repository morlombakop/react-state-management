import * as React from 'react'
import styled from 'styled-components'
import SelectOption from '../components/SelectOption'
import TextBox from '../components/TextBox'
import { assignees, incidentStatuses } from '../config/fixtures'
import { ICreateIncident, IIncidentProps } from '../types/PropTypes'

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
    line-height: 1.5rem;
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

  handleSubmit = (event: React.FormEvent<HTMLFormElement | HTMLInputElement>) => {
    event.preventDefault()
    if (this.state.title.length > 4 && this.state.assignee && this.state.status) {
      this.props.dispatchCreateIncident(this.state)
      this.props.history.push('/')
    }
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
            error="Assignee is required"
            options={assignees}
          />
          <SelectOption
            onChange={this.handleInputChange}
            value={this.state.status}
            name="status"
            label="Status"
            error="Status is required "
            options={incidentStatuses}
          />
          <input
            name="btnCreateIncident"
            value="Create"
            disabled={!this.isValid()}
            type="submit"
            title="Create Incident"
          />
        </Fieldset>
      </form>
    )
  }
}

export default CreateIncident
