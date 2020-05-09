/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Valikko -komponentti
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Menu} from 'semantic-ui-react'
import {Link, withRouter} from 'react-router-dom'
import * as item from './common/valikko'
const logger = require('simple-console-logger').getLogger('Valikko')

/// Valikko -komponentti
class Valikko extends Component {

  isLive = true

  /// componentWillUnmount
  componentWillUnmount() {
    this.isLive = false
  }

  /// componentDidMount
  componentDidMount() {
	  logger.info("Current Path", this.props.history.location.pathname)
  }

  /// render
  render () {
    const activeItem = this.props.history.location.pathname
    return (
      <Menu>
        <Menu.Item as={Link} to='/' name={item.ETUSIVU} active={activeItem===item.ETUSIVU}>Etusivu</Menu.Item>
        <Menu.Item as={Link} to='/foorumi' name={item.FOORUMI} active={activeItem===item.FOORUMI}>Foorumi</Menu.Item>
        <Menu.Item as={Link} to='/vaali' name={item.VAALI} active={activeItem===item.VAALI}>Äänestys</Menu.Item>
        <Menu.Item as={Link} to='/users' name={item.USERS} active={activeItem===item.USERS}>Käyttäjät</Menu.Item>
        {this.props.user.username
          ? <Menu.Item as={Link} to='/logout' position="right" name={item.LOGOUT} active={activeItem===item.LOGOUT}>Uloskirjaus</Menu.Item>
          : <Menu.Item as={Link} to='/login' position="right" name={item.LOGIN} active={activeItem===item.LOGIN}>Sisäänkirjaus</Menu.Item>
        }
      </Menu>
    )
  }
}

/// Valikko -komponentti - Redux Tilankäsittely
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default withRouter(connect(mapStateToProps, null)(Valikko))
