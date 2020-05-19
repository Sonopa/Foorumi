/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// KommenttiValikko -komponentti sisältää Kommentin Valikon
/// Paul Kallio 18.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React from 'react'
import {Icon, Menu, Popup} from 'semantic-ui-react'
import {iTila} from '../keskustelu/KeskusteluValikko'
// const logger = require('simple-console-logger').getLogger('KommenttiValikko')

/// KommenttiValinta
const KommenttiValinta = (props) => {

  let menuIcon = ''
  let popupText = ''
  switch(props.menuType) {
    case iTila.POISTO:
      if(!props.isOwner) {
        return ''
      }
      menuIcon = 'minus'
      popupText = 'Poista kommentti'
      break
    default:
      menuIcon = 'question'
      popupText = ''
  }
  return (
    <Popup content={popupText} trigger={
    <Menu.Item
      name={props.menuType}
      active={props.nowMenu===props.menuType}
      onClick={props.handleMenu}
      >
        <Icon name={menuIcon} />{props.value}
    </Menu.Item>
    } />
  )
}

/// KommenttiValikko
const KommenttiValikko = (props) => {
  return (
      <Menu size='mini' compact>
        <KommenttiValinta menuType={iTila.POISTO} nowMenu={props.nowMenu} handleMenu={props.handleMenu} value='' isOwner={props.isOwner} />
      </Menu>
  )
}

export default KommenttiValikko
