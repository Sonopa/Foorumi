/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Foorumi -komponentti
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Segment, Grid, Menu} from 'semantic-ui-react'
import Keskustelut from './Keskustelut'
import AiheLomake from './forms/AiheLomake'
import {isLoggedIn, checkAuth} from '../services/local/session'
import Huomio, {messageTypes, messageTime} from './common/Huomio'
import {loadAiheet} from '../stores/actions/aiheetAction'
import {setCurrentAihe} from '../stores/actions/aiheAction'
import foorumiData from '../services/foorumi'
const logger = require('simple-console-logger').getLogger('Foorumi')

/// Aihe komponentti
const Aihe = (props) => {
  return (
    <Menu.Item
      name={props.id+''}
      active={props.aiheId===props.id}
      onClick={props.handleSelect}
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
            {isLoggedIn()
            ?
            <div className='uiDiv'>
              <AiheLomake aiheId={props.aiheId} isUserOwner={props.isUserOwner}
                          setMessage={props.setMessage} refresh={props.refresh} handleDelete={props.handleDelete} /></div>
            : ''}
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Keskustelut aiheId={props.aiheId} setMessage={props.setMessage} refresh={props.refresh} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  )
}

/// Foorumi komponentti
class Foorumi extends Component {

  isLive = true

  /// constructor
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

  /// componentWillUnmount
  componentWillUnmount() {
    this.isLive = false
  }

  /// componentDidMount
  componentDidMount() {
    logger.info('componentDidMount', this.props.aihe)
    this.refresh()
  }

  /// refresh
  refresh = () => {
    if(this.isLive) {
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
  }

  /// setMessage
  setMessage = (messu, messuTyyppi) => {
    if(this.isLive) {
      this.setState({messu: messu, messuTyyppi: messuTyyppi})
    }
  }

  /// handleSelect
  handleSelect = (event, {name}) => {
    event.preventDefault()
    logger.info('handleSelect.name:', name)
    const aiheId = name // parseInt(name)
    logger.info('handleSelect.aihe:', this.props.aihe, name, aiheId)
    const aihe = this.props.aiheet.find(ehdotus => ehdotus._id===aiheId)
    this.props.setCurrentAihe(aihe ? aihe : {_id:0})
  }

  /// handleDelete
  handleDelete = () => {
    foorumiData.remove(this.props.aihe._id)
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

  /// aiheRivit
  aiheRivit = () => {

    if(!this.props.aiheet || this.props.aiheet.length === 0) {
      return null
    }
    return this.props.aiheet.map(ehdotus => {
      return (<Aihe key={ehdotus._id}
                    id={ehdotus._id}
                    title={ehdotus.title}
                    userId={this.props.userId}
                    aiheId={this.props.aihe._id}
                    handleSelect={this.handleSelect}/>)
    })
  }

  /// render
  render() {

    const isUserOwner = (this.props.user && this.props.aihe.owner ) ?
                        (this.props.user._id === this.props.aihe.owner._id) : false

    const ehdotusSegmentit = this.aiheRivit()

    return (
      <Segment>
        <Huomio teksti={this.state.messu} tyyppi={this.state.messuTyyppi} />
        <FoorumiRivit ehdotusSegmentit={ehdotusSegmentit}
                      aiheId={this.props.aihe._id}
                      setMessage={this.setMessage}
                      refresh={this.refresh}
                      handleDelete={this.handleDelete}
                      isUserOwner={isUserOwner}
        />
      </Segment>
    )
  }
}

/// Valikko -komponentti - Redux Tilankäsittely
const mapStateToProps = state => {
  return {
    aiheet: state.aiheet,
    aihe: state.aihe,
    user: state.user
  }
}

const mapDispatchToProps = {
  loadAiheet,
  setCurrentAihe
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Foorumi))
