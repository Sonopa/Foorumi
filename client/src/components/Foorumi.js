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

class Foorumi extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentItem: "1"
    }
  }

  handleItemClick = (e, {name}) => this.setState({currentItem:name})

  render() {

    const ehdotusSegmentit = this.props.aiheet.map(ehdotus => {
      Logger.of('Foorumi.render').info('ehdotus', ehdotus)
      return (<AiheRivi key={ ehdotus.id}
                        id={ehdotus.id}
                        title={ehdotus.title}
                        currentItem={this.state.currentItem}
                        handleItem={this.handleItemClick}/>)
    })

    return (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Menu vertical fluid>
              {ehdotusSegmentit}
            </Menu>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Keskustelu keskustelut={this.props.keskustelut}/>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Foorumi
