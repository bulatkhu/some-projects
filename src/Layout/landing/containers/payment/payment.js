import React, {useState} from 'react'
import {checkPayment} from '../../../../request/apiPayment'
import './payment.scoped.scss'
import {Translate} from "react-translated";


const Payment = ({data}) => {
  const {id, order_type, transaction: {price, bank, post__feedback}} = data.transaction
  const [feedbackState, setFeedbackState] = useState(post__feedback)
  const [reqInProcess, setReqInProcess] = useState(false)
  const courses = data.transaction.content_group.map(item => item.content.title).join(', ')
  let orderTypeToShow = order_type
  let bankToShow = bank

  if (order_type.toLowerCase() === 'main') {
    orderTypeToShow = <Translate text="Негізгі пәндер"/>
  } else if (order_type.toLowerCase() === 'profs') {
    orderTypeToShow = <Translate text="Бейіндік пәндер"/>
  } else if (order_type.toLowerCase() === 'combo') {
    orderTypeToShow = 'COMBO'
  }

  if (bank === 'credit') {
    bankToShow = <Translate text="Банк картасы"/>
  } else if (bank === 'kaspi') {
    bankToShow = 'Kaspi.kz'
  }

  const sendRequest = () => {
    setReqInProcess(true)

    checkPayment(id)
      .then(res => {
        if (+res.data.status === 1) {
          const {data: {post_feedback}} = res.data
          setTimeout(() => {
            setReqInProcess(false)
            setFeedbackState(post_feedback)
          }, 1000)
        }
      })

  }

  if (bank === 'credit') {
    return (
      <div className="results">
        <div className="results__info textLeft">
          <p className="results__content"><span className="results__column"><Translate text="Тапсырыс нөмірі:"/> </span>
            <span className="results__column"><span className="results__amount">{id}</span></span></p>
          <p className="results__content"><span className="results__column"><Translate text="ҰБТ-ға дайындық курсы:"/> </span>
            <span className="results__column">{orderTypeToShow}</span></p>


          <p className="results__content"><span className="results__column"><Translate text="Курс тілі"/></span>
            <span className="results__column">{data.lang}</span></p>

          {
            order_type === 'profs'
              ? <p className="results__content">
                  <span className="results__column"><Translate text="Негізгі пәндер"/></span>
                  <span className="results__column">{courses}</span>
                </p>
              : null
          }

          {
            order_type === 'combo' && data.mainCourses && (
              <>
                <p className="results__content"><span className="results__column"><Translate text="Негізгі пәндер"/>:</span>
                  <span className="results__column">{data.mainCourses}</span>
                </p>
                <p className="results__content">
                  <span className="results__column"><Translate text="Бейіндік пәндер"/>:</span>
                  <span className="results__column">{courses}</span>
                </p>
              </>
            )
          }

          {
            order_type === 'main'
              ? <p className="results__content">
                  <span className="results__column"><Translate text="Бейіндік пәндер"/>: </span>
                  <span className="results__column">{courses}</span>
                </p>
              : null
          }
          <p className="results__content"><span className="results__column"><Translate text="Төленген сомма:"/></span>
            <span className="results__column">{price}₸</span></p>
          <p className="results__content"><span className="results__column"><Translate text="Төлем түрі:"/></span>
            <span className="results__column">{bankToShow}</span></p>
        </div>

        {/*<p className="text-center results__description">*Түбіртек “Төлемдер” бөлімінде сақталды.</p>*/}
        <div className="text-center">
          <a target="_blank" rel="noopener noreferrer" href={data.link} className="results__button">Төлеу</a>
        </div>
      </div>
    )
  } else if (bank === 'kaspi') {

    return (
      <div className="results">

        <div className="results__info">
          <p className="results__content"><span className="results__column"><Translate text="Тапсырыс нөмірі:"/> </span>
            <span className="results__column"><span className="results__amount active">{id}</span></span>
          </p>
          <p className="results__content"><span className="results__column"><Translate text="ҰБТ-ға дайындық курсы:"/> </span>
            <span className="results__column">{orderTypeToShow}</span></p>
          <p className="results__content"><span className="results__column"><Translate text="Курс тілі"/></span>
            <span className="results__column">{data.lang}</span></p>
          {
            order_type === 'main'
              ? <p className="results__content">
                  <span className="results__column"><Translate text="Бейіндік пәндер"/></span>
                  <span className="results__column">{courses}</span>
                </p>
              : null
          }
          {
            order_type === 'combo' && data.mainCourses && (
              <>
                <p className="results__content">
                  <span className="results__column"><Translate text="Бейіндік пәндер"/></span>
                  <span className="results__column">{courses}</span>
                </p>
                <p className="results__content">
                  <span className="results__column"><Translate text="Негізгі пәндер"/></span>
                  <span className="results__column">{data.mainCourses}</span>
                </p>
              </>

            )
          }
          {
            order_type === 'profs'
              ? <p className="results__content">
                  <span className="results__column"><Translate text="Негізгі пәндер"/>: </span>
                  <span className="results__column">{courses}</span>
                </p>
              : null
          }
          <p className="results__content"><span className="results__column"><Translate text="Оқу ақысы"/></span>
            <span className="results__column results-price">
              <span className="results-price__numbers">{price}₸</span>
              <button
                onClick={sendRequest}
                className={
                  [
                    'results-price__status',
                    'btn__shadowFromNull',
                    +feedbackState === 1 ? 'active' : null,
                    reqInProcess ? 'process' : null
                  ].join(' ')
                }
              >{+feedbackState === 1 ? 'Төлем сәтті жасалды' : 'Төлем жасалынбады'}
                <span className="results-price__process"/>
              </button>
            </span></p>
          <p className="results__content"><span className="results__column"><Translate text="Төлем түрі:"/></span>
            <span className="results__column">{bankToShow}</span></p>
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

        </div>

      </div>
    )

  }


}

export default Payment
