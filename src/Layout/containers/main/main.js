import React from 'react'
import './main.scss'
import mainImage from '../../../images/main/main-image.svg'

const Main = () => {

  return (
    <main className="main">
      <div className="main__container _container">
        <div className="main__content">
          <div className="main__column body">
            <h1 className="body__title">
              Болашаққа деген нық қадамды бүгіннен баста
            </h1>
            <p className="body__text">
              Курс бастағандағы деңгейіңді анықтап, әрбір жетістігіңді бақылап отыр.
            </p>
            <div className="body__icon">
              <button className="body__icon__button">
                Деңгей анықтау
              </button>
            </div>
          </div>
          <div className="main__column image">
            <div className="image__wrapper">
              <img src={mainImage} alt="Work table"/>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Main