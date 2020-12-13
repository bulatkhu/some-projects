import React, {useEffect, useRef, useState} from 'react'
import Slider from 'react-slick'
import {apiGetTeachers} from '../../../../request/apiTeacher'
import {getFromUserMeta} from '../../../../scripts/dataHandler/dataHandler'
import {SITE_BASE_URL} from '../../../../app.config'
import NoPhoto from '../../../../images/general/noPhoto/noPhoto'
import Loader from '../../../general/component/loader/loader'
import 'slick-carousel/slick/slick.css'
import './teachersSlider.scoped.scss'

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

const teachersToShowList = teachers => {
  return teachers.map(({id, user}) => {
    const avatar = getFromUserMeta(user, 'avatar')
    const img = avatar ? SITE_BASE_URL + avatar : null
    return {
      id: id,
      name: user.username,
      img,
      subject: user.subject
    }
  })
}

const TeachersSlider = () => {
  const refToSlider = useRef(null)
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    apiGetTeachers()
      .then(res => {
        setLoading(false)
        if (!res.error && res.data.teachers.length) {
          setTeachers(teachersToShowList(res.data.teachers))
        }
      })

  }, [])


  return (
    <section className="teachers">

      <h2 className="teachers__title">Ұстаздарымыз</h2>

      <div className="teachers__container _container">

        {
          loading
            ? <Loader container/>
            : <div className="teachers__slider slider">

            <button
              onClick={() => refToSlider.current.slickPrev()}
              className="teachers__btn btn btn__prev btn__noFocus"
            >prev
            </button>

            <Slider ref={refToSlider} {...settings}>
              {teachers.map((item, index) => {

                return (
                  <div key={index} className="slider__item">
                    <div className="slider__wrapper">
                      <div className="slider__img">
                        {
                          item.img
                            ? <img src={item.img} alt="teacher"/>
                            : <NoPhoto/>
                        }
                      </div>
                      <h4 className="slider__name">{item.name}</h4>

                      {
                        item.subject
                          ? <p className="slider__subject">{item.subject}</p>
                          : null
                      }
                    </div>
                  </div>
                )
              })}

            </Slider>

            <button
              onClick={() => refToSlider.current.slickNext()}
              className="teachers__btn btn btn__next btn__noFocus"
            >next
            </button>

          </div>
        }

      </div>
    </section>
  )

}

export default TeachersSlider
