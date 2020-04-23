/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Foorumi -komponentti
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Segment, Grid, Menu, Button, Form, TextArea, Divider} from 'semantic-ui-react'
import foorumiData from '../services/foorumi'

import Keskustelut from './Keskustelut'

const logger = require('simple-console-logger').getLogger('Foorumi')

const Aihe = (props) => {
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
              <Keskustelut aihe={props.currentItem}/>
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
      currentItem: this.state ? this.state.currentItem : this.props.aihe,
      uusiAihe:  this.state ? this.state.uusiAihe : '',
      kuvaus:  this.state ? this.state.kuvaus : '',
      omistaja: '1',
      lisaaTila: this.state ? this.state.lisaaTila : false
    }
    logger.trace('constructor.currentItem', this.state.currentItem)
  }

  componentWillMount() {
    if(this.state.currentItem !== this.props.aihe) {
      logger.trace('componentWillMount.aihe:', this.props.aihe)
      this.setState({currentItem: this.props.aihe, lisaaTila: false})
    }
    return true;
  }

  componentDidUpdate() {
     if(this.state.currentItem !== this.props.aihe) {
       logger.trace('componentDidUpdate.state.aihe:', this.state.currentItem)
       logger.trace('componentDidUpdate.props.aihe:', this.props.aihe)
       if(!this.state.currentItem) {
         this.setState({currentItem: this.props.aihe,  otsikko: '', kommentti: '', lisaaTila: false})
       }
     }
  }

  handleItemClick = (e, {name}) => {

    logger.trace('handleItemClick.currentItem/ehdotus:', this.state.currentItem, name)
    this.setState((state) => { return {currentItem:name}})
  }

  render() {

    const handleAdd = (e, {name}) => this.setState({lisaaTila: true})
    const handleSave = (e, {name}) => {
      const newAihe = {
          owner:        this.state.omistaja,
          title:        this.state.uusiAihe,
          description:  this.state.kuvaus
      }
      foorumiData.create(newAihe)
        .then(responseData => {
          logger.info('handleSave.responseData:', responseData)
          this.setState({lisaaTila: false, uusiAihe: '', kuvaus: ''})
        })
      return null;
    }

    const ehdotusSegmentit = this.props.aiheet.map(ehdotus => {
      return (<Aihe key={ ehdotus.id}
                        id={ehdotus.id}
                        title={ehdotus.title}
                        currentItem={this.state.currentItem}
                        handleItem={this.handleItemClick}/>)
    })

    return (
      <Segment>
        <FoorumiRivit ehdotusSegmentit={ehdotusSegmentit} currentItem={this.state.currentItem} />
        <Divider horizontal hidden />
        {this.state.lisaaTila  ?
          <Form>
            <Form.Input label='Aihe' name='aihe' type='input'
                         onChange={(e) => this.setState({uusiAihe: e.target.value})} value={this.state.uusiAihe} />
            <div className='field'>
              <label>Kuvaus</label>
              <TextArea name='kuvaus'
                         onChange={(e) => this.setState({kuvaus: e.target.value})} value={this.state.kuvaus} />
            </div>
            <Divider horizontal hidden />
            <Button onClick={handleSave} primary>Tallenna</Button>
          </Form>
          :
          <Button onClick={handleAdd} primary>Lisää</Button>
        }
      </Segment>
    )
  }
}

export default Foorumi
