/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// App.js Ohjelmarunko
/// Paul Kallio 16.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Segment, Grid, Statistic} from 'semantic-ui-react'
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

class App extends Component  {

  constructor(props) {
    super(props)
    this.state = {
      list:  [ "Kierrätys on tärkeää",
                    "Kaupungille on saatava katuvalot",
                    "Lisää kuntopolkuja",
                    "Moottoritien päällysteet uusittava",
                    "Ylopistopaikat on tuplattava"]
    }
  }

  render () {
    const ehdotusSegmentit = this.state.list.map(ehdotus => {
      return (<Segment key={ehdotus}>{ehdotus}</Segment>)
    })

    return (
      <>
        <Segment raised>
          <h1>FOORUMI Mielipidesivusto</h1>
        </Segment>
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
                <Keskustelu />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    )
  }
}

export default App;
