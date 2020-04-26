/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Taustapalvelut keskustelut -services
/// Paul Kallio 19.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import axios from 'axios'
import {getAuth} from './session'

const logger = require('simple-console-logger').getLogger('keskustelu')
const baseUrl = '/api/aiheet'
const addUrl = '/keskustelut'

const getAll = (id) => {
  logger.info('axios.getAll:', `${baseUrl}/${id}${addUrl}`)
  const request = axios.get(`${baseUrl}/${id}${addUrl}`)
  return request.then(response => response.data)
}

/// Create method
const create = async (topicId, newObject) => {
  logger.info('axios.create:', `${baseUrl}/${topicId}${addUrl}`)
  const response = await axios.post(`${baseUrl}/${topicId}${addUrl}`, newObject, getAuth())
  return response.data
}
  // const response = await axios.post(baseUrl, newObject, config)
  // return response.data

export default {getAll, create}
