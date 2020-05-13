/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// aiheetAction -komponentti
/// Paul Kallio 7.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import foorumiData from '../../services/foorumi'
import {aiheAction} from './aiheAction'
const logger = require('simple-console-logger').getLogger('aiheetAction')

/// aiheetAction
export const aiheetAction = {
  LOAD: 'loadAiheet',
  ADD:  'addAiheet',
  DELETE: 'deleteAiheet',
  UPDATE: 'updateAiheet'
}

/// loadAiheetMWare
export function loadAiheetMWare() {
  return async dispatch => {
    const aiheet = await foorumiData.getAll()
    const aihe = (aiheet && aiheet.length > 0) ? aiheet[0] : {_id:0}
    logger.info('loadAiheetMWare.aiheet', aiheet)

    dispatch({
      type: aiheetAction.LOAD,
      data: aiheet
    })
    dispatch({
      type: aiheAction.CURRENT,
      data: aihe
    })
  }
}

/// loadAiheet
export function loadAiheet(aiheet) {
  return {
    type: aiheetAction.LOAD,
    data: aiheet
  }
}

/// addAiheet
export function addAiheet(aihe) {
  return {
    type: aiheetAction.ADD,
    data: aihe
  }
}

/// deleteAiheet
export function deleteAiheet(aihe) {
  return {
    type: aiheetAction.DELETE,
    data: aihe
  }
}

/// updateAiheet
export function updateAiheet(aihe) {
  return {
    type: aiheetAction.UPDATE,
    data: aihe
  }
}
