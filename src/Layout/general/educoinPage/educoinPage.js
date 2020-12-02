import React from 'react'
import './educoinPage.scoped.scss'


const EducoinPage = () => {


  return (
    <div className="educoinPage">
      <div className="educoinPage__container _container">


        <div className="educoinPage__wrapper">

          <h2 className="educoinPage__coin coin">
            <span className="coin__titleIcon">10</span> = 1 теңге
          </h2>

          <div className="educoinPage__rules rules">

            <div className="rules__item">

              <h3 className="rules__title" style={{color: '#FE8047'}}>Тіркелу</h3>
              <p className="rules__text">
                Порталға тіркелгені үшін әрбір қолданушыға
                <span className="coin__icon">20000</span> беріледі.
              </p>

            </div>

            <div className="rules__item">

              <h3 className="rules__title" style={{color: '#00C0EF'}}>Реферал</h3>
              <p className="rules__text">
                Порталды достарына ұсынғаны үшін <span className="coin__colorRed">EduCoin</span> беріледі.
                Мысалы: Промокод арқылы біреу 8000 теңгеге курс сатып алса,
                промокод иесі курс құнының жартысына тең яғни <span className="coin__icon">4000</span> алады.
                Промокод жеке кабинеттегі “Promo Code” бөлімінде.
              </p>

            </div>

            <div className="rules__item">

              <h3 className="rules__title" style={{color: '#FFB800'}}>Курс алу</h3>
              <p className="rules__text">
                Курс сатып алу кезінде әрбір сатып алған курстың құнына тең
                <span className="coin__colorRed">EduCoin</span> беріледі.
                Мысалы: 9 990 теңгеге курс сатып алсаңыз, <span className="coin__icon">9 990</span> беріледі.
              </p>

            </div>

            <div className="rules__item">

              <h3 className="rules__title" style={{color: '#FF4141'}}>Порталға кіру</h3>
              <p className="rules__text">
                Қолданушы порталға әр күн кіргені үшін <span className="coin__icon">10</span> беріледі.
                1 апта түгел кірсе <span className="coin__icon">70</span>
              </p>

            </div>

            <div className="rules__item">

              <h3 className="rules__title" style={{color: '#FF4141'}}>Бонус</h3>
              <p className="rules__text">
                7 күн үздіксіз кіргені үшін <span className="coin__icon">100</span> бонус беріледі.
                Күндер алғашқы курс сатып алғаннан бастап есептеледі.
                Кірілмей қалған күн соңғы күн болып есептеліп, ертесі күн бонус алудың алғашқы күні болады.
                1 күн кіре алмай қалса, 100 бонус ала алмайды, күндік алған <span className="coin__icon">10</span> сақталады.
              </p>

            </div>

            <div className="rules__item">

              <h3 className="rules__title" style={{color: '#00A65A'}} >Виедосабақ</h3>
              <p className="rules__text">
                Қолданушы курстарын көргені үшін <span className="coin__colorRed">EduCoin</span> беріледі.
                Виедосабақтың 1 минуты 1 <span className="coin__colorRed">EduCoin</span>-ға тең.
                Видеосабақтың ұзақтығы 12 минут болса, екі рет көрсе де, 12 EduCoin беріледі.
              </p>

            </div>

            <div className="rules__item">

              <h3 className="rules__title" style={{color: '#FF5773'}}>Тақырыптық тесттер</h3>
              <p className="rules__text">
                Әр сабақтан кейінгі “Тақырыптық тесттер” үшін <span className="coin__colorRed">EduCoin</span> беріледі.
                Тесттің 1 дұрыс жауабы <span className="coin__icon">10</span>
              </p>

            </div>

            <div className="rules__item">

              <h3 className="rules__title" style={{color: '#9D43FF'}}>Байқау сынағы</h3>
              <p className="rules__text">
                Ай сайын болатын “Байқау сынағына” <span className="colorRed">EduCoin</span> беріледі.
                Әр дұрыс жауап <span className="coin__icon">20</span>
              </p>

            </div>

            <div className="rules__item">

              <h3 className="rules__title" style={{color: '#FF529E'}}>Combo</h3>
              <p className="rules__text">
                Combo пакетін сатып алғандарға 150 000 EduCoin беріледі. Бұл ең үлкен EduCoin болып есептеледі.
              </p>

            </div>

          </div>

          <div className="educoinPage__warnings warnings">

            <p className="warnings__item">
              *Жиналған EduCoin-дарды порталда сатып алу жасаған қолданушы ғана, келесі сатып алуға қолдана алады және бағалы сыйлыққа үміткер бола алады.
            </p>

            <p className="warnings__item">
              *Өз EduCoin-дарыңды жеке кабинеттегі “EduCoin” бөлімінен қарауға болады.
            </p>

            <p className="warnings__item">
              *Тіркелу кезінде досының промокодын пайдаланған қолданушыға да, промокод иесіне де EduCoin беріледі.  *EduCoin жинау мерзімі оқу шарттарының мерзімімен жүзеге асады.
            </p>
            <div className="warnings__item">
              *EduCoin жинау мерзімі оқу шарттарының мерзімімен жүзеге асады.
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default EducoinPage