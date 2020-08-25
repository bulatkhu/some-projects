import React from 'react'
import './features.scss'
import feature1 from '../../../../../src/images/landing/features/feature1.svg'
import feature2 from '../../../../../src/images/landing/features/feature2.svg'
import feature3 from '../../../../../src/images/landing/features/feature3.svg'
import feature4 from '../../../../../src/images/landing/features/feature4.svg'
import feature5 from '../../../../../src/images/landing/features/feature5.svg'
import feature6 from '../../../../../src/images/landing/features/feature6.svg'
import feature7 from '../../../../../src/images/landing/features/feature7.svg'
import feature8 from '../../../../../src/images/landing/features/feature8.svg'
import feature9 from '../../../../../src/images/landing/features/feature9.svg'
import feature10 from '../../../../../src/images/landing/features/feature10.svg'
import feature11 from '../../../../../src/images/landing/features/feature11.svg'
import feature12 from '../../../../../src/images/landing/features/feature12.svg'
import feature13 from '../../../../../src/images/landing/features/feature13.svg'
import feature14 from '../../../../../src/images/landing/features/feature14.svg'
import feature15 from '../../../../../src/images/landing/features/feature15.svg'
import FeatureBox from '../../../landing/components/FeatureBox/FeatureBox'

const FeatureBoxes = [
  {title: 'ҰБТ', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in nam sed bibendum.'},
  {title: 'НЗМ', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in nam sed bibendum.'},
  {title: 'БИЛ', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in nam sed bibendum.'},
]

const FeatureItems = [
  {text: 'Ең мықты ұстаздар', img: feature1},
  {text: '24/7 Көмек', img: feature2},
  {text: 'Өзіміздің оқулықтар', img: feature3},
  {text: 'Онлайн кураторлық', img: feature4},
  {text: 'Авторлық методика', img: feature5},
  {text: 'Тегін деңгей анықау сынағы', img: feature6},
  {text: 'Сапалы видео сабақтар', img: feature7},
  {text: 'EduCoin', img: feature8},
  {text: 'Live вебинар', img: feature9},
  {text: 'Жеке кабинетр', img: feature10},
  {text: 'Профориентология', img: feature11},
  {text: 'Тест анализ', img: feature12},
  {text: 'Тақырыптық тесттер', img: feature13},
  {text: 'Айлық байқау сынақтары', img: feature14},
  {text: 'Айлық байқау сынақтары', img: feature15},
]

const Features = () => {

  return (
    <section className="features">

      <div className="features__container _container">
        <div className="features__content">
          {FeatureBoxes.map((item, index) => (
            <FeatureBox
              key={index}
              icon={item.icon}
              title={item.title}
              text={item.text}
            />
          ))}
        </div>

        <h3 className="features__title">Біздің артықшылықтарымыз</h3>

        <div className="features__secContent secContent">

          {FeatureItems.map((item, index) => {

            return (
              <div className="secContent__item" key={index + item.img}>
                <div className="secContent__img">
                  <img src={item.img} alt="feature 1"/>
                </div>

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