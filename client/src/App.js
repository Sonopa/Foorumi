/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// App.js Ohjelmarunko
/// Paul Kallio 16.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Segment} from 'semantic-ui-react'
import Foorumi from './components/Foorumi'
import Valikko from './components/Valikko'
import Etusivu from './components/Etusivu'
import Vaali from './components/Vaali'
import Users from './components/Users'
import Login, {Logout} from './components/Login'
import {loadAiheet} from './reducers/aiheetReducer'
import {setCurrentAihe} from './reducers/aiheReducer'
import {setCurrentUser} from './reducers/userReducer'
import {getUser} from './tools/session'
import foorumiData from './services/foorumi'

const logger = require('simple-console-logger').getLogger('App')

class App extends Component  {

  componentDidMount() {
    foorumiData.getAll()
      .then(aiheetList => {
        logger.info('constructor.loadAiheet.getAll', aiheetList, typeof aiheetList)
        if(aiheetList && aiheetList.length > 0) {
          logger.info('constructor.loadAiheet.getAll', aiheetList[0], typeof aiheetList[0])
          this.props.setCurrentAihe(aiheetList[0])
          this.props.loadAiheet(aiheetList)
          this.props.setCurrentUser(getUser())
        }
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
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
        </Router>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    aiheet: state.aiheet,
    aihe: state.aihe
  }
}

const mapDispatchToProps = {
  loadAiheet,
  setCurrentAihe,
  setCurrentUser
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
