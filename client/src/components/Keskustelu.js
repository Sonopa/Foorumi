/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Keskustelu -komponentti sisältää Keskustelurivit
/// Paul Kallio 16.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React, {Component} from 'react'
import {Form, TextArea, Button, Segment, Divider} from 'semantic-ui-react'
import KeskusteluRivi from './KeskusteluRivi'
import keskusteluData from '../services/keskustelu'

const logger = require('simple-console-logger').getLogger('Keskustelu')

const LisaaLomake = (props) => {

  return(
    <Segment>
      <Form>
        <Form.Input label='Otsikko' name='otsikko' type='input' />
        <div class='field'>
          <label>Sanoma</label>
          <TextArea name='sanoma' />
        </div>
        <Divider horizontal hidden />
        <Button onClick={props.handleSave} primary>Tallenna</Button>
      </Form>
    </Segment>
  )
}

const KeskusteluForm = (props) => {

    return (
      <>
        {props.lisaaTila  ?
          <LisaaLomake handleSave={props.handleSave}/> :
          <Button onClick={props.handleAdd} primary>Lisää</Button>
        }
      </>
    )
}

class Keskustelu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      keskustelut: this.state ? this.state.keskustelut : [],
      oldAihe: this.state ? this.state.oldAihe : '',
      lisaaTila: this.state ? this.state.oldAihe : false
    }
  }

  componentWillMount() {
    if(this.state.oldAihe !== this.props.aihe) {
      this.setState({oldAihe: this.props.aihe})
      keskusteluData.getAll(this.props.aihe)
        .then(responseData => {
          logger.info('componentWillMount.responseData:', responseData)
          this.setState({keskustelut: responseData})
        })
    }
    return null;
  }

  updateKeskustelut = ()  => {
    if(this.state.oldAihe !== this.props.aihe) {
      this.setState({oldAihe: this.props.aihe})
      keskusteluData.getAll(this.props.aihe)
        .then(responseData => {
          logger.info('updateKeskustelut.responseData:', responseData)
          this.setState({keskustelut: responseData, lisaaTila: false})
        })
    }
  }

 componentDidUpdate() {
    logger.trace('componentDidUpdate.oldAihe:', this.state.oldAihe)
    this.updateKeskustelut()
  }

  render() {
    const keskusteluRivit = this.state.keskustelut.map(keskustelu => {
      return (<KeskusteluRivi key={keskustelu.id}
                              nimi={keskustelu.nimi}
                              otsikko={keskustelu.otsikko}
                              aika={keskustelu.aika}
                              kommentti={keskustelu.kommentti}
                              like={keskustelu.like} />)
    })

    const handleAdd = (e, {name}) => this.setState({lisaaTila: true})
    const handleSave = (e, {name}) => this.setState({lisaaTila: false})

    return (
      <div>
        <h1>Keskustelut</h1>
        {keskusteluRivit}
        <KeskusteluForm lisaaTila={this.state.lisaaTila} handleAdd={handleAdd} handleSave={handleSave} />
      </div>
    )
  }
}

export default Keskustelu
