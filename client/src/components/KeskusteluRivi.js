/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// KeskusteluRivi -komponentti
/// Paul Kallio 16.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Feed, Icon, Divider} from 'semantic-ui-react'
import KeskusteluValikko, {iMenuType} from './KeskusteluValikko'
import {messageTypes, messageTime} from './common/Huomio'
import {finnishDate} from '../tools/aika'
import {isUserOwner} from '../tools/session'
import keskusteluData from '../services/keskustelu'

const logger = require('simple-console-logger').getLogger('KeskusteluRivi')

class KeskusteluRivi extends Component {

  isLive = true

  constructor(props) {
    super(props)

    this.state = {
      nowMenu: ''
    }
    this.handleMenu  = this.handleMenu.bind(this)
  }

  componentWillUnmount() {
    this.isLive = false
  }

  setMenu = (nowMenu) => {
      if(this.isLive) {
        this.setState((state) => { return {nowMenu: nowMenu}})
      }
  }

  menuLike = () => {
    logger.info('menuLike', this.props.id, this.props.aihe, this.props.like)
  }
  menuHate = () => {
    logger.info('menuHate', this.props.id, this.props.aihe, this.props.like)
  }
  menuEdit = () => {
    logger.info('menuEdit', this.props.id, this.props.aihe, this.props.like)
  }
  menuAdd  = () => {
    logger.info('menuAdd', this.props.id, this.props.aihe, this.props.like)
  }
  menuDel  = () => {
    logger.info('menuDel', this.props.id, this.props.aihe, this.props.like)
    keskusteluData.remove(this.props.id, this.props.aihe)
      .then(responseData => {
        logger.info('keskusteluData.remove:', responseData)
        this.props.setMessage(`Keskustelu ${this.props.otsikko} on poistettu Foorumilta.`, messageTypes.INFO)
        this.props.refresh()
      })
      .catch(error => {
        logger.info('usersData.create:', error)
        this.props.setMessage(error.message, messageTypes.WARNING)
      })
      .finally(() => {
        setTimeout(() => {
          this.props.setMessage('', messageTypes.CLOSE)
        }, messageTime.NORMAL)
    })

  }

  handleMenu = (event, {name}) => {

    event.preventDefault()
    logger.info('handleMenu', this.props)
    this.setMenu(name)

    switch(name) {
      case iMenuType.LIKE:
        return this.menuLike()
      case iMenuType.DIS:
        return this.menuHate()
      case iMenuType.EDIT:
        return this.menuEdit()
      case iMenuType.ADD:
        return this.menuAdd()
      case iMenuType.DEL:
        return this.menuDel()
      default:
        return
    }
  }

  render () {

    const isOwner = isUserOwner(this.props.omistaja)

    return (
      <Feed>
        <Feed.Label>
          <Icon name='universal access' />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>{this.props.omistaja}</Feed.User> {this.props.otsikko}
            <Feed.Date>{finnishDate(this.props.aika)}</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>{this.props.kommentti}
          </Feed.Extra>
          <Divider horizontal hidden />
          {this.props.username
            ? <KeskusteluValikko  isOwner={isOwner}
                              like={this.props.like} disLike={this.props.disLike}
                              nowMenu={this.state.nowMenu} handleMenu={this.handleMenu} />
            : ''
          }
        </Feed.Content>
        <Feed>
        </Feed>
      </Feed>
    )
  }
}

const mapStateToProps = state => {
    logger.info('mapStateToProps.state', state)
  return {
    username: state.username
  }
}
export default withRouter(connect(mapStateToProps, null)(KeskusteluRivi))
