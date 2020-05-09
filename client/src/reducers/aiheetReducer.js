/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// aiheetReducer -komponentti
/// Paul Kallio 5.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import * as aAct from '../actions/aiheetAction'
const logger = require('simple-console-logger').getLogger('aiheetReducer')

/// Aiheet Reducer
const aiheetReducer = (state=[], action) => {
  if(!action || !state) {
      return state
  }
  switch(action.type) {

    case aAct.aiheetAction.ADD:
      logger.info(aAct.aiheetAction.ADD, action)
      return doAdd(state, action.data)

    case aAct.aiheetAction.UPDATE:
      logger.info(aAct.aiheetAction.UPDATE, action, state)
      return doUpdate(state, action.data)

    case aAct.aiheetAction.DELETE:
      logger.info(aAct.aiheetAction.DELETE, action)
      return doDelete(state, action.data)

    case aAct.aiheetAction.LOAD:
      logger.info(aAct.aiheetAction.LOAD, action)
      return action.data

    default:
      return state
  }
}

/// Add reducer -method
const doAdd = (aiheet, aihe) => {
  return aiheet.slice(0, aiheet.length).apply(aihe)
}

/// Update reducer -method
const doUpdate = (aiheet, aihe) => {
  const index = aiheet.findIndex(item => item._id === aihe._id)
  return  [aiheet.slice(0, index),aihe,aiheet.slice(index+1, aiheet.length)]
}

/// Delete reducer -method
const doDelete = (aiheet, aihe) => {

  const index = aiheet.findIndex(item => item._id === aihe._id)
  return  aiheet.slice(0, index)
                .concat(aiheet.slice(index+1, aiheet.length))
}

export default aiheetReducer
