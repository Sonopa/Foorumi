/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// App.js Ohjelmarunko
/// Paul Kallio 16.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Segment} from 'semantic-ui-react'
import Foorumi from './components/Foorumi'
import Valikko from './components/Valikko'
import Etusivu from './components/Etusivu'
import Vaali from './components/Vaali'
import Users from './components/Users'
import Login, {Logout} from './components/Login'
import {loadAiheetMWare} from './actions/aiheetAction'
import {loadUsersMWare} from './actions/usersAction'
import {setCurrentUser} from './actions/userAction'
import {getUser} from './tools/session'

const logger = require('simple-console-logger').getLogger('App')

/// App -React käyttöliittymä
class App extends Component  {

  isLive = true

  componentWillUnmount() {
    this.isLive = false
  }

  componentDidMount() {
    if(this.isLive) {
      logger.trace('componentDidMount')
      this.props.setCurrentUser(getUser())
      this.props.loadAiheetMWare()
      this.props.loadAiheetMWare()
    }
  }

  render () {
    return (
      <>
        <Segment raised>
          <h1>FOORUMI Mielipidesivusto</h1>
        </Segment>
        <Router>
          <Valikko/>
			    <Switch>
            <Route exact path='/' component={Etusivu}/>
            <Route path='/foorumi'
              render={() => {
                return (
                  <Foorumi />
              )}} />
            <Route path='/vaali'
              render={() => {
                return (
                  <Vaali />
              )}} />
            <Route path='/users' component={Users} />
            <Route path='/logout' component={Logout} />
            <Route path='/login' component={Login} />
			    </Switch>
        </Router>
      </>
    )
  }
}
/// App -aloitus komponentti - Redux Tilankäsittely
const mapDispatchToProps = {
  loadAiheetMWare,
  loadUsersMWare,
  setCurrentUser
}
export default withRouter(connect(null, mapDispatchToProps)(App))
