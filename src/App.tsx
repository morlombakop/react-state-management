import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CreateIncident from './pages/CreateIncident'
import Home from './pages/Home'
import  Header from './components/Header'

const App: React.FC = () => (
  <Router>
    <React.Fragment>
      <Header />
      <React.Fragment>
        <Route exact={true} path="/" component={Home} />
        <Route path="/create" component={CreateIncident} />
      </React.Fragment>
    </React.Fragment>
  </Router>
)

export default App
