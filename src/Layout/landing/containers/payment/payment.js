import React, {useEffect, useState} from 'react'
import './payment.scoped.scss'



const Payment = ({type, data}) => {
  const [dataState, setDataState] = useState(data)

  useEffect(() => {

    console.log('dataState', dataState)

  },[dataState])


  console.log('link', data.link)
  console.log('data', data)
  const {id, order_type, transaction: {price, bank, post__feedback}} = data.transaction
  //
  // console.log('order_type', order_type)

  const courses = data.transaction.content_group.map(item => item.content.title).join(', ')


  const sendRequest = () => {

    console.log('send request, with data', data, type)

  }



  console.log('courses', courses)

  if (bank === 'credit') {
    return (
      <div className="results">
        <div className="results__info textLeft">
          <p className="results__content"><span className="results__column">Тапсырыс нөмірі: </span>
            <span className="results__column"><span className="results__amount">{id}</span></span></p>
          <p className="results__content"><span className="results__column">ҰБТ-ға дайындық курсы: </span>
            <span className="results__column">{order_type}</span></p>


          <p className="results__content"><span className="results__column">Курс тілі: </span>
            <span className="results__column">{data.lang}</span></p>

          {
            order_type === 'main'
              ? null
              : (
                <p className="results__content"><span className="results__column">Негізгі пәндер: </span>
                  <span className="results__column">{courses}</span>
                </p>
              )
          }

          {
            order_type === 'profs'
              ? null
              : (
                <p className="results__content"><span className="results__column">Бейіндік пәндер: </span>
                  <span className="results__column">{courses}</span></p>
              )
          }
          <p className="results__content"><span className="results__column">Төленген сомма:</span>
            <span className="results__column">{price}₸</span></p>
          <p className="results__content"><span className="results__column">Төлем түрі: </span>
            <span className="results__column">{type}</span></p>
        </div>

        <p className="text-center results__description">*Түбіртек “Төлемдер” бөлімінде сақталды.</p>
        <div className="text-center">
          <a target="_blank" rel="noopener noreferrer" href={data.link} className="results__button">Pay</a>
        </div>
      </div>
    )
  } else if (bank === 'kaspi') {

    return  (
      <div className="results">

        <div className="results__info">
          <p className="results__content"><span className="results__column">Тапсырыс нөмірі: </span>
            <span className="results__column"><span className="results__amount active">{id}</span></span>
          </p>
          <p className="results__content"><span className="results__column">ҰБТ-ға дайындық курсы: </span>
            <span className="results__column">{order_type}</span></p>
          <p className="results__content"><span className="results__column">Курс тілі: </span>
            <span className="results__column">{data.lang}</span></p>
          {
            order_type === 'profs'
              ? null
              : (
                <p className="results__content"><span className="results__column">Бейіндік пәндер: </span>
                  <span className="results__column">{courses}</span></p>
              )
          }
          {
            order_type === 'main'
              ? null
              : (
                <p className="results__content"><span className="results__column">Негізгі пәндер: </span>
                  <span className="results__column">{courses}</span>
                </p>
              )
          }
          <p className="results__content"><span className="results__column">Оқу ақысы: </span>
            <span className="results__column results-price">
              <span className="results-price__numbers">{price}₸</span>
              <button onClick={sendRequest} className={`results-price__status btn__shadowFromNull ${post__feedback ? 'active' : null}`}>Төлем жасалынбады</button>
            </span></p>
          <p className="results__content"><span className="results__column">Төлем түрі: </span>
            <span className="results__column">{type}</span></p>
        </div>

        <div className="results__block resultsBlock">

          <div className="resultsBlock__wrapper">
            <h3 className="resultsBlock__title">«Kaspi.kz» телефон қосымшасы арқылы төлем жасау.</h3>

            <p className="resultsBlock__text">1. Ұялы телефоныңыздан «Kaspi.kz» қосымшасына кіріңіз.</p>
            <p className="resultsBlock__text">2. «Платежи» бөліміне өтіп, іздеу жолағына «Educon» деп
              теріңіз.</p>
            <p className="resultsBlock__text">3. «Номер заказа» жолағына сізге берілген тапсырыс нөмірін
              енгізіп, «Продолжить» батырмасын басыңыз.</p>
          </div>

          <div className="resultsBlock__wrapper">
            <h3 className="resultsBlock__title">«Kaspi.kz» сайты арқылы төлем жасау. </h3>

            <p className="resultsBlock__text">1. <a rel="noopener noreferrer" target="_blank"
                                                    style={{color: '#329DFF'}}
                                                    href="https://kaspi.kz/">«Kaspi.kz»</a> сайтына кіріңіз.
            </p>
            <p className="resultsBlock__text">2. «Платежи» бөліміне өтіп, іздеу жолағына «Educon» деп
              теріңіз.</p>
            <p className="resultsBlock__text">3. «Номер заказа» жолағына сізге берілген тапсырыс нөмірін
              енгізіп, «Продолжить» батырмасын басыңыз.</p>
          </div>

        </div>

      </div>
    )

  }


}

export default Payment
