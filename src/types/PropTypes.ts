import { RouteComponentProps } from 'react-router'

export interface BaseInputProps {
  onChange: (value: string, name: string) => void
  name: string
  label: string
  error: string
}

export interface ITextBoxPops extends BaseInputProps {
  placeholder: string
  value: string
}

export interface ISelectOptionProps extends BaseInputProps {
  options: string[]
  value: string
}

export interface IIncidentProps {
  title: string
  assignee: string
  status: string
}

export interface IHome {
  incidents: IIncidentProps[]
}

export type IncidentAction = {
  type: 'ADD_INCIDENTS'
  incident: IIncidentProps
}

export interface ICreateIncident extends RouteComponentProps {
  dispatchCreateIncident: (incident: IIncidentProps) => React.Dispatch<IncidentAction>
}
