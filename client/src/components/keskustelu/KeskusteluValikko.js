/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// KeskusteluValikko -komponentti
/// Paul Kallio 30.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React from 'react'
import {Icon, Menu, Popup} from 'semantic-ui-react'

/// iTila
export const iTila = {
  LIKE:   'like',
  HATE:   'hate',
  SELAUS: 'selaus',
  LISAYS: 'lisays',
  MUUTOS: 'muutos',
  POISTO: 'poisto'
}

/// KeskusteluValinta
const KeskusteluValinta = (props) => {

  let menuIcon = ''
  let popupText = ''
  switch(props.menuType) {
    case iTila.LIKE:
      menuIcon = 'like'
      popupText = 'Kannatan'
      break
    case iTila.HATE:
      menuIcon = 'thumbs down outline'
      popupText = 'Olen erimieltä'
      break
    case iTila.MUUTOS:
      if(!props.isOwner) {
        return ''
      }
      menuIcon = 'pencil alternate'
      popupText = 'Päivitä keskustelu'
      break
    case iTila.LISAYS:
      menuIcon = 'plus'
      popupText = 'Lisää kommentti'
      break
    case iTila.POISTO:
      if(!props.isOwner) {
        return ''
      }
      menuIcon = 'minus'
      popupText = 'Poista keskustelu'
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

/// KeskusteluValikko
const KeskusteluValikko = (props) => {

  return (
      <Menu compact>
        <KeskusteluValinta menuType={iTila.LIKE} nowMenu={props.nowMenu} handleMenu={props.handleMenu} value={props.like} />
        <KeskusteluValinta menuType={iTila.HATE}  nowMenu={props.nowMenu} handleMenu={props.handleMenu} value={props.disLike} />
        <KeskusteluValinta menuType={iTila.MUUTOS} nowMenu={props.nowMenu} handleMenu={props.handleMenu} value=''  isOwner={props.isOwner}/>
        <KeskusteluValinta menuType={iTila.LISAYS} nowMenu={props.nowMenu} handleMenu={props.handleMenu} value='' />
        <KeskusteluValinta menuType={iTila.POISTO} nowMenu={props.nowMenu} handleMenu={props.handleMenu} value='' isOwner={props.isOwner} />
      </Menu>
  )
}

export default KeskusteluValikko
