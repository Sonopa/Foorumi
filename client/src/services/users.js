/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Taustapalvelut: käyttäjät -services
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import axios from 'axios'
import {storeSession, removeSession, getAuth} from './session'

const userUrl = '/users'
const registerUrl = '/register'
const loginUrl = '/login'
const logoutUrl = '/logout'
const logger = require('simple-console-logger').getLogger('users')

const getAll = () => {
  const request = axios.get(userUrl)
  return request.then(response => response.data)
}

const getUser = (id) => {
  const request = axios.get(`${userUrl}/${id}`)
  logger.info('axios.getUser', `${userUrl}/${id}`)
  return request.then(response => response.data)
}

/// Create method
const create = async (newObject) => {
  const response = await axios.post(`${registerUrl}`, newObject)
  logger.info('axios.create', `${registerUrl}`, newObject, response)
  return response.data
}

/// Update method
const update = async (userId, newObject) => {
  const response = await axios.post(`${userUrl}/${userId}`, newObject, getAuth())
  logger.info('axios.update', `${userUrl}/${userId}`, newObject, response)
  return response.data
}

/// Delete method
const remove = async (userId) => {
  const response = await axios.delete(`${userUrl}/${userId}`, getAuth())
  logger.info('axios.delete:', `${userUrl}/${userId}`, response)
  return response.data
}

/// Login method
const login = async (newObject) => {
  const response = await axios.post(`${loginUrl}`, newObject)
  logger.info('axios.login', `${loginUrl}`, newObject, response)
  const user = {
    token: response.data.token,
    username: newObject.username
  }
  storeSession(user, response.data.id)
  return response.data
}

/// Logout method
const logout = async (newObject) => {
  removeSession(newObject)
  const response = await axios.post(`${logoutUrl}`, newObject, getAuth())
  logger.info('axios.logout.Url:', `${logoutUrl}`, newObject, response)
  return response.data
}

export default {getAll, getUser, create, update, remove, login, logout}
