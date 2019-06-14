import { withRouter } from 'react-router-dom'
import CreateIncident from './CreateIncident'
// @ts-ignore
import { connect } from '../../lib/create-store'
import { IIncidentProps, IncidentAction } from '../types/PropTypes';

const mapDispatchToProps = (dispatch: React.Dispatch<IncidentAction>) => ({
  dispatchCreateIncident: (incident: IIncidentProps) =>
    dispatch({ incident, type: 'ADD_INCIDENTS' }),
})

export default connect(
  null,
  mapDispatchToProps
)(withRouter(CreateIncident))