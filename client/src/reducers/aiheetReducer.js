/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// aiheetReducer -komponentti
/// Paul Kallio 5.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
const logger = require('simple-console-logger').getLogger('aiheetReducer')

export const aiheetAction = {
  LOAD: 'loadAiheet',
  ADD: 'addAiheet',
  DELETE: 'deleteAiheet',
  UPDATE: 'updateAiheet'
}

export function loadAiheet(aiheet) {
  return {
    type: aiheetAction.LOAD,
    aiheet

  }
}

const aiheetReducer = (state=[], action) => {
  logger.info('aiheetReducer.state', state, 'action', action)
  if(!action || !state) {
      return state
  }
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
    case aiheetAction.LOAD:
      logger.info(aiheetAction.LOAD, action)
      return action.data
    default:
      return state
  }
}
export default aiheetReducer
