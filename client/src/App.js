/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// App.js Ohjelmarunko
/// Paul Kallio 16.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Segment} from 'semantic-ui-react'
import {Logger} from 'react-logger-lib'
import foorumiData from './services/foorumi.js'
import Foorumi from './components/Foorumi'
import Valikko from './components/Valikko'
import Etusivu from './components/Etusivu'
import Vaali from './components/Vaali'
import Users from './components/Users'
import Login from './components/Login'

class App extends Component  {

  constructor(props) {
    super(props)
    this.state = {
      aiheet:  []
    }
  }

  componentDidMount() {
    foorumiData.getAll()
      .then(responseData => {
        Logger.of('App.componentDidMount').info('responseData', responseData)
        this.setState({aiheet: responseData})
      })
  }

  render () {

    Logger.of('App.render.props').info('state', this.state)
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
              <Foorumi aiheet={this.state.aiheet} keskustelut={this.props.keskustelut} />
            )}} />
          <Route path='/vaali' component={Vaali} />
          <Route path='/users' component={Users} />
          <Route path='/login' component={Login} />
        </Router>
      </>
    )
  }
}

export default App;
