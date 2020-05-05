/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// loginReducer -komponentti
/// Paul Kallio 5.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
const logger = require('simple-console-logger').getLogger('userReducer')

const userAction = {
  INIT: 'initUser',
  ADD: 'addUser',
  DELETE: 'deleteUser',
  UPDATE: 'updateUser'
}
/*
const getInitialStateFromStorage = () => {

}

const saveToStorage = (state) => {
    sessionStorage.setItem("loginState")
}
*/
const loginReducer = (state={}, action) => {

  switch(action.type) {
    case userAction.ADD:
      logger.info(userAction.ADD, action)
      return state
    case userAction.UPDATE:
      logger.info(userAction.UPDATE, action)
      return state
    case userAction.DELETE:
      logger.info(userAction.DELETE, action)
      return state
    case userAction.INIT:
      logger.info(userAction.INIT, action)
      return state
    default:
      return state
  }
}
export default loginReducer
