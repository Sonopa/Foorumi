/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// KeskusteluRivi -komponentti
/// Paul Kallio 16.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Feed, Icon, Divider, Button, Message} from 'semantic-ui-react'
import KeskusteluValikko, {iTila} from './KeskusteluValikko'
import KeskusteluLomake from '../forms/KeskusteluLomake'
import KeskusteluLisaLomake from '../forms/KeskusteluLisaLomake'
import {messageTypes, messageTime} from '../common/Huomio'
import {finnishDate} from '../common/aika'
import {createLike} from '../common/like'
import keskusteluData from '../../services/keskustelu'

const logger = require('simple-console-logger').getLogger('KeskusteluRivi')

/// KeskusteluRivi
class KeskusteluRivi extends Component {

  isLive = true

  /// constructor
  constructor(props) {
    super(props)

    this.state = {
      nowMenu: '',
      iTila: iTila.SELAUS
    }
    this.handleMenu  = this.handleMenu.bind(this)
  }

  /// componentWillUnmount
  componentWillUnmount() {
    this.isLive = false
  }

  /// setMenu
  setMenu = (nowMenu) => {
      if(this.isLive) {
        this.setState((state) => { return {nowMenu: nowMenu}})
      }
  }

  /// setTila
  setTila = (iTila) => {
      if(this.isLive) {
        this.setState({iTila: iTila})
      }
  }

  /// menuLike
  menuLike = () => {
    logger.info('menuLike', this.props.keskustelu)
    keskusteluData.like(this.props.keskustelu._id, this.props.keskustelu.aihe, createLike())
      .then(responseData => {
        logger.info('keskusteluData.like:', responseData)
        this.props.setMessage(`Keskustelu ${this.props.otsikko} on saanut liken.`, messageTypes.INFO)
        this.props.refresh()
        this.setTila(iTila.SELAUS)
      })
      .catch(error => {
        logger.info('keskusteluData.like:', error)
        this.props.setMessage(error.message, messageTypes.WARNING)
      })
      .finally(() => {
        setTimeout(() => {
          this.props.setMessage('', messageTypes.CLOSE)
        }, messageTime.NORMAL)
    })
  }

  /// menuHate
  menuHate = () => {
    logger.info('menuHate', this.props.keskustelu)
  }

  /// willEdit
  willEdit  = () => {
    logger.info('willEdit', this.props.keskustelu)
    this.setTila(iTila.MUUTOS)
  }

  /// menuEdit
  doEdit = () => {
    logger.info('menuEdit', this.props.keskustelu)
    this.setTila(iTila.SELAUS)
    this.props.refresh()
  }

  /// willAdd
  willAdd  = () => {
    logger.info('willAdd', this.props.keskustelu)
    this.setTila(iTila.LISAYS)
  }

  /// menuAdd
  doAdd  = () => {
    logger.info('menuAdd', this.props.keskustelu)
    this.setTila(iTila.SELAUS)
  }

  /// willDel
  willDelete  = () => {
    logger.info('willDel', this.props.keskustelu)
    this.setTila(iTila.POISTO)
  }

  /// menuDel
  doDelete  = () => {
    logger.info('menuDel', this.props.keskustelu)
    keskusteluData.remove(this.props.keskustelu._id, this.props.keskustelu.aihe)
      .then(responseData => {
        logger.info('keskusteluData.remove:', responseData)
        this.props.setMessage(`Keskustelu ${this.props.otsikko} on poistettu Foorumilta.`, messageTypes.INFO)
        this.props.refresh()
        this.setTila(iTila.SELAUS)
      })
      .catch(error => {
        logger.info('keskusteluData.create:', error)
        this.props.setMessage(error.message, messageTypes.WARNING)
      })
      .finally(() => {
        setTimeout(() => {
          this.props.setMessage('', messageTypes.CLOSE)
        }, messageTime.NORMAL)
    })
  }

  /// clear
  restore  = () => {
    logger.info('restore', this.props.keskustelu)
    this.setTila(iTila.SELAUS)
  }

  /// handleMenu
  handleMenu = (event, {name}) => {

    event.preventDefault()
    logger.info('handleMenu', this.props)
    this.setMenu(name)

    switch(name) {
      case iTila.LIKE:
        return this.menuLike()
      case iTila.HATE:
        return this.menuHate()
      case iTila.MUUTOS:
        return this.willEdit()
      case iTila.LISAYS:
        return this.willAdd()
      case iTila.POISTO:
        return this.willDelete()
      default:
        return
    }
  }

  /// isUserOwner
  isUserOwner = (omistaja) => {
      return (omistaja === this.props.user._id)
  }

  getStoredUser = (userId) => {
    if(!this.props.users) {
      return userId
    }
    const user = this.props.users.find(item => item._id === userId)
    if(!user) {
      return userId
    }
    return user.username
  }

  keskusteluLomake() {

    logger.info("keskusteluLomake.keskustelu", this.props.keskustelu)

    const isOwner = this.isUserOwner(this.props.omistaja)
    if(this.props.user.username)  {

      switch(this.state.iTila) {
        case iTila.SELAUS:
          return (  <KeskusteluValikko  isOwner={isOwner}
                                        like={this.props.like ? this.props.like : 0} disLike={this.props.disLike ? this.props.disLike : 0}
                                        nowMenu={this.state.nowMenu} handleMenu={this.handleMenu} />)
        case iTila.POISTO:
          return(
            <div>
              <Message warning>
                <Message.Header>Haluatko varmasti poistaa keskustelun?</Message.Header>
              </Message>
              <Divider horizontal hidden />
              <Button onClick={this.doDelete} primary>Poista</Button>
              <Button onClick={this.restore} secondary>Peruuta</Button>
            </div>
          )
        case iTila.MUUTOS:
          return (
            <KeskusteluLomake doEdit={this.doEdit} restore={this.restore}
                              keskustelu={this.props.keskustelu}
                              setMessage={this.props.setMessage} />
          )
        case iTila.LISAYS:
          return (
              <div>
                <KeskusteluLisaLomake doAdd={this.doAdd} restore={this.restore}
                                      keskustelu={this.props.keskustelu}
                                      setMessage={this.props.setMessage} />
                <Divider horizontal hidden />
                <Button onClick={this.doAdd} primary>Lisää</Button>
                <Button onClick={this.restore} secondary>Peruuta</Button>
              </div>
          )
        default:
          return null
      }
    }
    return null;
  }

  /// render
  render () {
    return (
      <Feed>
        <Feed.Label>
          <Icon name='universal access' />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>{this.getStoredUser(this.props.omistaja)}</Feed.User> {this.props.otsikko}
            <Feed.Date>{finnishDate(this.props.aika)}</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>{this.props.kommentti}
          </Feed.Extra>
          <Divider horizontal hidden />
          <Feed.Extra text>
            {this.keskusteluLomake()}
          </Feed.Extra>
        </Feed.Content>
      </Feed>
    )
  }
}

/// mapStateToProps
const mapStateToProps = state => {
  return {
    user: state.user,
    users: state.users
  }
}
export default withRouter(connect(mapStateToProps, null)(KeskusteluRivi))
