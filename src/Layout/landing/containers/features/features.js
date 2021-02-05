import React from 'react'
import feature1 from '../../../../../src/images/landing/features/feature1.svg'
import feature2 from '../../../../../src/images/landing/features/feature2.svg'
import feature3 from '../../../../../src/images/landing/features/feature3.svg'
import feature4 from '../../../../../src/images/landing/features/feature4.svg'
import feature5 from '../../../../../src/images/landing/features/feature5.svg'
import feature6 from '../../../../../src/images/landing/features/feature6.svg'
import feature7 from '../../../../../src/images/landing/features/feature7.svg'
import feature8 from '../../../../../src/images/landing/features/feature8.svg'
import feature9 from '../../../../../src/images/landing/features/feature9.svg'
import { Translate as ReactTranslate } from 'react-translated'
import './features.scss'

const FeatureItems = [
  {
    text: <ReactTranslate text="Ұстаздар 15 жылдық тәжірибесі бар,"/>,
    title: <ReactTranslate text="Ұстаздар"/>, img: feature1
  },
  {
    text: <ReactTranslate text="Видео сабақтар Видео сабақтар Заманауи."/>,
    title: <ReactTranslate text="Видео сабақтар"/>, img: feature2
  },
  {
    text: <ReactTranslate text="Онлайн кураторлық Онлайн кураторлық"/>,
    title: <ReactTranslate text="Online curator"/>, img: feature3
  },
  {
    text: <ReactTranslate text="Оқу құралдары Оқу құралдары «EduCon» "/>,
    title: <ReactTranslate text="Textbooks"/>, img: feature4
  },
  {
    text: <ReactTranslate text="Live вебинар Live вебинар Тікелей эфирдегі"/>,
    title: 'Live вебинар', img: feature5
  },
  {
    text: <ReactTranslate text="Тақырыптық тесттер Әр видеосабақтан"/>,
    title: <ReactTranslate text="Тақырыптық тесттер"/>, img: feature6
  },
  {
    text: <ReactTranslate text="EduCoin Ындаландыру арқылы білім беру"/>,
    title: 'EduCoin', img: feature7
  },
  {
    text: <ReactTranslate text="Профориентология Кәсіби профориентолог"/>,
    title: 'Профориентология', img: feature8
  },
  {
    text: <ReactTranslate text="Тест видео шешімдері Порталдағы "/>,
    title: <ReactTranslate text="Тест видео шешімдері"/>, img: feature9
  },
]

const Features = () => {

  return (
    <section id="features" className="features">

      <div className="features__container _container">
        <h3 className="features__title">
          <span><ReactTranslate text="Неліктен EduCon.online?"/></span>
        </h3>

        <div className="features__secContent secContent">

          {FeatureItems.map((item, index) => {

            return (
              <div className="secContent__item" key={index + item.img}>
                <div className="secContent__img">
                  <img src={item.img} alt="feature 1"/>
                </div>

                <h3 className="secContent__title">
                  {item.title}
                </h3>

                <p className="secContent__text">
                  {item.text}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features
