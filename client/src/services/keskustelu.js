/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Taustapalvelut keskustelut -services
/// Paul Kallio 19.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import axios from 'axios'
import {getAuth} from '../services/local/session'

const logger = require('simple-console-logger').getLogger('keskustelu')
const baseUrl = '/api/aiheet'
const addUrl = '/keskustelut'

/// GetAll - Hae aiheen kaikki keskustelut
const getAll = (id) => {
  logger.info('axios.getAll:', `${baseUrl}/${id}${addUrl}`)
  const request = axios.get(`${baseUrl}/${id}${addUrl}`)
  return request.then(response => response.data.discussion_list)
}

/// Create - luo uusi keskustelu aiheen alle
const create = async (topicId, newObject) => {
  logger.info('axios.create:', `${baseUrl}/${topicId}${addUrl}`, newObject)
  const response = await axios.post(`${baseUrl}/${topicId}${addUrl}`, newObject, getAuth())
  return response.data
}

/// Update - päivitä keskustelu aiheen alle
const update = async (topicId, keskustelutId, keskustelu) => {
  logger.info('axios.update:', `${baseUrl}/${topicId}${addUrl}/${keskustelutId}`, keskustelu)
  const response = await axios.put(`${baseUrl}/${topicId}${addUrl}/${keskustelutId}`, keskustelu, getAuth())
  return response.data
}

/// Remove - poista keskustelu aiheelta
const remove = async (id, topicId) => {
  logger.info('axios.remove:', `${baseUrl}/${topicId}${addUrl}/${id}`)
  const response = await axios.delete(`${baseUrl}/${topicId}${addUrl}/${id}`, getAuth())
  return response.data
}

export default {getAll, create, update, remove}
