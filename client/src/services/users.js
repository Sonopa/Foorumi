/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Taustapalvelut käyttäjät -services
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import axios from 'axios'

const baseUrl = '/api/Users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default {getAll}
