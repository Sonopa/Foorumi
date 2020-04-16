/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// KeskusteluRivi -komponentti
/// Paul Kallio 16.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React from 'react'
import {Feed, Icon} from 'semantic-ui-react'

const KeskusteluRivi = (props) => {
  return (
    <Feed>
      <Feed.Label>
        <Icon name='universal access' />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User>{props.nimi}</Feed.User> {props.otsikko}
          <Feed.Date>{props.aika}</Feed.Date>
        </Feed.Summary>
        <Feed.Extra text>{props.kommentti}
        </Feed.Extra>
        <Feed.Meta>
          <Feed.Like>
            <Icon name='like' />{props.like}
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
      <Feed>
      </Feed>
    </Feed>
  )
}

export default KeskusteluRivi
