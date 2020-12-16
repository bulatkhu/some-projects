import React from 'react'
import Main from './containers/main/main'
import Features from './containers/features/features'
import Courses from './containers/courses/courses'
import TeachersSlider from './containers/teachersSlider/teachersSlider'
import EduCoin from './containers/educoin/educoin'
import Rating from './containers/rating/rating'
import Progress from './containers/progress/progress'
// import Literacy from './containers/literacy/literacy'
import Prices from './containers/prices/prices'
import SocialLinks from './containers/socialLinks/socialLinks'
import Playlist from './containers/playlist/playlist'

const Landing = ({showArrow}) => {

  return (
    <>
      <Main/>
      <Features/>
      <Courses/>
      <Playlist/>
      <Prices/>
      <EduCoin/>
      <Rating/>
      <TeachersSlider/>
      <Progress/>
      {
        showArrow
          ? <SocialLinks/>
          : null
      }
    </>
  )
}

export default Landing
