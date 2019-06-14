import * as React from 'react'
import { random } from 'faker'
import Incident from '../components/Incident'
import { IHome } from '../types/PropTypes'

const Home: React.FC<IHome> = ({ incidents }) => (
  <div className="wrapper">
    {incidents.map(incident => (
      <Incident
        key={random.uuid()}
        title={incident.title}
        assignee={incident.assignee}
        status={incident.status}
      />
    ))}
  </div>
)

export default Home;
