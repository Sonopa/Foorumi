/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Tukipalvelut: kit -komponentti
/// Paul Kallio 29.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
// import React from 'react'
// import AnalogueClock from 'react-analogue-clock';
//    "styled-components": "^5.1.0"

/// FinnishDate - muotoiltu päivämääräkenttä
export const finnishDate = (pvmStr) => {
  if(pvmStr) {
    const pvm = new Date(pvmStr)
    return pvm.toLocaleString('fi-FI')
  }
  return ''
}

/* Analoginen Kello
export const Kello = () => {
  const clockOptions = {
      baseColor: '#ffffff',
      borderColor: '#000000',
      borderWidth: 1,
      centerColor: '#000000',
      handColors: {
          hour: '#000000',
          minute: '#000000',
          second: '#000000',
      },
      notchColor: '#000000',
      numbersColor: '#000000',
      showNumbers: false,
      size: 200
  }

  return (<AnalogueClock {...clockOptions} />)
} */
