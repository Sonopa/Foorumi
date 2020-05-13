/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Taustapalvelut kommentti -services
/// Paul Kallio 13.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import axios from 'axios'
import {getAuth} from '../services/local/session'

const logger = require('simple-console-logger').getLogger('keskustelu')

const aiheet = '/api/aiheet/'
const keskustelut = '/keskustelut/'
const kommentit = '/kommentit'

const url = (topicId, discussionId, commentId) => {

  let url = aiheet;
  if(topicId) {
    url += topicId + keskustelut
  }
  if(discussionId) {
    url += discussionId + kommentit
  }
  if(commentId) {
    url += '/' + commentId
  }

  return url
}

/// GetAll - Hae aiheen kaikki keskustelut
const getAll = (topicId, discussionId) => {
  logger.info('axios.getAll.url', url(topicId, discussionId))
  const request = axios.get(url(topicId, discussionId))
  return request.then(response => response.data)
}

/// GetOne - Hae aiheen kaikki keskustelut
const get = (topicId, discussionId, commentId) => {
  logger.info('axios.get.url', url(topicId, discussionId, commentId))
  const request = axios.get(url(topicId, discussionId))
  return request.then(response => response.data)
}

/// Create - luo uusi keskustelu aiheen alle
const create = async (topicId, discussionId, kommentti) => {
  logger.info('axios.create.url', url(topicId, discussionId), kommentti)
  const response = await axios.post(url(topicId, discussionId), kommentti, getAuth())
  return response.data
}

/// Update - päivitä keskustelu aiheen alle
const update = async (topicId, discussionId, commentId, kommentti) => {
  logger.info('axios.update:', url(topicId, discussionId, commentId), kommentti)
  const response = await axios.put(url(topicId, discussionId, commentId), kommentti, getAuth())
  return response.data
}

/// Remove - poista keskustelu aiheelta
const remove = async (topicId, discussionId, commentId) => {
  logger.info('axios.remove:', url(topicId, discussionId, commentId))
  const response = await axios.delete(url(topicId, discussionId, commentId), getAuth())
  return response.data
}

export default {getAll, get, create, update, remove}
