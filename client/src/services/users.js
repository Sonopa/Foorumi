/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Taustapalvelut: käyttäjät -services
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import axios from 'axios'

const baseUrl = '/api/Users'
const registerUrl = '/register'
const logger = require('simple-console-logger').getLogger('users')

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

/// Create method
const create = async (newObject) => {
  logger.info('axios.create.Url:', `${registerUrl}`)
  const response = await axios.post(`${registerUrl}`, newObject)
  logger.trace('axios.create.response:', response)
  return response.data
}

export default {getAll, create}
