/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Foorumi -komponentti
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Segment, Grid, Menu, Button, Form, TextArea, Divider} from 'semantic-ui-react'
import foorumiData from '../services/foorumi'
import {isLoggedIn} from '../services/session'
import Huomio, {messageTypes, messageTime} from './Huomio'
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

    const handleAdd = (event, {name}) => {
      event.preventDefault()
      this.setState({lisaaTila: true})
    }

    const handleRestore = (event, {name}) => {
      event.preventDefault()
      this.setState({uusiAihe: '', kuvaus: '', lisaaTila: false})
    }

    const handleSave = (event, {name}) => {
      event.preventDefault()
      const newAihe = {
          owner:        this.props.omistaja,
          title:        this.state.uusiAihe,
          description:  this.state.kuvaus
      }
      foorumiData.create(newAihe)
        .then(responseData => {
          logger.info('handleSave.create:', responseData)
          this.setState({lisaaTila: false, uusiAihe: '', kuvaus: ''})
          this.props.setMessage(responseData.message, messageTypes.INFO)
        })
        .catch(exception => {
          logger.info('handleSave.catch:', exception)
          this.props.setMessage(exception.message, messageTypes.WARNING)
        })
        .finally(() => {
          setTimeout(() => {
            this.props.setMessage('', messageTypes.CLOSE)
        }, messageTime.NORMAL)
      })
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
      name={props.id + ''}
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
            {isLoggedIn()
            ? <AiheLomake omistaja={props.omistaja} aiheVaihtuu={props.aiheVaihtuu} resetAiheVaihtuu={props.resetAiheVaihtuu} setMessage={props.setMessage} />
            : ''}
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Keskustelut aihe={props.currentItem} setMessage={props.setMessage} />
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
      aiheet:  [],
      currentItem: '',
      omistaja: '1',
      aiheVaihtuu: this.state ? this.state.aiheVaihtuu : false,
      messu: '',
      messuTyyppi: messageTypes.CLOSE
    }
  }

  componentDidMount() {
    foorumiData.getAll()
      .then(responseData => {
        logger.info('App.componentDidMount.responseData:', responseData)
        const aihe = (responseData && responseData > 0) ? responseData[0].id : ''
        this.setState({aiheet: responseData, currentItem: aihe, aiheVaihtuu: true})
      })
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

    const ehdotusSegmentit = this.state.aiheet.map(ehdotus => {
      return (<Aihe key={ ehdotus.id}
                        id={ehdotus.id}
                        title={ehdotus.title}
                        currentItem={this.state.currentItem}
                        handleItem={this.handleItemClick}/>)
    })

    const setMessage = (messu, tyyppi) => {
      this.setState({messu: messu, messuTyyppi: tyyppi})
    }

    return (
      <Segment>
        <Huomio teksti={this.state.messu} tyyppi={this.state.messuTyyppi} />
        <FoorumiRivit ehdotusSegmentit={ehdotusSegmentit}
                      currentItem={this.state.currentItem}
                      omistaja='1'
                      aiheVaihtuu={this.state.aiheVaihtuu}
                      resetAiheVaihtuu={resetAiheVaihtuu}
                      setMessage={setMessage}
        />
      </Segment>
    )
  }
}

export default Foorumi
