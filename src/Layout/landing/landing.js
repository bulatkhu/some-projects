import React from 'react'
import Main from './containers/main/main'
import Features from './containers/features/features'
import Courses from './containers/courses/courses'
import TeachersSlider from './containers/teachersSlider/teachersSlider'
import EduCoin from './containers/educoin/educoin'
import Rating from './containers/rating/rating'
import Progress from './containers/progress/progress'
import Prices from './containers/prices/prices'
import SocialLinks from './containers/socialLinks/socialLinks'

const Landing = () => {

  return (
    <>
      <Main/>
      <Features/>
      <Courses/>
      <Prices/>
      <EduCoin/>
      <Rating/>
      <TeachersSlider/>
      <Progress/>
      <SocialLinks/>
    </>
  )
}

export default Landing
