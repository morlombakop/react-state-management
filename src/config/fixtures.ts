import { name, random } from 'faker'
import { IIncidentProps } from '../types/PropTypes';

// this should be an array key value pair to ease the internationalization
export const incidentStatuses: string[] = [
  'New',
  'Resolved',
  'Pending Clarification',
  'In Progress',
  'Acknowledged'
]

// Mock an array of 5 employees
export const assignees = Array.from<string, string>(
  { length: 5 },
  () => `${name.firstName()} ${name.lastName()}`
)

export const incidents = Array.from<string, IIncidentProps>({ length: 5 }, () => ({
  title: random.word(),
  assignee: assignees[random.number(4)],
  status: incidentStatuses[random.number(4)],
}))
