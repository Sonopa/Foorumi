/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Tilasto -komponentti näyttää Äänestys tuloksen
/// Paul Kallio 4.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React from 'react'
import {Segment, Statistic, Grid, Button, Icon} from 'semantic-ui-react'
// const logger = require('simple-console-logger').getLogger('PuolestaVastaan')

/// Aihe TilastoItem
const TilastoItem = (props) => {
  return (
    <Statistic>
      <Statistic.Value>{props.arvo}</Statistic.Value>
      <Statistic.Label>{props.otsikko}</Statistic.Label>
    </Statistic>
  )
}

const PuolestaVastaan = (props) => (
  <Grid columns={2} padded grid>
    <Grid.Row>
      <Grid.Column>
        <Segment>
          <Grid columns={3}>
            <Grid.Column>
            </Grid.Column>
            <Grid.Column>
            <Statistic.Group>
            <TilastoItem arvo="" otsikko=""/>
              <TilastoItem arvo={props.puolesta} otsikko="Puolesta"/>
            </Statistic.Group>
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment>
          <Grid columns={3}>
            <Grid.Column>
            </Grid.Column>
            <Grid.Column>
              <Statistic.Group>
                <TilastoItem arvo="" otsikko=""/>
                <TilastoItem arvo={props.vastaan} otsikko="Vastaan"/>
              </Statistic.Group>
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid>
        </Segment>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>
        <Button basic color='teal' size='massive'>
          <Grid>
            <Grid.Column width={1}>
              <Icon name='heart' outlined />
            </Grid.Column>
            <Grid.Column width={2}>
              <p>PUOLESTA</p>
            </Grid.Column>
          </Grid>
        </Button>
      </Grid.Column>
      <Grid.Column>
        <Button basic color='red' size='massive'>
          <Grid>
            <Grid.Column width={1}>
              <Icon name='heartbeat' outlined />
            </Grid.Column>
            <Grid.Column width={2}>
              <p>VASTAAN</p>
            </Grid.Column>
          </Grid>
        </Button>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

/// Tilasto komponentti
const Tilasto = (props) => {
  const puolesta =  props.aihe ? props.aihe.votesFor: 0
  const vastaan =   props.aihe ? props.aihe.votesAgainst: 0

  return (
      <>
      <Segment stacked>
        <h2>Äänestystulos</h2>
      </Segment>
    <Segment>
      <PuolestaVastaan puolesta={puolesta} vastaan={vastaan}/>
    </Segment>
    </>
  )
}

export default Tilasto
