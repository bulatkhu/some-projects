import React from 'react'
import Slider from 'react-slick'
import {Translate} from 'react-translated'
import progressImg1 from '../../../../images/landing/progress/progress-img1.png'
import progressImg2 from '../../../../images/landing/progress/progress-img2.png'
import progressImg3 from '../../../../images/landing/progress/progress-img3.png'
import progressImg4 from '../../../../images/landing/progress/progress-img4.png'
import progressImg5 from '../../../../images/landing/progress/progress-img5.png'
import progressImg6 from '../../../../images/landing/progress/progress-img6.png'
import 'slick-carousel/slick/slick.css'
import './progress.scss'

const sliders = [
  {img: progressImg1},
  {img: progressImg2},
  {img: progressImg3},
  {img: progressImg4},
  {img: progressImg5},
  {img: progressImg6},
  {img: progressImg1},
  {img: progressImg2},
  {img: progressImg3},
  {img: progressImg4},
  {img: progressImg5},
  {img: progressImg6},
]


const settings = {
  swipeToSlide: 'true',
  focusOnSelect: 'true',
  className: 'center',
  lazyLoad: true,
  infinite: true,
  button: false,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 4000,
  slidesToShow: 6,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        lazyLoad: true,
      }
    },
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerPadding: '50px',
        className: 'center',
        centerMode: true,
        initialSlide: 0,
        lazyLoad: true,
      }
    },
    {
      breakpoint: 569,
      settings: {
        slidesToShow: 1,
        lazyLoad: true,
        slidesToScroll: 1
      }
    }
  ]
}


const Progress = () => {

  return (
    <section id="progress" className="progress">

      <div className="progress__container _container">
        <h2 className="progress__title"><Translate text="Серіктестеріміз"/></h2>

        <div className="progress__slider">

          <Slider {...settings}>
            {sliders.map((item, index) => (
              <div key={index} className="progress__slide">
                <img src={item.img} alt="progress"/>
              </div>
            ))}
          </Slider>

        </div>

      </div>

    </section>
  )
}

export default Progress
