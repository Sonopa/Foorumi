/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// usersAction -komponentti
/// Paul Kallio 7.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
export const usersAction = {
  LOAD:   'loadUsers',
  ADD:    'addUsers',
  DELETE: 'deleteUsers',
  UPDATE: 'updateUsers'
}

export function loadUsers(users) {
  return {
    type: usersAction.LOAD,
    data: {
      users: users
    }
  }
}

export function addUsers(aihe) {
  return {
    type: usersAction.ADD,
    data: {
      aihe: aihe
    }
  }
}

export function deleteUsers(aihe) {
  return {
    type: usersAction.DELETE,
    data: {
      aihe: aihe
    }
  }
}

export function updateUsers(aihe) {
  return {
    type: usersAction.UPDATE,
    data: {
      aihe: aihe
    }
  }
}
