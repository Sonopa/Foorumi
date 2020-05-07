/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// usersReducer -komponentti
/// Paul Kallio 5.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import * as uAct from '../actions/usersAction'
const logger = require('simple-console-logger').getLogger('usersReducer')

const usersReducer = (state=[], action) => {
  logger.info('usersReducer.state', state, 'action', action)
  if(!action || !state) {
      return state
  }
  switch(action.type) {
    case uAct.usersAction.ADD:
      logger.info(uAct.usersAction.ADD, action)
      return doAdd(state.users, action.data.user)

    case uAct.usersAction.UPDATE:
      logger.info(uAct.usersAction.UPDATE, action)
      return doUpdate(state.users, action.data.user)

    case uAct.usersAction.DELETE:
      logger.info(uAct.usersAction.DELETE, action)
      return doDelete(state.users, action.data.user)

    case uAct.usersAction.LOAD:
      logger.info(uAct.usersAction.LOAD, action)
      return action.data.users
    default:
      return state
  }
}

const doAdd = (users, user) => {
  return users.slice(0, users.length).apply(user)
}

const doUpdate = (users, user) => {
  const index = users.findIndex(item => item.id === user.id)
  return  users.slice(0, index)
                .apply(user)
                .concat(users.slice(index+1, users.length))
}

const doDelete = (users, user) => {

  const index = users.findIndex(item => item.id === user.id)
  return  users.slice(0, index)
                .concat(users.slice(index+1, users.length))
}

export default usersReducer
