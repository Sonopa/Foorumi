/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// userAction -komponentti
/// Paul Kallio 9.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import {getUser} from '../../services/local/session'
import usersData from '../../services/users'
import {usersAction} from './usersAction'
const logger = require('simple-console-logger').getLogger('usersAction')

/// User Action Name
export const userAction = {
  CURRENT: 'currentUser'
}

/// loadUsersMWare
export function setActiveUserMWare() {
  return async function(dispatch, getState) {

    const username = getUser()
    const users = getState().users
    let user = {_id:0}
    const index = users.findIndex(item => item.username === username)
    if (index > -1) {
        user = users.slice(index, index + 1)[0]
        logger.info('user is found from Redux ', username, user)
        dispatch({
          type: userAction.CURRENT,
          data: user
        })
    } else {
        logger.info('user is in db ', username)
        const usersDb = await usersData.getAll()
        logger.info('loadUsersMWare.usersDb', usersDb)
        let user = {_id:0}
        if(username) {
          const index = usersDb.findIndex(item => item.username === username)
          user = (index > -1) ? usersDb.slice(index, index + 1)[0] : {_id:0}
          logger.info('loadUsersMWare.username', username)
        }

        dispatch({
          type: usersAction.ADD,
          data: user
        })

        dispatch({
          type: userAction.CURRENT,
          data: user
        })
      }
    }
}

/// set Current User Action
export const setCurrentUser = user => {
  return {
    type: userAction.CURRENT,
    data: user
  }
}
