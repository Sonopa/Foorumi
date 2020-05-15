/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Tukipalvelut: choice -toiminnot
/// Paul Kallio 14.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------

/// like -rakennen like: yes/no
export const choice = {
  PUOLESTA: 'Kyllä',
  VASTAAN:  'Ei'
}

/// createVote - Luo Puolesta tai Vastaan -objecti.
export function createVote(choice) {
    return {choice: choice}
}

/// createFor - Luo Puolesta -objecti.
export function createFor() {
    return {choice: choice.PUOLESTA}
}

/// createAgainst - Luo Vastaan -objecti.
export function createAgainst () {
    return {choice: choice.VASTAAN}
}

/// hasVoted - tarkistaa, onko äänestänyt.
export function hasVoted(voterId, voters) {

    if(voters && Array.isArray(voters)) {
      if(voters.findIndex(item => item === voterId) >= 0) {
        return true
      }
    }

    return false
}
