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

class AiheLomake extends Component {

  constructor(props) {
    super(props)
    this.state = {
      uusiAihe:   this.state ? this.state.uusiAihe : '',
      kuvaus:     this.state ? this.state.kuvaus : '',
      lisaaTila:  this.state ? this.state.lisaaTila : false
    }
    logger.trace('AiheLomake.constructor.currentItem', this.state.currentItem)
  }

  componentDidUpdate() {
     if(this.props.aiheVaihtuu) {
       logger.trace('AiheLomake.componentDidUpdate.props.aihe:', this.props.aiheVaihtuu)
       if(this.state.lisaaTila) {
         this.setState({uusiAihe: '', kuvaus: '', lisaaTila: false})
       }
       this.props.resetAiheVaihtuu()
     }
  }

  render() {
     logger.trace('AiheLomake.render.props.aiheVaihtuu:', this.props.aiheVaihtuu)
      const handleAdd = (e, {name}) => this.setState({lisaaTila: true})
      const handleRestore = (e, {name}) =>
          this.setState({uusiAihe: '', kuvaus: '', lisaaTila: false})
      const handleSave = (e, {name}) => {
        const newAihe = {
            owner:        this.props.omistaja,
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

      return (
        this.state.lisaaTila  ?
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
              <Button onClick={handleRestore} secondary>Peruuta</Button>
            </Form>
          :
          <Button onClick={handleAdd} primary>Lisää</Button>
        )
      }
  }

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
            <Segment>
            <h1>Aiheet</h1>
            <Menu vertical fluid>
              {props.ehdotusSegmentit}
            </Menu>
            <Divider horizontal hidden />
            <AiheLomake omistaja={props.omistaja} aiheVaihtuu={props.aiheVaihtuu} resetAiheVaihtuu={props.resetAiheVaihtuu}/>
            </Segment>
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
    logger.info('constructor.props:', this.props)

    this.state = {
      currentItem: this.props.aihe,
      omistaja: '1',
      aiheVaihtuu: this.state ? this.state.aiheVaihtuu : false
    }
  }

  componentDidMount() {
     logger.trace('componentDidMount.props.aihe:', this.props.aihe)
     this.setState({currentItem: this.props.aihe, aiheVaihtuu: true})
     return true
  }

  componentDidUpdate(prevProps, prevState) {
     if(this.state.currentItem !== prevState.currentItem) {
       logger.trace('componentDidUpdate.state.aihe:', this.state.currentItem)
       logger.trace('componentDidUpdate.props.aihe:', this.props.aihe)
       this.setState({aiheVaihtuu: true})
     }
  }

  handleItemClick = (e, {name}) => {

    this.setState((state) => { return {currentItem:name}})
    logger.trace('handleItemClick.currentItem/ehdotus:', this.state.currentItem, name)
  }

  render() {

    const resetAiheVaihtuu = () => {

      logger.trace('Foorumi.resetAiheVaihtuu.aiheVaihtuu:', this.state.aiheVaihtuu)
      this.setState({aiheVaihtuu: false})
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
        <FoorumiRivit ehdotusSegmentit={ehdotusSegmentit}
                      currentItem={this.state.currentItem}
                      omistaja='1'
                      aiheVaihtuu={this.state.aiheVaihtuu}
                      resetAiheVaihtuu={resetAiheVaihtuu}
        />
      </Segment>
    )
  }
}

export default Foorumi
