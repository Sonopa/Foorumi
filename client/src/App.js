/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// App.js Ohjelmarunko
/// Paul Kallio 16.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {Segment, Grid, Statistic, Menu} from 'semantic-ui-react'
import {Logger} from 'react-logger-lib'
import Keskustelu from './components/Keskustelu.js'
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

const TilastoItem = (props) => {
  return (
    <Statistic>
      <Statistic.Value>{props.arvo}</Statistic.Value>
      <Statistic.Label>{props.otsikko}</Statistic.Label>
    </Statistic>
  )
}

class Valikko extends Component {

  state = {}
  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  render () {
    const {activeItem} = this.state
    return (
      <Menu>
        <Menu.Item as={Link} to='foorumi' name='foorumi' active={activeItem==='foorumi'} onClick={this.handleItemClick}>Foorumi</Menu.Item>
        <Menu.Item as={Link} to='vaali' name='vaali' active={activeItem==='vaali'} onClick={this.handleItemClick}>Äänestys</Menu.Item>
        <Menu.Item as={Link} to='users' name='users' active={activeItem==='users'} onClick={this.handleItemClick}>Käyttäjät</Menu.Item>
        <Menu.Item as={Link} to='login' position="right" name='login' active={activeItem==='login'} onClick={this.handleItemClick}>Sisäänkirjaus</Menu.Item>
      </Menu>
    )
  }
}

const Foorumi = (props) => {
  Logger.of('App.Foorumi').info('props', props)

  return (
    <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column>
          <Segment.Group>
            {props.ehdotusSegmentit}
          </Segment.Group>
          <Segment stacked>
            <h2>Äänestystulos</h2>
          </Segment>
          <Statistic.Group>
            <TilastoItem arvo="25" otsikko="Puolesta"/>
            <TilastoItem arvo="25" otsikko="Vastaan"/>
            <TilastoItem arvo="10" otsikko="Tyhjiä"/>
          </Statistic.Group>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Keskustelu keskustelut={props.keskustelut}/>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
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
    return {aiheet: props.aiheet}
  }

  componentDidMount() {
  }

  render () {

  const ehdotusSegmentit = this.state.aiheet.map(ehdotus => {
    return (<Segment key={ehdotus.id}>{ehdotus.aihe}</Segment>)
  })

    Logger.of('App.render.props').info('state', this.state)
    return (
      <>
        <Segment raised>
          <h1>FOORUMI Mielipidesivusto</h1>
        </Segment>
        <Router>
          <Valikko />
          <Route exact path='/'/>
          <Route path='/foorumi'
            render={() => {
            return (
              <Foorumi ehdotusSegmentit={ehdotusSegmentit} keskustelut={this.props.keskustelut} />
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
