/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Login -komponentti
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React from 'react'
import {Segment, Form, Button, Container} from 'semantic-ui-react'

const LoginForm = (props) => {
    return (
      <Form>
        <Form.Input label='Tunnus' name='tunnus' type='input' />
        <Form.Input label='Salasana' name='salasana' type='password' />
        <Button primary>Kirjaudu</Button>
      </Form>
    )
}

const Login = () => {
  return (
    <Container>
      <Segment compact raised>
        <h1>Anna käyttäjätiedot</h1>
        <LoginForm />
      </Segment>
    </Container>
  )
}

export default Login
