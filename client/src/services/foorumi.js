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

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

/// Create method
const create = async (newObject) => {
  logger.info('axios.create:', `${baseUrl}`)
  const response = await axios.post(`${baseUrl}`, newObject, getAuth())
  return response.data
}

export default {getAll, create}
