import React, {Suspense, lazy} from 'react'
import Main from './containers/main/main'
import Features from './containers/features/features'
import Courses from './containers/courses/courses'
import TeachersSlider from './containers/teachersSlider/teachersSlider'
import EduCoin from './containers/educoin/educoin'
import Rating from './containers/rating/rating'
import Progress from './containers/progress/progress'
import Prices from './containers/prices/prices'
import SocialLinks from './containers/socialLinks/socialLinks'
import Loader from '../general/component/loader/loader'


const LazyCourses = lazy(() => new Promise(resolve => {
  setTimeout(() => {
    resolve({
      default: () => <Courses/>
    })
  }, 4000)
}))

const LazyTeachersSlider = lazy(() => new Promise(resolve => {
  setTimeout(() => {
    resolve({
      default: () => <TeachersSlider/>
    })
  }, 8000)
}))

const Landing = () => {

  return (
    <>
      <Main/>
      <Features/>
      <Suspense fallback={<Loader container/>}>
        <LazyCourses/>
      </Suspense>
      <Prices/>
      <EduCoin/>
      <Rating/>
      <Suspense fallback={<Loader container/>}>
        <LazyTeachersSlider/>
      </Suspense>
      <Progress/>
      <SocialLinks/>
    </>
  )
}

export default Landing
