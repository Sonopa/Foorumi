/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// aiheetReducer -komponentti
/// Paul Kallio 5.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
const logger = require('simple-console-logger').getLogger('aiheetReducer')

const aiheetAction = {
  INIT: 'initAiheet',
  ADD: 'addAiheet',
  DELETE: 'deleteAiheet',
  UPDATE: 'updateAiheet'
}

const aiheetReducer = (state=[], action) => {

  switch(action.type) {
    case aiheetAction.ADD:
      logger.info(aiheetAction.ADD, action)
      return state
    case aiheetAction.UPDATE:
      logger.info(aiheetAction.UPDATE, action)
      return state
    case aiheetAction.DELETE:
      logger.info(aiheetAction.DELETE, action)
      return state
    case aiheetAction.INIT:
      logger.info(aiheetAction.INIT, action)
      return state
    default:
      return state
  }
}
export default aiheetReducer
