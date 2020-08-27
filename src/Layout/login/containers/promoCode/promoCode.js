import React from 'react'
import './promoCode.scss'


const PromoCode = () => {


  return (
    <section className="promoCode">
      <h2 className="promoCode__title">Промокод не үшін қажет?</h2>
      <p className="promoCode__text">Промокод EduCoin жинау үшін қажет. Өз промокодыңды достарыңмен бөлісіп, досың сатып
        алған әрбір курс үшін <span>EduCoin</span> жина. Жиналған EduCoin арқылы курс сатып алуға және өте бағалы сыйлық ұтып алуыңа
        болады. Промокодты көшіріп алып, досыңа жібер. Тіркелуі кезінде осыны қолдануына кеңес бер.</p>


      <div className="promoCode__create promoCreate">
        <span className="promoCreate__text">Сіздің промокод : </span>
        <form className="promoCreate__form">
          <input defaultValue="4FT67H" type="text" className="promoCreate__input"/>
          <button className="promoCreate__button">көшіру</button>
        </form>
      </div>
    </section>
  )
}

export default PromoCode