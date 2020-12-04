import React, {useRef} from 'react'
import Slider from 'react-slick'
import photo1 from '../../../../images/landing/teachers/teacher-photo1.jpg'
import 'slick-carousel/slick/slick.css'
import './teachers.scoped.scss'


const teacherList = [
  {img: photo1, name: 'Абзал Тойғанбаев', subject: 'Математика'},
  {img: photo1, name: 'Абзал Тойғанбаев', subject: 'Математика'},
  {img: photo1, name: 'Абзал Тойғанбаев', subject: 'Математика'},
  {img: photo1, name: 'Абзал Тойғанбаев', subject: 'Математика'},
  {img: photo1, name: 'Абзал Тойғанбаев', subject: 'Математика'},
]

const settings = {
  swipeToSlide: 'true',
  focusOnSelect: 'true',
  className: 'center',
  lazyLoad: true,
  button: false,
  speed: 500,
  slidesToShow: 4,
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


const Teachers = () => {
  const refToSlider = useRef(null)


  return (
    <section className="teachers">

      <h2 className="teachers__title">Ұстаздарымыз</h2>

      <div className="teachers__container _container">

        <div className="teachers__slider slider">

          <button
            onClick={() => refToSlider.current.slickPrev()}
            className="teachers__btn btn btn__prev btn__noFocus"
          >prev</button>

          <Slider ref={refToSlider} {...settings}>
            {teacherList.map((item, index) => {

              return (
                <div key={index} className="slider__item">
                  <div className="slider__wrapper">
                    <div className="slider__img">
                      <img src={item.img} alt="teacher"/>
                    </div>
                    <h4 className="slider__name">{item.name}</h4>

                    <p className="slider__subject">{item.subject}</p>
                  </div>
                </div>
              )
            })}

          </Slider>

          <button
            onClick={() => refToSlider.current.slickNext()}
            className="teachers__btn btn btn__next btn__noFocus"
          >next</button>

        </div>

      </div>
    </section>
  )

}

export default Teachers
