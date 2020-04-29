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
  // OK TEST DUMMY Start
  /* const users = [
         {"id": "1",
          "username":"testi",
          "password":"sala1234",
          "name":"Testi Käyttäjä",
          "email": "testi.@userit.orc"},
         {"id": "1001",
          "username":"simppe",
          "password":"sala1234",
          "name":"Simo the Manager",
          "email": "simo@userit.orc"}]
  return  new Promise(function (resolve, reject) {
      resolve(users)
  })
  // OK TEST DUMMY End
  /* ERROR TEST Start
  const virhe = new Error("Tietokanta on alhalla. Ota yhteys tukeen 09-123123.")
  return  new Promise(function (resolve, reject) {
      reject(virhe)
  })
  // ERROR TEST End */

  const request = axios.get(baseUrl) // THIS IS REAL USERS RESQUEST
  return request.then(response => response.data) // THIS IS REAL USERS RESQUEST
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
  storeSession(user)
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

export default {getAll, create, login, logout}
