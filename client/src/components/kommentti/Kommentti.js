/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Kommentti -komponentti sisältää yhden kommentin tiedot
/// Paul Kallio 18.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Segment, Comment} from 'semantic-ui-react'
import {finnishDate} from '../common/aika'
const logger = require('simple-console-logger').getLogger('Kommentti')

/// Kommentti
class Kommentti extends Component {

  isLive = true

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

  /// render
  render () {
    logger.info("render.keskustelu", this.props.keskustelu)
    return (
      <Segment basic>
        <Comment.Group minimal>
            <Comment.Author as='a'>{this.getStoredUser(this.props.kommentti.owner)}</Comment.Author>
            <Comment.Metadata>
              <div>{finnishDate(this.props.kommentti.updatedAt)}</div>
            </Comment.Metadata>
            <Comment.Text>
              {this.props.kommentti.text}
            </Comment.Text>
        </Comment.Group>
      </Segment>
    )
  }
}
/// mapStateToProps
const mapStateToProps = state => {
  return {
    users: state.users
  }
}
export default withRouter(connect(mapStateToProps, null)(Kommentti))
