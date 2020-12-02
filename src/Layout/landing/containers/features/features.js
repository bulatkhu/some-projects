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

const FeatureItems = [
  {
    text: '15 жылдық тәжірибесі бар, өз мамандығының шебері, Қазақстан бойынша атақты және үздік мұғалімдер сабақ жүргізеді. Ұстаздарымыз қосымша оқу құралдарының авторлары және редакторлары.',
    title: 'Ұстаздар', img: feature1
  },
  {
    text: 'Заманауи құралдармен жабдықталған студияларымызда түсірілген. Бұл видео сабақтар оқушыларға кез келген жерде және қалаған уақытта (7/24) қолжетімді.',
    title: 'Видео сабақтар', img: feature2
  },
  {
    text: 'Білікті кураторлар оқушылардың қай пәннен, қай тараудан, қай тақырыптан тіпті үлгерім деңгейін порталымыз арқылы анықтап, оқушының нәтижеге жетуі үшін бағыт-бағдар береді.',
    title: 'Онлайн кураторлық', img: feature3
  },
  {
    text: '«EduCon» басылымдары − ұжымдық жұмыстың өнімі. Оқулықтар шынайы емтиханның негізінде құрастырылып, талапкерлердің көзайымына айналып үлгерген.',
    title: 'Оқу құралдары', img: feature4
  },
  {
    text: 'Тікелей эфирдегі сабақ арқылы курсты үйіңізге дейін алып келеміз, осылайша сіз мұғаліміңізді көре аласыз және сұрақтарыңызды бірден қоя аласыз.',
    title: 'Live вебинар', img: feature5
  },
  {
    text: 'Әр видеосабақтан кейін сол сабақты бекіту мақсатында тек сол тақырып бойынша тест тапсырмалары беріледі. Тақырыптың қаншалықты меңгерілгенін анық көруге болады.',
    title: 'Тақырыптық тесттер', img: feature6
  },
  {
    text: 'Ындаландыру арқылы білім беру  жүйесі. Платформамызда білім алудың әрбір сәтін қызықты әрі тиімді ететін білім берудің заманауи методикасы.',
    title: 'EduCoin', img: feature7
  },
  {
    text: 'Кәсіби профориентолог мамандарымыз оқушылардың қабілеттері мен дағдыларын анықтап, мамандықты саналы таңдау жасауына көмектесіп, әрқашан психологиялық қолдау көрсетеді. ',
    title: 'Профориентология', img: feature8
  },
  {
    text: 'Порталдағы барлық тест тапсырмаларын ұстаздар видео арқылы түсіндірме жасаған. Қателесіп кеткен сұрақты видео шешімі арқылы дұрыс жауабын көруге, тест арқылы білім алуға болады.',
    title: 'Тест видео шешімдері', img: feature9
  },
]

const Features = () => {

  return (
    <section className="features">

      <div className="features__container _container">
        {/*<div className="features__content">*/}
        {/*  {FeatureBoxes.map((item, index) => (*/}
        {/*    <FeatureBox*/}
        {/*      key={index}*/}
        {/*      icon={item.icon}*/}
        {/*      title={item.title}*/}
        {/*      text={item.text}*/}
        {/*    />*/}
        {/*  ))}*/}
        {/*</div>*/}

        <h3 className="features__title">
          <span>Неліктен EduCon.online?</span>
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