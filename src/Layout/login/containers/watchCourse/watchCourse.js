import React from 'react'
import './watchCourse.scoped.scss'
import VideoPlayer from '../../../general/videoPlayer/videoPlayer'
import Stars from "../../../general/stars/stars";

const playersProps = [
  {
    title: 'Функция',
    players: [
      {text: 'Ac massa turpis quisque.', time: '02:25', progress: 37, link: '/'},
      {text: 'Ac massa turpis quisque.', time: '02:25', progress: 50, link: '/'},
      {text: 'Ac massa turpis quisque.', time: '02:25', progress: 21, link: '/'},
    ]
  },
  {
    title: 'Термодинамика',
    players: [
      {text: 'Ac massa turpis quisque.', time: '02:25', progress: 1, link: '/'}
    ]
  },
  {
    title: 'Сандық сипаттамалар',
    players: [
      {text: 'Ac massa turpis quisque.', time: '02:25', progress: 14, link: '/'},
      {text: 'Ac massa turpis quisque.', time: '02:25', progress: 28, link: '/'},
      {text: 'Ac massa turpis quisque.', time: '02:25', progress: 99, link: '/'},
      {text: 'Ac massa turpis quisque.', time: '02:25', progress: 99, link: '/'},
    ]
  },
  {
    title: 'Тригонометрия',
    players: [
      {text: 'Ac massa turpis quisque.', time: '02:25', progress: 12, link: '/'},
      {text: 'Ac massa turpis quisque.', time: '02:25', progress: 32, link: '/'},
    ]
  }
]


const Course = () => {

  const onButtonClick = event => {
    event.target.classList.toggle('active')
    const panel = event.target.nextElementSibling
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }

  return (
    <section className="course">



      <div className="course__content">

        <div className="course__column">
          <div className="lesson__playerWrapper">
            <VideoPlayer
              className="lesson__video"
            />
          </div>

          <div className="course-panel">

            <div className="course-panel__column">
              <Stars rating={4} className="course-panel__stars" classNameOfValue="hidden"/>
            </div>

            <div className="course-panel__column">

            </div>

          </div>
        </div>
        <div className="course__column">
          <div className="accordion">

            <div className="accordion__content">
              <h1 className="accordion__title">Мазмұны</h1>
            </div>

            {playersProps.map((item, key) => {

              return (
                <div key={key + item.title} className="accordion__wrapper">
                  <div onClick={onButtonClick} id="accordion__item" className="accordion__top">
                    {item.title}
                  </div>
                  <div  className="accordion__bottom accorBot">
                    {item.players.map((item1, key1) => (
                      <div key={key1} className="accorBot__wrapper">
                        <a href={item1.link} className="accorBot__icon">&nbsp;</a>
                        <div className="accorBot__content">

                          <div className="accorBot__text">{item1.text}</div>
                          <div className="accorBot-progress clearFix">
                            <div className="accorBot-progress__line">
                              <span style={{width: item1.progress + '%'}}/>
                            </div>
                            <span className="accorBot-progress__number">{item1.progress}%</span>
                          </div>
                          <div className="accorBot-test">
                            <div className="accorBot-test__text">Тақырыптық тест</div>
                            <input type="checkbox"/>
                          </div>

                        </div>
                        <div className="accorBot__time">{item1.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}

          </div>
        </div>

      </div>


    </section>
  )
}

export default Course