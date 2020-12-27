import React from 'react'
import {Translate} from 'react-translated'
import './passDescription.scoped.scss'


const PassDescription = ({alphabet = false, length = false, digital = false, upperCapital = false}) => {
  return (
    <div className="pass__wrapper">
      <div className="pass__triangle"/>
      <div className="pass">

        <p className="pass__title">
          <Translate text="Құпиясөз шарттары"/>
        </p>

        <ul className="pass__list passList">

          <li className={`passList__item ${alphabet ? 'invalid' : ''}`}>
            <Translate text="Латын әріптері"/>
          </li>
          <li className={`passList__item ${length ? 'invalid' : ''}`}>
            <Translate text="8 не одан көп таңба"/>
          </li>
          <li className={`passList__item ${digital ? 'invalid' : ''}`}>
            <Translate text="Кемінде бір цифр"/>
          </li>
          <li className={`passList__item ${upperCapital ? 'invalid' : ''}`}>
            <Translate text="Кемінде бір бас әріп"/>
          </li>

        </ul>


      </div>
    </div>
  )
}

export default PassDescription
