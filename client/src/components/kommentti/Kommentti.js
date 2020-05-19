/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Kommentti -komponentti sisältää yhden kommentin tiedot
/// Paul Kallio 18.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Segment, Comment, Divider, Button, Message} from 'semantic-ui-react'
import KommenttiValikko from './KommenttiValikko'
import {iTila} from '../keskustelu/KeskusteluValikko'
import kommenttiData from '../../services/kommentti'
import {finnishDate} from '../common/aika'
const logger = require('simple-console-logger').getLogger('Kommentti')

/// Kommentti
class Kommentti extends Component {

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

  /// getStoredUser
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

  /// setTila
  setTila = (iTila) => {
      if(this.isLive) {
        this.setState({iTila: iTila})
      }
  }

  /// setMenu
  setMenu = (nowMenu) => {
      if(this.isLive) {
        this.setState((state) => { return {nowMenu: nowMenu}})
      }
  }

  /// handleMenu
  handleMenu = (event, {name}) => {

    event.preventDefault()
    logger.info('handleMenu', this.props)
    this.setMenu(name)

    switch(name) {
      case iTila.MUUTOS:
        return this.willEdit()
      case iTila.POISTO:
        return this.willDelete()
      default:
        return
    }
  }

  /// clear
  restore  = () => {
    logger.info('restore', this.props.kommentti)
    this.setTila(iTila.SELAUS)
  }

  /// willEdit
  willEdit  = () => {
    logger.info('willEdit', this.props.kommentti)
    this.setTila(iTila.MUUTOS)
  }

  /// menuEdit
  doEdit = () => {
    logger.info('menuEdit', this.props.kommentti)
    this.setTila(iTila.SELAUS)
    this.props.refresh()
  }

  /// willDel
  willDelete  = () => {
    logger.info('willDel', this.props.kommentti)
    this.setTila(iTila.POISTO)
  }

  /// menuDel
  doDelete  = () => {
    logger.info('menuDel', this.props.kommentti)
    kommenttiData.remove(this.props.aihe._id, this.props.kommentti.discussion, this.props.kommentti._id)
      .then(responseData => {
        logger.info('kommenttiData.remove:', responseData)
        //this.props.setMessage(`Keskustelu ${this.props.otsikko} on poistettu Foorumilta.`, messageTypes.INFO)
        this.props.refresh()
        this.setTila(iTila.SELAUS)
      })
      .catch(error => {
        logger.info('kommenttiData.remove:', error)
        // this.props.setMessage(error.message, messageTypes.WARNING)
      })
      .finally(() => {
        /*setTimeout(() => {
          this.props.setMessage('', messageTypes.CLOSE)
        }, messageTime.NORMAL)*/
    })
  }

  /// render
  render () {
    const isOwner = this.props.kommentti.owner === this.props.user._id
    logger.info("render.keskustelu", this.props.kommentti)
    return (
      <Segment basic>
       <div className='uiDivInner'>
        <Comment.Group minimal>
            <Comment.Author as='a'>{this.getStoredUser(this.props.kommentti.owner)}</Comment.Author>
            <Comment.Metadata>
              <div>{finnishDate(this.props.kommentti.updatedAt)}</div>
            </Comment.Metadata>
            <Comment.Text>
              {this.props.kommentti.text}
            </Comment.Text>
            {isOwner ?
              <>
                {
                  this.state.iTila === iTila.POISTO
                  ?
                    <div className='uiDiv'>
                      <Message warning>
                        <Message.Header>Haluatko varmasti poistaa kommentin?</Message.Header>
                      </Message>
                      <Divider horizontal hidden />
                      <Button onClick={this.doDelete} primary>Poista</Button>
                      <Button onClick={this.restore} secondary>Peruuta</Button>
                    </div>
                  :
                    <div className='uiDiv'>
                      <KommenttiValikko isOwner={isOwner} nowMenu={this.state.nowMenu} handleMenu={this.handleMenu} />
                    </div>
                 }
              </>
            : null}
        </Comment.Group>
        </div>
      </Segment>
    )
  }
}
/// mapStateToProps
const mapStateToProps = state => {
  return {
    aihe: state.aihe,
    user: state.user,
    users: state.users
  }
}
export default withRouter(connect(mapStateToProps, null)(Kommentti))
