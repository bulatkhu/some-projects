import React from 'react'
import './lesson.scss'
import VideoPlayer from '../videoPlayer/videoPlayer'
import Slider from 'react-slick'

import teacherIcon from '../../../images/general/teacher/teacher-icon.jpg'
import likeIcon from '../../../images/general/lesson/like-icon.svg'
import eyeIcon from '../../../images/general/lesson/eye-icon.svg'
import shareIcon from '../../../images/general/lesson/share-icon.svg'

import mather1 from '../../../images/general/lesson/mather1.jpg'
import mather2 from '../../../images/general/lesson/mather2.jpg'
import mather3 from '../../../images/general/lesson/mather3.jpg'
import mather4 from '../../../images/general/lesson/mather4.jpg'
import mather5 from '../../../images/general/lesson/mather5.jpg'

const mathers = [
  {name: 'Teacher name', lesson: 'Math Lesson', img: mather1},
  {name: 'Teacher name', lesson: 'Math Lesson', img: mather2},
  {name: 'Teacher name', lesson: 'Math Lesson', img: mather3},
  {name: 'Teacher name', lesson: 'Math Lesson', img: mather4},
  {name: 'Teacher name', lesson: 'Math Lesson', img: mather5},
  {name: 'Teacher name', lesson: 'Math Lesson', img: mather1},
  {name: 'Teacher name', lesson: 'Math Lesson', img: mather2},
  {name: 'Teacher name', lesson: 'Math Lesson', img: mather3},
  {name: 'Teacher name', lesson: 'Math Lesson', img: mather4},
  {name: 'Teacher name', lesson: 'Math Lesson', img: mather5},
]


const Lesson = () => {
  const height = (1200 / 1.1).toFixed(0)

  console.log(height)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };


  return (
    <section className="lesson">

      <div className="lesson__root">

        <div className="lesson__content">

          <div className="lesson__column">
            <div className="lesson__playerWrapper">
              <VideoPlayer
                className="lesson__video"
              />
            </div>

            <div className="lesson-social">
              <div className="lesson-social__teacher">

                <div className="lesson-social__img">
                  <img src={teacherIcon} alt="teacher"/>
                </div>

                <div className="lesson-social__name">Teaher Name</div>

              </div>

              <div className="lesson-social__review">
                <a href="/" className="lesson-social__item lesson-social__like">
                  <div className="lesson-social__icon">
                    <img src={likeIcon} alt="icon"/>
                  </div>
                  <span className="lesson-social__number">9999</span>
                </a>
                <a href="/" className="lesson-social__item lesson-social__like">
                  <div className="lesson-social__icon">
                    <img src={eyeIcon} alt="icon"/>
                  </div>
                  <span className="lesson-social__number">9999</span>
                </a>
                <a href="/" className="lesson-social__item lesson-social__like">
                  <div className="lesson-social__icon">
                    <img src={shareIcon} alt="icon"/>
                  </div>
                  <span className="lesson-social__number">9999</span>
                </a>
              </div>
            </div>
          </div>

          <div className="lesson__column">
            <div className="lesson-chat">

              <ul className="lesson-chat__box">

                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>
                <li className="lesson-chat__msg"><span>Student :</span><span>Lorem Upsen</span></li>


              </ul>

              <form className="lesson-chat__add">

                <input name="message" type="text" className="lesson-chat__input"/>
                <button className="lesson-chat__button">Send</button>

              </form>

            </div>
          </div>

        </div>


        <div className="lesson-otherLessons">

          <h2 className="lesson-otherLessons__title">Other Masterclasses</h2>

          <div className="lesson-otherLessons__slider">
            <Slider {...settings}>
              {mathers.map((item, index) => {

                return (
                  <div className="lesson-otherLessons__wrap" key={index}>
                    <div className="lesson-otherLessons__item">

                      <div className="lesson-otherLessons__img">
                        <img src={item.img} alt="math lesson"/>
                      </div>

                      <div className="lesson-otherLessons__name">{item.name}</div>

                      <a href="/" className="lesson-otherLessons__match">{item.lesson}</a>

                    </div>
                  </div>
                )
              })}
            </Slider>
          </div>

        </div>


      </div>

    </section>
  )
}

export default Lesson