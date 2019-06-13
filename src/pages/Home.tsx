import * as React from 'react'
import Incident from '../components/Incident'

const Home: React.FC = () => {
  return (
    <div className="wrapper">
      <Incident title="Test incident" assignee="Foo" status="Resolved" />
      <Incident
        title="Another incident"
        assignee="Bar"
        status="Acknowledged"
      />
    </div>
  )
}

export default Home
