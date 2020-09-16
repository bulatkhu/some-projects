import React from 'react'
import './watchCourse.scoped.scss'
import VideoPlayer from '../../../general/videoPlayer/videoPlayer'


const course = () => {

  // const styles = {
  //   width: '100%',
  //   height: '100%'
  // }

  return (
    <section className="course">



      <div className="course__content">

        <div className="course__column">
          <div className="lesson__playerWrapper">
            <VideoPlayer
              className="lesson__video"
            />
          </div>
        </div>
        <div className="course__column">
          <div className="accordion">

            <div className="accordion__content">
              <h1 className="accordion__title">Мазмұны</h1>
            </div>
            <div className="accordion__wrapper">
              <div className="accordion__item">
                <div className="accordion__top">Функция</div>
                <div className="accordion__bottom accorBot">
                  <div className="accorBot__wrapper">
                    <a href="/" className="accorBot__icon">afsd</a>
                    <div className="accorBot__content">

                      <div className="accorBot__text">Ac massa turpis quisque.</div>
                      <div className="accorBot-progress clearFix">
                        <div className="accorBot-progress__line">
                          <span style={{width: 37}}/>
                        </div>
                        <span className="accorBot-progress__number">37%</span>
                      </div>
                      <div className="accorBot-test">
                        <div className="accorBot-test__text">Тақырыптық тест</div>
                        <input type="checkbox"/>
                      </div>

                    </div>
                    <div className="accorBot__time">02:25</div>
                  </div>
                  <div className="accorBot__wrapper">
                    <a href="/" className="accorBot__icon">afsd</a>
                    <div className="accorBot__content">

                      <div className="accorBot__text">Ac massa turpis quisque.</div>
                      <div className="accorBot-progress clearFix">
                        <div className="accorBot-progress__line">
                          <span style={{width: 37}}/>
                        </div>
                        <span className="accorBot-progress__number">37%</span>
                      </div>
                      <div className="accorBot-test">
                        <div className="accorBot-test__text">Тақырыптық тест</div>
                        <input type="checkbox"/>
                      </div>

                    </div>
                    <div className="accorBot__time">02:25</div>
                  </div>
                  <div className="accorBot__wrapper">
                    <a href="/" className="accorBot__icon">afsd</a>
                    <div className="accorBot__content">

                      <div className="accorBot__text">Ac massa turpis quisque.</div>
                      <div className="accorBot-progress clearFix">
                        <div className="accorBot-progress__line">
                          <span style={{width: 37}}/>
                        </div>
                        <span className="accorBot-progress__number">37%</span>
                      </div>
                      <div className="accorBot-test">
                        <div className="accorBot-test__text">Тақырыптық тест</div>
                        <input type="checkbox"/>
                      </div>

                    </div>
                    <div className="accorBot__time">02:25</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>


    </section>
  )
}

export default course