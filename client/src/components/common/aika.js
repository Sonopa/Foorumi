/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Tukipalvelut: kit -komponentti
/// Paul Kallio 29.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
// import AnalogueClock from 'react-analogue-clock';
import styled from 'styled-components'

/// FinnishDate - muotoiltu päivämääräkenttä
export const finnishDate = (pvmStr) => {
  if(pvmStr) {
    const pvm = new Date(pvmStr)
    return pvm.toLocaleString('fi-FI')
  }
  return ''
}

/// DigiKellon ohjaustiedot ja tyyli
const SEKUNTTI = 1000
const LOKAALI_FINLAND = 'it-IT'
const WATCHDiv = styled.div`
  font-size: 1.5em;
  color: #606060;
  float: right;
  line-height: 1.55em;
  text-align: center;
  border-width: 1px;
  border-style: solid;
  border-color: #404040;
  padding: 2px 10px 2px 10px;
  border-radius: 5px;
`
/// Digitaalinen Kello
export class DigiKello extends Component {

    /// constructor
    constructor(props) {
      super(props)
      this.state = {
        aika: new Date()
      }
    }

    /// componentWillUnmount
    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    /// componentDidMount
    componentDidMount() {
      this.timerID = setInterval(() => this.tick(), SEKUNTTI)
    }

    /// tick
    tick() {
      this.setState({aika: new Date()})
    }

    /// render
    render() {
      return(
        <WATCHDiv>{this.state.aika.toLocaleTimeString(LOKAALI_FINLAND)}</WATCHDiv>
      )
    }
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
