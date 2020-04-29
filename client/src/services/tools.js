/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Tukipalvelut: tools -komponentti
/// Paul Kallio 29.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------

// 2020-04-24T10:01:50.607Z
export const finnishDate = (pvmStr) => {
  if(pvmStr) {
    const pvm = new Date(pvmStr)
    return pvm.toUTCString()
  }
  return ''
}
