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

/// loading
export const loading = () => {
    return {
      type:LOGOUT
    }
    return type:LOADING
}

/// registerSuccess
export const registerSuccess = () => {
    return {
      type:LOGOUT
    }
    return type:REGISTER_SUCCESS
}

/// registerFailed
export const registerFailed = (error) => {
    return {
      type:LOGOUT
    }
    return type:REGISTER_FAILED
}

/// loginSuccess
export const loginSuccess = (token) => {
    return type:LOGIN_SUCCESS,
    token:token
}

/// loginFailed
export const loginFailed = () => {
    return type:LOGIN_FAILED
}

/// logoutSuccess
export const logoutSuccess = () => {
    return type:LOGOUT_SUCCESS
}

/// logoutFailed
export const logoutFailed = (error) => {
    return {
      type:LOGOUT
    }
}
