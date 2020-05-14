/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Tukipalvelut: Like -toiminnot
/// Paul Kallio 14.5.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------

/// like -rakennen like: yes/no
export const like = {
  LIKE:   'yes',
  HATE:   'no'
}

/// createOpinion - Luo Like/Hate -objecti.
export function createOpinion(like) {
    return {like: like}
}

/// createLike - Luo Like -objecti.
export function createLike() {
    return {like: like.LIKE}
}

/// createHate - Luo Hate -objecti.
export function createHate () {
    return {like: like.HATE}
}
