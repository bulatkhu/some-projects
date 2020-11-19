import React from 'react'
import {connect} from 'react-redux'
import './promoCode.scss'

function onFormSubmit(event) {
  event.preventDefault()
  event.target.code.select()
  document.execCommand("copy")
}

const PromoCode = ({user}) => {


  return (
    <section className="promoCode">
      <h2 className="promoCode__title">Промокод не үшін қажет?</h2>
      <p className="promoCode__text">Промокод EduCoin жинау үшін қажет. Өз промокодыңды достарыңмен бөлісіп, досың сатып
        алған әрбір курс үшін <span>EduCoin</span> жина. Жиналған EduCoin арқылы курс сатып алуға және өте бағалы сыйлық ұтып алуыңа
        болады. Промокодты көшіріп алып, досыңа жібер. Тіркелуі кезінде осыны қолдануына кеңес бер.</p>


      <div className="promoCode__create promoCreate">
        <span className="promoCreate__text">Сіздің промокод : </span>
        <form
          onSubmit={event => onFormSubmit(event)}
          className="promoCreate__form"
        >
          <input
            name="code"
            readOnly
            className="promoCreate__input"
            value={user ? user.code : 'null'}
          />
          <button className="btn__shadowFromNull promoCreate__button">көшіру</button>
        </form>
      </div>
    </section>
  )
}


function mapStateToProps(state) {

  return {
    user: state.user.user
  }
}


export default connect(mapStateToProps)(PromoCode)
