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
const logger = require('simple-console-logger').getLogger('Valikko')

const ETUSIVU =  '/'
const FOORUMI =  '/foorumi'
const VAALI   =  '/vaali'
const USERS   =  '/users'
const LOGIN   =  '/login'
const LOGOUT  =  '/logout'

/// Valikko -komponentti
class Valikko extends Component {

  isLive = true

  componentWillUnmount() {
    this.isLive = false
  }

  componentDidMount() {
	  logger.info("Current Path", this.props.history.location.pathname)
  }

  render () {
    const activeItem = this.props.history.location.pathname
    return (
      <Menu>
        <Menu.Item as={Link} to='/' name={ETUSIVU} active={activeItem===ETUSIVU}>Etusivu</Menu.Item>
        <Menu.Item as={Link} to='/foorumi' name={FOORUMI} active={activeItem===FOORUMI}>Foorumi</Menu.Item>
        <Menu.Item as={Link} to='/vaali' name={VAALI} active={activeItem===VAALI}>Äänestys</Menu.Item>
        <Menu.Item as={Link} to='/users' name={USERS} active={activeItem===USERS}>Käyttäjät</Menu.Item>
        {this.props.username
          ? <Menu.Item as={Link} to='/logout' position="right" name={LOGOUT} active={activeItem===LOGOUT}>Uloskirjaus</Menu.Item>
          : <Menu.Item as={Link} to='/login' position="right" name={LOGIN} active={activeItem===LOGIN}>Sisäänkirjaus</Menu.Item>
        }
      </Menu>
    )
  }
}

/// Valikko -komponentti - Redux Tilankäsittely
const mapStateToProps = state => {
  return {
    username: state.username
  }
}
export default withRouter(connect(mapStateToProps, null)(Valikko))
