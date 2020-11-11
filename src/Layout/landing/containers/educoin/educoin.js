import React, {useState, useRef, useEffect} from 'react'
import studentIcon from '../../../../images/landing/educoin/student.svg'
import arcIcon from '../../../../images/landing/educoin/eduCoin.svg'
import giftIcon from '../../../../images/landing/educoin/gift.svg'
import './educoin.scss'

const EduCoin = () => {
  const [showModal, setShowModal] = useState(false)
  const refToOverlay = useRef(null)

  useEffect(() => {
    const $body = document.querySelector('body')

    if (showModal) {
      $body.classList.add('scroll-locked')
    } else {
      $body.classList.remove('scroll-locked')
    }

  }, [showModal])

  const toggleModalEduCoin = event => {
    if (event.target.classList.contains('educoin__button')) {
      setShowModal(prev => !prev)
    }
  }

  const crossClickHandler = () => {
    setShowModal(() => false)
  }

  const overlayClickHandler = event => {
    if (event.target === event.currentTarget) {
      setShowModal(() => false)
    }
  }

  const modalCLS = ['modalCoin__overlay']

  if (showModal) {
    modalCLS.push('active')
  }

  return (
    <section className="educoin" >

      <div className="educoin__container _container">

        <h2 className="educoin__title">EduCoin</h2>

        <p className="educoin__subTitle">Ынталандыру арқылы білім беру жүйесі</p>

        <div className="educoin__content">

          <div className="educoin__column eduComp">
            <div className="eduComp__box styleBlue">

              <div className="eduComp__arc">
                <div className="eduComp__wrapper">
                  <div className="eduComp__img">
                    <img src={studentIcon} alt="student"/>
                  </div>
                </div>
              </div>

              <div className="eduComp__text coins1">

                <div className="coins1__description">
                  <div className="coins1__title">Білім ал</div>
                  <div className="coins1__text">
                    Порталға тіркеліп, білім ал. Алған әсеріңмен бөліс. Нәтижелеріңді жаңарт. Жетістікке жет.
                  </div>
                </div>

                <div className="coins1__number">
                  1
                </div>

                <div className="coins1__circle"/>
              </div>
            </div>
          </div>

          <div className="educoin__column eduComp">
            <div className="eduComp__box styleRed">

              <div className="eduComp__arc">
                <div className="eduComp__wrapper">
                  <div className="eduComp__img">
                    <img src={arcIcon} alt="student"/>
                  </div>
                </div>
              </div>
              <div className="eduComp__text coins1">

                <div className="coins1__description">
                  <div className="coins1__title">EduCoin жина</div>
                  <div className="coins1__text">
                    Порталда алған әрбір сәтің үшін біліммен қоса ұпай жина.
                  </div>
                </div>

                <div className="coins1__number">
                  2
                </div>
                <div className="coins1__circle"/>

              </div>
            </div>
          </div>

          <div className="educoin__column eduComp">
            <div className="eduComp__box styleYellow">
              <div className="eduComp__arc">
                <div className="eduComp__wrapper">
                  <div className="eduComp__img">
                    <img src={giftIcon} alt="student"/>
                  </div>
                </div>
              </div>

              <div className="eduComp__text coins1">

                <div className="coins1__description">
                  <div className="coins1__title">Бағалы сыйлық ұтып ал</div>
                  <div className="coins1__text">
                    Оқудың ақысын EduCoin-мен төле және сол EduCoin арқылы бағалы сыйлықтар ұтып ал.
                  </div>
                </div>

                <div className="coins1__number">
                  3
                </div>
                <div className="coins1__circle"/>


              </div>
            </div>
          </div>


        </div>

        <button onClick={toggleModalEduCoin} className="educoin__button btn__shadowFromNull">Толығырақ</button>


      </div>

      <div ref={refToOverlay} onClick={overlayClickHandler} className={modalCLS.join(' ')}>

        <div className="educoin__modal modalCoin">

          <div className="modalCoin__wrapper">
            <div className="modalCoin__top">
              <div onClick={crossClickHandler} className="modalCoin__cross">
                <span/><span/>
              </div>
            </div>

            <div className="modalCoin__bottom">
              <div className="modalCoin__title">10 <span className="colorRed">EduCoin</span> = 1 теңге <span
                className="colorRed">EduCoin</span></div>
              <div className="modalCoin__text">
                <span className="colorRed">EduCoin</span> коэффициентін админ өзгерте алу керек. Примерно то, что в этой
                ссылке https://daryn.online/bonus-program. <span className="colorRed">EduCoin</span> это бонусная система
                начисления баллов. Они начисляются за: • Регистрацию (20000 <span className="colorRed">EduCoin</span>) •
                Әр күні кіргені үшін (10 <span className="colorRed">EduCoin</span>), 1 апта түгел кірсе 70 <span
                className="colorRed">EduCoin</span>. Түгел үздіксіз кіргені үшін 100 <span
                className="colorRed">EduCoin</span> бонус алады. 1 апта толық кірсе 170 <span
                className="colorRed">EduCoin</span> алады). Аптада 1 күн кіре алмай қалса, 100 бонус ала алмайды, күндік
                алған 10 <span className="colorRed">EduCoin</span> сақталады. Келесі күн, аптаның бірінші күні болып
                есептеледі. • За каждый купленный
                предмет (Сатып алған пәннің құнына тең EduCoin алады. Пән 4000 теңге тұрса, сатып алғаны үшін 4000 <span
                className="colorRed">EduCoin</span>
                алады.) • Реферал (Промокод)(как в Рахмет, за каждую покупку через этот реферал владельцу начисляется
                балл) Промокод арқылы біреу 8000 теңгеге курс сатып алса, промокод иесі 4000 <span
                className="colorRed">EduCoin</span> алады. • Виедосабақ 1
                миунт видео = 1 <span className="colorRed">EduCoin</span> • Әр видеосабақтан кейінгі тесттің 1 дұрыс
                жауабы = 10 <span className="colorRed">EduCoin</span> • Сдача
                промежуточных тестов Ай сайын болатын 5 пәндік тесттің әр дұрыс жауабы = 20 <span
                className="colorRed">EduCoin</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  )
}

export default EduCoin
