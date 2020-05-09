/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// usersReducer -komponentti
/// Paul Kallio 5.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import * as uAct from '../actions/usersAction'
const logger = require('simple-console-logger').getLogger('usersReducer')

const usersReducer = (state=[], action) => {
  /// User
  if(!action || !state) {
      return state
  }
  switch(action.type) {
    case uAct.usersAction.ADD:
      logger.info(uAct.usersAction.ADD, action)
      return doAdd(state, action.data)

    case uAct.usersAction.UPDATE:
      logger.info(uAct.usersAction.UPDATE, action)
      return doUpdate(state, action.data)

    case uAct.usersAction.DELETE:
      logger.info(uAct.usersAction.DELETE, action)
      return doDelete(state, action.data)

    case uAct.usersAction.LOAD:
      logger.info(uAct.usersAction.LOAD, action)
      return action.data
    default:
      return state
  }
}

/// doAdd
const doAdd = (users, user) => {
  return users.slice(0, users.length).apply(user)
}

/// doUpdate
const doUpdate = (users, user) => {
  const index = users.findIndex(item => item._id === user._id)
  return  users.slice(0, index)
                .apply(user)
                .concat(users.slice(index+1, users.length))
}

/// doDelete
const doDelete = (users, user) => {

  const index = users.findIndex(item => item._id === user._id)
  return  users.slice(0, index)
                .concat(users.slice(index+1, users.length))
}

export default usersReducer
