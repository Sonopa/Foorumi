/// ---------------------------------
/// Foorumi Sovellus: Frontend
/// Etusivu -komponentti
/// Paul Kallio 18.4.2020
/// Opiframe FullStack 2020-1 Espoo
/// ---------------------------------
import React from 'react'
import {CarouselProvider, Slider, Slide} from 'pure-react-carousel'
import {Image, Container} from 'semantic-ui-react'

import 'pure-react-carousel/dist/react-carousel.es.css'
// const logger = require('simple-console-logger').getLogger('Etusivu')

const Etusivu = (props) => {

	return (
    <Container>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={3}
        isPlaying={true}
        infinite={true}>
        <Slider>
          <Slide index={0}><Image src='hki_guggenheim.jpg' size='massive' /></Slide>
          <Slide index={1}><Image src='kauprovani.jpg' size='massive' /></Slide>
          <Slide index={2}><Image src='espoon_kaupunki.jpg' size='massive' /></Slide>
        </Slider>
      </CarouselProvider>
    </Container>
  )
}

export default Etusivu
