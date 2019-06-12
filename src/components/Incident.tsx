import * as React from 'react'
import { IIncidentProps } from '../types/PropTypes';

const Incident: React.FC<IIncidentProps> = ({ title, assignee, status }) => (
  <div style={{ border: '1px solid black' }}>
    <p>{title}</p>
    <p>Assignee: {assignee.name}</p>
    <p>Status: {status}</p>
  </div>
)

export default Incident
