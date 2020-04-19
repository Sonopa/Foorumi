/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Foorumi -komponentti
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Segment, Grid, Menu} from 'semantic-ui-react'
import {Logger} from 'react-logger-lib'
import Keskustelu from './Keskustelu.js'

const AiheRivi = (props) => {
  return (
    <Menu.Item
      name={props.id}
      active={props.currentItem===props.id}
      onClick={props.handleItem}
      >
      {props.title}
    </Menu.Item>
  )
}

const FoorumiRivit = (props) => {
  return (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Menu vertical fluid>
              {props.ehdotusSegmentit}
            </Menu>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Keskustelu aihe={props.currentItem}/>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  )
}

class Foorumi extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentItem: this.state ? this.state.currentItem : '1'
    }
  }

  handleItemClick = (e, {name}) => {

    Logger.of('Foorumi.handleItemClick').info('this.state.currentItem', this.state.currentItem)
    Logger.of('Foorumi.handleItemClick').info('ehdotus', name)
    this.setState((state) => { return {currentItem:name}})

  }

  render() {

    Logger.of('Foorumi.render').info('currentItem', this.state.currentItem)
    const ehdotusSegmentit = this.props.aiheet.map(ehdotus => {
      return (<AiheRivi key={ ehdotus.id}
                        id={ehdotus.id}
                        title={ehdotus.title}
                        currentItem={this.state.currentItem}
                        handleItem={this.handleItemClick}/>)
    })

    return (
      <FoorumiRivit ehdotusSegmentit={ehdotusSegmentit} currentItem={this.state.currentItem} />
    )
  }
}

export default Foorumi
