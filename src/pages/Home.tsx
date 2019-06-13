import * as React from 'react'
import Incident from '../components/Incident'

const Home: React.FC = () => {
  return (
    <div>
      <Incident title="Test incident" assignee={{ id: 'eddfg', name: 'barr' }} status="Resolved" />
      <Incident title="Another incident" assignee={{ id: 'eddfg', name: 'barr' }} status="Acknowledged" />
    </div>
  )
}

export default Home
