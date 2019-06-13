import * as React from 'react'
import Incident from '../components/Incident'

const Home: React.FC = () => {
  return (
    <div className="wrapper">
      <div className="content">
        <Incident
          title="Test incident"
          assignee={{ id: 'eddfg', name: 'barr' }}
          status="Resolved"
        />
        <Incident
          title="Another incident"
          assignee={{ id: 'eddfg', name: 'barr' }}
          status="Acknowledged"
        />
      </div>
    </div>
  )
}

export default Home
