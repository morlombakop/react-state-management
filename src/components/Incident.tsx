import * as React from 'react'
import styled from 'styled-components'
import { IIncidentProps } from '../types/PropTypes'

const IncidentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #d3d3d3;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  p {
    display: flex;
    padding: 0.5rem 1.25rem;
    margin: 0;
    &:first-child {
      padding: 0.75rem 1.25rem;
      text-transform: capitalize;
      border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
      background-color: rgba(0, 0, 0, 0.03);
      border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    }
    span:first-child {
      width: 15%;
      @media (max-width: 700px) {
        width: 30%;
      }
    }
  }
`

const Incident: React.FC<IIncidentProps> = ({ title, assignee, status }) => (
  <IncidentContainer data-testid="incident-container">
    <p>{title}</p>
    <p>
      <span>Assignee:</span>
      <span>{assignee}</span>
    </p>
    <p>
      <span>Status:</span>
      <span>{status}</span>
    </p>
  </IncidentContainer>
)

export default Incident
