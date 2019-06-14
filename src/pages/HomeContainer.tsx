
// @ts-ignore
import { connect } from '../../lib/create-store'
import { IIncidentProps } from '../types/PropTypes'
import Home from './Home'

const mapStateToProps = (state: IIncidentProps[]) => ({ incidents: state })
export default connect(mapStateToProps)(Home)
