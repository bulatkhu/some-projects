import React from 'react'
import photo1 from '../../../images/teachers/teacher-photo1.jpg'
import photo2 from '../../../images/teachers/teacher-photo2.jpg'
import photo3 from '../../../images/teachers/teacher-photo3.jpg'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './teachers.scss'

const Teachers = () => {

  const settings = {
    swipeToSlide: 'true',
    focusOnSelect: 'true',
    centerPadding: '30px',
    className: 'center',
    centerMode: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          lazyLoad: true,
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '50px',
          className: 'center',
          centerMode: true,
          initialSlide: 0,
          lazyLoad: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          lazyLoad: true,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <section className="teachers">

      <h2 className="teachers__title">Ұстаздарымыз</h2>

      <div className="teachers__container _container">

        <div className="teachers__slider slider">
          <Slider {...settings}>
            <div className="slider__item">
              <div className="slider__item__wrapper">
                <img src={photo1} alt="teacher"/>
              </div>
              <h4 className="slider__item__name">Teacher Name</h4>
            </div>
            <div className="slider__item">
              <div className="slider__item__wrapper">
                <img src={photo2} alt="teacher"/>
              </div>
              <h4 className="slider__item__name">Teacher Name</h4>
            </div>
            <div className="slider__item">
              <div className="slider__item__wrapper">
                <img src={photo3} alt="teacher"/>
              </div>
              <h4 className="slider__item__name">Teacher Name</h4>
            </div>

            <div className="slider__item">
              <div className="slider__item__wrapper">
                <img src={photo1} alt="teacher"/>
              </div>
              <h4 className="slider__item__name">Teacher Name</h4>
            </div>
            <div className="slider__item">
              <div className="slider__item__wrapper">
                <img src={photo2} alt="teacher"/>
              </div>
              <h4 className="slider__item__name">Teacher Name</h4>
            </div>
            <div className="slider__item">
              <div className="slider__item__wrapper">
                <img src={photo3} alt="teacher"/>
              </div>
              <h4 className="slider__item__name">Teacher Name</h4>
            </div>

            <div className="slider__item">
              <div className="slider__item__wrapper">
                <img src={photo1} alt="teacher"/>
              </div>
              <h4 className="slider__item__name">Teacher Name</h4>
            </div>
            <div className="slider__item">
              <div className="slider__item__wrapper">
                <img src={photo2} alt="teacher"/>
              </div>
              <h4 className="slider__item__name">Teacher Name</h4>
            </div>
            <div className="slider__item">
              <div className="slider__item__wrapper">
                <img src={photo3} alt="teacher"/>
              </div>
              <h4 className="slider__item__name">Teacher Name</h4>
            </div>
          </Slider>
        </div>

      </div>
    </section>
  )

}

export default Teachers
