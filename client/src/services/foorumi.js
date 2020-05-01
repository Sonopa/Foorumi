/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Taustapalvelut foorumi -services
/// Paul Kallio 17.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import axios from 'axios'
import {getAuth} from './session'

const logger = require('simple-console-logger').getLogger('foorumi')
const baseUrl = '/api/aiheet'

/// getAll method
const getAll = () => {
  logger.info('axios.getAll:', `${baseUrl}`)
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

/// Create method
const create = async (newObject) => {
  logger.info('axios.create:', `${baseUrl}`)
  const response = await axios.post(`${baseUrl}`, newObject, getAuth())
  return response.data
}

/// getAihe method
const getAihe = (id) => {
  logger.info('axios.get:', `${baseUrl}/${id}`)
  const request = axios.get(`${baseUrl}/${id}`,{id: id})
  return request.then(response => response.data)
}

/// Remove - poista keskustelun aihe Foorumilta
const remove = async (id) => {
  logger.info('axios.remove:', `${baseUrl}/${id}`)
  const response = await axios.delete(`${baseUrl}/${id}`, getAuth())
  return response.data
}

export default {getAll, create, remove, getAihe}
