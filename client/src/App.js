import React, {Component} from 'react'
import {Segment, Grid, Statistic} from 'semantic-ui-react'

import './App.css';

class Car {
  constructor(brand) {
    this.brand = brand
  }

  present () {
    return `My car is ${this.brand}.`
  }
}

class Model extends Car {
  constructor(brand, model) {
    super(brand)
    this.model = model
  }

  show() {
    return `${this.present()} It's model is ${this.model}.`
  }
}

class Garage extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.brand.show()}
        </h1>
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
    let myCar = [];
    myCar[0] = new Model('Fiat', 'Ducato')
    myCar[1] = new Model('Fiat', 'Spider')
    myCar[2] = new Model('Fiat', 'Toro')
    myCar[3] = new Model('Fiat', 'Mobi')
    myCar[4] = new Model('Fiat', 'Argo')
    myCar[5] = new Model('Fiat', 'Cronos')

    const carSegments = myCar.slice(1).map(car => {
      return (<Segment>{car.show()}</Segment>)
    })

    return (
      <>
        <Segment raised>
          <h1>Hello I'm Paul! {myCar[0].show()}</h1>
        </Segment>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <Segment.Group>
                {carSegments}
              </Segment.Group>
              <Segment>
                <Garage brand={new Model('Fiat', 'Panda')} />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment stacked>
                <h2>Äänestystulos</h2>
              </Segment>
              <Statistic.Group>
                <TilastoItem arvo="25" otsikko="Puolesta"/>
                <TilastoItem arvo="25" otsikko="Vastaan"/>
                <TilastoItem arvo="10" otsikko="Tyhjiä"/>
              </Statistic.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    )
  }
}

export default App;
