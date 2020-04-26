/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Login -komponentti
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React from 'react'
import {Segment, Statistic} from 'semantic-ui-react'

const TilastoItem = (props) => {
  return (
    <Statistic>
      <Statistic.Value>{props.arvo}</Statistic.Value>
      <Statistic.Label>{props.otsikko}</Statistic.Label>
    </Statistic>
  )
}

const Vaali = () => {
  return (
    <>
      <Segment raised>
        <h1>Äänestyspaikka</h1>
      </Segment>
      <Segment>
        <Segment stacked>
          <h2>Äänestystulos</h2>
        </Segment>
        <Statistic.Group>
          <TilastoItem arvo="25" otsikko="Puolesta"/>
          <TilastoItem arvo="25" otsikko="Vastaan"/>
          <TilastoItem arvo="10" otsikko="Tyhjiä"/>
        </Statistic.Group>
      </Segment>
    </>
  )
}

export default Vaali
