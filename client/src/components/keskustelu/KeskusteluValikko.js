/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// KeskusteluValikko -komponentti
/// Paul Kallio 30.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React from 'react'
import {Icon, Menu} from 'semantic-ui-react'

/// iMenuType
export const iMenuType = {
  LIKE: 'like',
  DIS:  'disl',
  ADD:  'addi',
  DEL:  'dele',
  EDIT: 'edit'
}

/// KeskusteluValinta
const KeskusteluValinta = (props) => {

  let menuIcon = 'question'
  switch(props.menuType) {
    case iMenuType.LIKE:
      menuIcon = 'like'
      break
    case iMenuType.DIS:
      menuIcon = 'thumbs down outline'
      break
    case iMenuType.EDIT:
      if(!props.isOwner) {
        return ''
      }
      menuIcon = 'pencil alternate'
      break
    case iMenuType.ADD:
      menuIcon = 'plus'
      break
    case iMenuType.DEL:
      if(!props.isOwner) {
        return ''
      }
      menuIcon = 'minus'
      break
    default:
      menuIcon = 'question'
  }

  return (
    <Menu.Item
      name={props.menuType}
      active={props.nowMenu===props.menuType}
      onClick={props.handleMenu}
      >
        <Icon name={menuIcon} />{props.value}
    </Menu.Item>
  )
}

/// KeskusteluValikko
const KeskusteluValikko = (props) => {

  return (
      <Menu compact>
        <KeskusteluValinta menuType={iMenuType.LIKE} nowMenu={props.nowMenu} handleMenu={props.handleMenu} value={props.like} />
        <KeskusteluValinta menuType={iMenuType.DIS}  nowMenu={props.nowMenu} handleMenu={props.handleMenu} value={props.disLike} />
        <KeskusteluValinta menuType={iMenuType.EDIT} nowMenu={props.nowMenu} handleMenu={props.handleMenu} value=''  isOwner={props.isOwner}/>
        <KeskusteluValinta menuType={iMenuType.ADD} nowMenu={props.nowMenu} handleMenu={props.handleMenu} value='' />
        <KeskusteluValinta menuType={iMenuType.DEL} nowMenu={props.nowMenu} handleMenu={props.handleMenu} value='' isOwner={props.isOwner} />
      </Menu>
  )
}

export default KeskusteluValikko
