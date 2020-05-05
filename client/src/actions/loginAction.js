/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// loginAction -komponentti
/// Paul Kallio 5.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
export const REGISTER_SUCCESS = ""
export const REGISTER_FAILED = ""
export const LOGIN_SUCCESS = ""
export const LOGIN_FAILED = ""
export const LOGOUT_SUCCESS = ""

export const loading = () => {
    return {
      type:LOGOUT
    }
    return type:LOADING
}
export const registerSuccess = () => {
    return {
      type:LOGOUT
    }
    return type:REGISTER_SUCCESS
}
export const registerFailed = (error) => {
    return {
      type:LOGOUT
    }
    return type:REGISTER_FAILED
}
export const loginSuccess = (token) => {
    return type:LOGIN_SUCCESS,
    token:token
}
export const loginFailed = () => {
    return type:LOGIN_FAILED
}
export const logoutSuccess = () => {
    return type:LOGOUT_SUCCESS
}
export const logoutFailed = (error) => {
    return {
      type:LOGOUT
    }
}
