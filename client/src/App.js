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
import {loadAiheet} from './actions/aiheetAction'
import {loadUsers} from './actions/usersAction'
import {setCurrentAihe} from './reducers/aiheReducer'
import {setCurrentUser} from './reducers/userReducer'
import {getUser} from './tools/session'
import foorumiData from './services/foorumi'
import usersData from './services/users'

const logger = require('simple-console-logger').getLogger('App')

class App extends Component  {

  componentDidMount() {

    usersData.getAll()
      .then(usersList => {
        logger.info('constructor.usersList.getAll', usersList)
        this.props.loadUsers(usersList)
        this.props.setCurrentUser(getUser())
      })

    foorumiData.getAll()
      .then(aiheetList => {
        logger.info('constructor.loadAiheet.getAll', aiheetList, typeof aiheetList)
        logger.info('constructor.loadAiheet.getAll', aiheetList[0], typeof aiheetList[0])
        this.props.setCurrentAihe(aiheetList[0])
        this.props.loadAiheet(aiheetList)
      })
  }

  render () {
    return (
      <>
        <Segment raised>
          <h1>FOORUMI Mielipidesivusto</h1>
        </Segment>
        <Router>
          <Valikko />
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
/* const mapStateToProps = state => {
  return {
    username: state.username
  }
} */

const mapDispatchToProps = {
  loadAiheet,
  setCurrentAihe,
  setCurrentUser,
  loadUsers
}
export default withRouter(connect(null, mapDispatchToProps)(App))
