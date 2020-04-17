/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// App.js Ohjelmarunko
/// Paul Kallio 16.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Segment, Grid, Statistic, Menu} from 'semantic-ui-react'
import {Logger} from 'react-logger-lib'
import Keskustelu from './components/Keskustelu.js'
import './App.css';

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
        <Menu.Item name='foorumi' active={activeItem==='foorumi'} onClick={this.handleItemClick}>Foorumi</Menu.Item>
        <Menu.Item name='vaali' active={activeItem==='vaali'} onClick={this.handleItemClick}>Äänestys</Menu.Item>
        <Menu.Item name='users' active={activeItem==='users'} onClick={this.handleItemClick}>Käyttäjät</Menu.Item>
        <Menu.Item position="right" name='login' active={activeItem==='login'} onClick={this.handleItemClick}>Sisäänkirjaus</Menu.Item>
      </Menu>
    )
  }
}

class App extends Component  {

  constructor(props) {
    super(props)
    this.state = {
      aiheet:  []
    }
  }

  static getDerivedStateFromProps(props, state) {
    Logger.of('App.getDerivedStateFromProps.props').warn('props', props)
    Logger.of('App.getDerivedStateFromProps.props').info('state', state)
    return {aiheet: props.aiheet}
  }

  componentDidMount() {
  }

  render () {

    Logger.of('App.render.props').warn('state', this.state)
    const ehdotusSegmentit = this.state.aiheet.map(ehdotus => {
      return (<Segment key={ehdotus.id}>{ehdotus.aihe}</Segment>)
    })

    return (
      <>
        <Segment raised>
          <h1>FOORUMI Mielipidesivusto</h1>
        </Segment>
        <Valikko />
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <Segment.Group>
                {ehdotusSegmentit}
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
                <Keskustelu keskustelut={this.props.keskustelut}/>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    )
  }
}

export default App;
