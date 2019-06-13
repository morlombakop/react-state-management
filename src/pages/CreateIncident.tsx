import * as React from 'react'
import { IIncidentProps } from '../types/PropTypes';
import { incidentStatuses, assignees } from '../config/fixtures'

class CreateIncident extends React.PureComponent<{}, IIncidentProps> {
  readonly state: IIncidentProps = {
    title: '',
    assignee: '',
    status: '',
  }

  handleInputChange = (inputValue: string, inputName: string ) => {
    this.setState(state => ({
      ...state,
      [inputName]: inputValue
    }))
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('Form Submitted .....')
  }


  render() {
    return <form className="wrapper" data-testid="create-incident-form" onSubmit={this.handleSubmit}>
      <fieldset>Create New Incident</fieldset>
    </form>
  }
}

export default CreateIncident