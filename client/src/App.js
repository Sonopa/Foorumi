/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// App.js Ohjelmarunko
/// Paul Kallio 16.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Segment} from 'semantic-ui-react'
import Foorumi from './components/Foorumi'
import Valikko from './components/Valikko'
import Etusivu from './components/Etusivu'
import Vaali from './components/Vaali'
import Users from './components/Users'
import Login, {Logout} from './components/Login'

const logger = require('simple-console-logger').getLogger('App')

class App extends Component  {

  constructor(props) {
    super(props)
    this.state = {
      aihe: ''
    }
  }

  render () {
    const setAihe = (aihe) => {
      logger.info('render.setAihe.aihe:', aihe)
      this.setState({aihe: aihe})
    }

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
                <Foorumi setAihe={setAihe} />
            )}} />
          <Route path='/vaali'
            render={() => {
             logger.info('Route.vaali.state.aihe:', this.state.aihe)
              return (
                <Vaali aihe={this.state.aihe} />
            )}} />
          <Route path='/users' component={Users} />
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
        </Router>
      </>
    )
  }
}

export default App;
