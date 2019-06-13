import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// @ts-ignore
import createStore, { StoreProvider } from '../lib/create-store'
import incidentReducer from './reducers/IncidentReducer'
import { incidents } from './config/fixtures'
import CreateIncident from './pages/CreateIncident'
import Home from './pages/Home'
import Header from './components/Header'

const App: React.FC = () => {
  const { state, dispatch } = createStore(incidentReducer, incidents)

  return (
    <Router>
      <React.Fragment>
        <Header />
        <StoreProvider value={{ state, dispatch }}>
          <Route exact={true} path="/" component={Home} />
          <Route path="/create" component={CreateIncident} />
        </StoreProvider>
      </React.Fragment>
    </Router>
  )
}

export default App
