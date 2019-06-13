import { IIncidentProps, IncidentAction } from '../types/PropTypes'

const incidentReducer = (state: IIncidentProps[], action: IncidentAction) => {
  switch (action.type) {
    case 'ADD_INCIDENTS':
      return [...state, action.incident]
    default:
      return state
  }
}

export default incidentReducer
