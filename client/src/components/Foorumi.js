/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Foorumi -komponentti
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Segment, Grid, Menu, Divider} from 'semantic-ui-react'
import foorumiData from '../services/foorumi'
import {isLoggedIn, checkAuth} from '../services/session'
import Huomio, {messageTypes, messageTime} from './Huomio'
import Keskustelut from './Keskustelut'
import AiheLomake from '../forms/AiheLomake'
const logger = require('simple-console-logger').getLogger('Foorumi')

/// Aihe komponentti
const Aihe = (props) => {
  logger.info('Aihe', props.id, props.aihe)
  return (
    <Menu.Item
      name={props.id + ''}
      active={props.aihe===props.id}
      onClick={props.handleItem}
      >
      {props.title}
    </Menu.Item>
  )
}

/// FoorumiRivit komponentti
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
            ? <AiheLomake setMessage={props.setMessage} refresh={props.refresh} handleDelete={props.handleDelete} />
            : ''}
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Keskustelut aihe={props.aihe} setMessage={props.setMessage} />
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
      aiheet:  [],
      aihe: -1,
      messu: '',
      messuTyyppi: messageTypes.CLOSE
    }
  }

  componentWillUnmount() {
    this.isLive = false
  }

  componentDidMount() {
    this.refresh()
  }

/*  componentDidUpdate(prevProps, prevState) {
    if(this.state.aihe !== prevState.aihe) {
      this.refresh()
    }
  } */

  refresh = () => {
    foorumiData.getAll()
      .then(responseData => {
        logger.info('App.componentDidMount.responseData:', responseData)
        if(this.isLive) {
          this.setState({aiheet: responseData})
        }
        if(this.state.aihe < 1 && responseData && responseData.length > 0) {
          if(this.isLive) {
            this.setState({aihe: responseData[0].id})
          }
        }
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

  handleItemClick = (e, {name}) => {
    this.setState((state) => { return {aihe: parseInt(name)}})
    this.props.setAihe(name)
    logger.error('handleItemClick.currentItem/ehdotus:', this.state.aihe, name)
  }

  handleDelete = (event, {name}) => {
    event.preventDefault()
    foorumiData.remove(this.state.aihe)
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

    const ehdotusSegmentit = this.state.aiheet.map(ehdotus => {
      return (<Aihe key={ ehdotus.id}
                        id={ehdotus.id}
                        title={ehdotus.title}
                        aihe={this.state.aihe}
                        handleItem={this.handleItemClick}/>)
    })

    return (
      <Segment>
        <Huomio teksti={this.state.messu} tyyppi={this.state.messuTyyppi} />
        <FoorumiRivit ehdotusSegmentit={ehdotusSegmentit}
                      aihe={this.state.aihe}
                      setMessage={this.setMessage}
                      refresh={this.refresh}
                      handleDelete={this.handleDelete}
        />
      </Segment>
    )
  }
}

export default Foorumi
