import React from 'react'
import progressImg1 from '../../../images/progress/progress-img1.png'
import progressImg2 from '../../../images/progress/progress-img2.png'
import progressImg3 from '../../../images/progress/progress-img3.png'
import './progress.scss'

const Progress = () => {

  return (
    <section className="progress">

      <div className="progress__container _container">
        <h2 className="progress__title">Біздің жетістіктеріміз</h2>

        <p className="progress__subtitle">
          Бізді таңдап, бізге сенім артқандарыңыз ары қарай дамуымыз үшін жігер береді. Әрбір жеткен жетістігімізді мақтан тұтамыз.
        </p>

        <div className="progress__content">

          <div className="progress__column progColumn">
            <div className="progColumn__title">Видеосабақтарымыз</div>
            <div className="progColumn__box">
              <div className="progColumn__img">
                <img src={progressImg1} alt="progress"/>
              </div>
              <div className="progColumn__number">500+</div>
            </div>
          </div>

          <div className="progress__column progColumn">
            <div className="progColumn__title">Оқушыларымыз</div>
            <div className="progColumn__box">
              <div className="progColumn__img">
                <img src={progressImg2} alt="progress"/>
              </div>
              <div className="progColumn__number colorRed">45K+</div>
            </div>
          </div>

          <div className="progress__column progColumn">
            <div className="progColumn__title">Видеошешімі бар тесттеріміз</div>
            <div className="progColumn__box">
              <div className="progColumn__img">
                <img src={progressImg3} alt="progress"/>
              </div>
              <div className="progColumn__number">8000+</div>
            </div>
          </div>


        </div>
      </div>

    </section>
  )
}

export default Progress