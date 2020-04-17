/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Foorumi -komponentti
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React from 'react'
import {Segment, Grid, Statistic} from 'semantic-ui-react'
import {Logger} from 'react-logger-lib'
import Keskustelu from './Keskustelu.js'

const TilastoItem = (props) => {
  return (
    <Statistic>
      <Statistic.Value>{props.arvo}</Statistic.Value>
      <Statistic.Label>{props.otsikko}</Statistic.Label>
    </Statistic>
  )
}

const Foorumi = (props) => {
  Logger.of('App.Foorumi').info('props', props)

  const ehdotusSegmentit = props.aiheet.map(ehdotus => {
    return (<Segment key={ehdotus.id}>{ehdotus.title}</Segment>)
  })

  return (
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
            <Keskustelu keskustelut={props.keskustelut}/>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default Foorumi
