/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Huomio -komponentti sisältää huomioruudun käsittelyn
/// Paul Kallio 26.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React from 'react'
import {Message} from 'semantic-ui-react'

export const messageTypes = {
  INFO:     'info',
  WARNING:  'warning',
  ERROR:    'negative',
  CLOSE:    'close'
}

export const messageTime = {
  SHORT:    2000,
  NORMAL:   3000,
  LONG:     5000,
  EXTRA:    8000,
  SUPER:   10000,  
}

const Info = ({teksti}) =>  (
  <Message
    info
    content={teksti} />
)

const Warning = (props) => (
  <Message
    warning
    content={props.teksti} />
)

const Error = (props) => (
  <Message
    negative
    content={props.teksti} />
)

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
