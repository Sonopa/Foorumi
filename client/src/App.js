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
import Foorumi from './components/Foorumi.js'
import Valikko from './components/Valikko.js'
import './App.css';

const Login = () => {
  return (
    <Segment raised>
      <h1>Anna käyttäjätiedot</h1>
    </Segment>
  )
}

const Vaali = () => {
  return (
    <Segment raised>
      <h1>Äänestyspaikka</h1>
    </Segment>
  )
}

const Users = () => {
  return (
    <Segment raised>
      <h1>Käyttäjien hallinnointi</h1>
    </Segment>
  )
}

class App extends Component  {

  constructor(props) {
    super(props)
    this.state = {
      aiheet:  []
    }
  }

  static getDerivedStateFromProps(props, state) {
    Logger.of('App.getDerivedStateFromProps.props').info('props', props)
    Logger.of('App.getDerivedStateFromProps.props').info('state', state)
    // return {aiheet: props.aiheet}
  }

  componentDidMount() {
    foorumiData.getAll()
      .then(responseData => {
        Logger.of('App.componentDidMount').warn('responseData', responseData)
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
          <Route exact
          ath='/'/>
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
