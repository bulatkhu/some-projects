import React from 'react'
import './ModalPass.scoped.scss'
import LittleBtn from '../LittleBtn/LittleBtn'


const ModalInfo = ({showInfo}) => {

  return (
    <span
      className="modalPass__info modalInfo"
      onMouseEnter={() => showInfo(true)}
      onMouseLeave={() => showInfo(false)}
    >
      <span className="modalInfo__wrapper">
        <span className="modalInfo__text">Жіберу түймесін басқаннан кейін сіз көрсеткен нөмірге қоңырау шалған нөмірдің соңғы төрт санын осы үлгідегідей код ретінде енгізіңіз.</span>
        <span className="modalInfo__phone">+7(707) 746 99 66</span>
        <span className="modalInfo__subWrapper">
          <input
            className="phoneConfirm__input margin__button2"
            type="text"
            defaultValue="469966"
          />
          <LittleBtn
            className="modalPass__btn centered"
            color="blue"
          >Растау</LittleBtn>
        </span>
      </span>
    </span>
  )

}

export default ModalInfo