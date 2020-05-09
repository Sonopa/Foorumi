/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Huomio -komponentti sisältää huomioruudun käsittelyn
/// Paul Kallio 26.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React from 'react'
import {Message} from 'semantic-ui-react'

/// Viesti ilmoitus tyypit, Huomio ikkunaa varten
export const messageTypes = {
  INFO:     'info',
  WARNING:  'warning',
  ERROR:    'negative',
  CLOSE:    'close'
}

/// Viesti ilmoitusten näyttöajat, Huomio ikkunaa varten
export const messageTime = {
  SHORT:    2000,
  NORMAL:   3000,
  LONG:     5000,
  EXTRA:    8000,
  SUPER:   10000,
}

/// Info ruutu Viesti -ikkunaan
const Info = ({teksti}) =>  (
  <Message
    info
    content={teksti} />
)

/// Varoitus ruutu Viesti -ikkunaan
const Warning = (props) => (
  <Message
    warning
    content={props.teksti} />
)

/// Virhe ruutu Viesti -ikkunaan
const Error = (props) => (
  <Message
    negative
    content={props.teksti} />
)

/// Viesti -ikkunan valinta viestityypin eprusteella.
const Huomio = ({teksti, tyyppi}) =>  {
  switch(tyyppi) {
    case messageTypes.ERROR:
      return <Error teksti={teksti} />
    case messageTypes.WARNING:
      return <Warning teksti={teksti} />
    case messageTypes.INFO:
      return <Info teksti={teksti} />
    default:
      return null
  }
}

export default Huomio
