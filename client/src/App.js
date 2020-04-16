import React, {Component} from 'react'
import {Segment, Grid, Statistic, Feed, Icon} from 'semantic-ui-react'

import './App.css';

class Keskustelu extends Component {
  render() {
    return (
      <div>
        <h1>Keskustelut</h1>
        <Feed>
          <Feed.Label>
            <Icon name='universal access' />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>Sami Kaarto</Feed.User> Epäilen laskelmia
              <Feed.Date>1 tunti sitten</Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>
              Olemme pitkään vaimon kanssa keskutellut pururadan kustannusarviosta,
              ja meidän mielestä laskelmat on pahasti alikanttiin.
            </Feed.Extra>
            <Feed.Meta>
              <Feed.Like>
                <Icon name='like' />4 puolesta
              </Feed.Like>
            </Feed.Meta>
          </Feed.Content>
          <Feed>
          </Feed>
        </Feed>
      </div>
    )
  }
}

const TilastoItem = (props) => {
  return (
    <Statistic>
      <Statistic.Value>{props.arvo}</Statistic.Value>
      <Statistic.Label>{props.otsikko}</Statistic.Label>
    </Statistic>
  )
}

class App extends Component  {
  render () {
    let ehdotukset = [ "Kierrätys on tärkeää",
                  "Kaupungille on saatava katuvalot",
                  "Lisää kuntopolkuja",
                  "Moottoritien päällysteet uusittava",
                  "Ylopistopaikat on tuplattava"];

    const ehdotusSegmentit = ehdotukset.map(ehdotus => {
      return (<Segment>{ehdotus}</Segment>)
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
