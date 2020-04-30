/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Taustapalvelut: käyttäjät -services
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import axios from 'axios'
import {storeSession, removeSession, getAuth} from './session'

const baseUrl = '/users'
const registerUrl = '/register'
const loginUrl = '/login'
const logoutUrl = '/logout'
const logger = require('simple-console-logger').getLogger('users')

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getUser = (id) => {
  logger.info('axios.getUser.id:', `${baseUrl}/${id}`)
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

/// Create method
const create = async (newObject) => {
  logger.info('axios.create.Url:', `${registerUrl}`)
  const response = await axios.post(`${registerUrl}`, newObject)
  logger.trace('axios.create.response:', response)
  return response.data
}

/// Login method
const login = async (newObject) => {
  logger.info('axios.login.Url:', `${loginUrl}`, newObject)
  const response = await axios.post(`${loginUrl}`, newObject)
  logger.info('axios.login.response:', response)
  const user = {
    token: response.data.token,
    username: newObject.username
  }
  storeSession(user, response.data.id)
  return response.data
}

/// Logout method
const logout = async (newObject) => {
  logger.info('axios.logout.Url:', `${logoutUrl}`, )
  removeSession(newObject)
  const response = await axios.post(`${logoutUrl}`, newObject, getAuth())
  logger.trace('axios.logout.response:', response)
  return response.data
}

export default {getAll, getUser, create, login, logout}
