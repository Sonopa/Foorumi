/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Foorumi -komponentti
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Segment, Grid, Menu, Divider} from 'semantic-ui-react'
import Keskustelut from './Keskustelut'
import AiheLomake from '../forms/AiheLomake'
import {isLoggedIn, checkAuth} from '../tools/session'
import Huomio, {messageTypes, messageTime} from '../tools/Huomio'
import {loadAiheet} from '../actions/aiheetAction'
import {setCurrentAihe} from '../reducers/aiheReducer'
import foorumiData from '../services/foorumi'
const logger = require('simple-console-logger').getLogger('Foorumi')

/// Aihe komponentti
const Aihe = (props) => {
  return (
    <Menu.Item
      name={props.id + ''}
      active={props.aiheId===props.id}
      onClick={props.handleSelect}
      >
      {props.title}
    </Menu.Item>
  )
}

/// FoorumiRivit komponentti
const FoorumiRivit = (props) => {
  logger.info('FoorumiRivit', props.aiheId)
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
            ? <AiheLomake setMessage={props.setMessage} refresh={props.refresh} handleDelete={props.handleDelete} />
            : ''}
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Keskustelut aiheId={props.aiheId} setMessage={props.setMessage} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  )
}

/// Foorumi komponentti
class Foorumi extends Component {

  isLive = true

  constructor(props) {
    super(props)
    this.state = {
      // aiheet:  [],
      // aihe: -1,
      messu: '',
      messuTyyppi: messageTypes.CLOSE
    }
    // Binding of event handling methods
    this.handleSelect   = this.handleSelect.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentWillUnmount() {
    this.isLive = false
  }

  componentDidMount() {
    logger.info('componentDidMount', this.props.aihe)
    this.refresh()
  }

  refresh = () => {
    foorumiData.getAll()
      .then(responseData => {
        logger.info('App.componentDidMount.responseData:', responseData)
        this.props.loadAiheet(responseData)
        this.props.setCurrentAihe(responseData[0])
      })
      .catch(exception => {
        logger.info('handleSave.catch:', exception)
        this.setMessage(exception.message, messageTypes.ERROR)
      })
      .finally(() => {
        setTimeout(() => {
          this.setMessage('', messageTypes.CLOSE)
      }, messageTime.EXTRA)
    })
  }

  setMessage = (messu, messuTyyppi) => {
    if(this.isLive) {
      logger.trace('setMessage:', messu, messuTyyppi)
      this.setState({messu: messu, messuTyyppi: messuTyyppi})
    }
  }

  handleSelect = (event, {name}) => {
    event.preventDefault()
    const aiheId = parseInt(name)
    logger.info('handleSelect.aihe:', this.props.aihe, name)
    const aihe = this.props.aiheet.find(ehdotus => ehdotus.id===aiheId)
    this.props.setCurrentAihe(aihe ? aihe : {id:0})

    // this.setState((state) => { return {aihe: aiheId}})
    // this.props.setCurrentAihe(this.props.aiheet[0])
    // this.props.setAihe(name)
  }

  handleDelete = (event, {name}) => {
    event.preventDefault()
    foorumiData.remove(this.props.aihe.id)
      .then(responseData => {
        logger.info('handleDelete', responseData)
        this.setMessage(`Aihe ${''} on poistettu Foorumilta.`, messageTypes.INFO)
        this.refresh()
      })
      .catch(error => {
        logger.info('handleDelete.catch:', error)
        const virhe = checkAuth(error) ? "Sessiosi on vanhentunut. Ole hyvä ja kirjaudu uudelleen." : error.message
        this.setMessage(virhe, messageTypes.WARNING)
      })
      .finally(() => {
        setTimeout(() => {
          this.setMessage('', messageTypes.CLOSE)
      }, messageTime.NORMAL)
    })
  }

  render() {

    const ehdotusSegmentit = this.props.aiheet.map(ehdotus => {
      return (<Aihe key={ehdotus.id}
                    id={ehdotus.id}
                    title={ehdotus.title}
                    aiheId={this.props.aihe.id}
                    handleSelect={this.handleSelect}/>)
    })

    return (
      <Segment>
        <Huomio teksti={this.state.messu} tyyppi={this.state.messuTyyppi} />
        <FoorumiRivit ehdotusSegmentit={ehdotusSegmentit}
                      aiheId={this.props.aihe.id}
                      setMessage={this.setMessage}
                      refresh={this.refresh}
                      handleDelete={this.handleDelete}
        />
      </Segment>
    )
  }
}

/// Valikko -komponentti - Redux Tilankäsittely
const mapStateToProps = state => {
  return {
    aiheet: state.aiheet,
    aihe: state.aihe
  }
}

const mapDispatchToProps = {
  loadAiheet,
  setCurrentAihe
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Foorumi))
