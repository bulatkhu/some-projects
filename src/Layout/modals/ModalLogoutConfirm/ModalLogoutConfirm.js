import React from 'react'
import {connect} from 'react-redux'
import {logoutAction} from '../../../redux/actions/auth/authActionsFuncs'
import './ModalLogoutConfirm.scoped.scss'
import {Translate} from "react-translated";


const ModalLogoutConfirm = ({setShow, onLogout}) => {


  const onClickLogout = () => {
    setShow(false)
    onLogout()
  }


  return (
    <div className="confirm__overlay">

      <div className="confirm__wrapper">

        <div className="confirm__header confirm__column">
          <h3 className="confirm__title"><Translate text="Шығу"/></h3>

          <button className="confirm__close btn__noFocus" onClick={() => setShow(false)}>&times;</button>
        </div>


        <div className="confirm__body confirm__column">


          <p>
            <Translate text="Шыққыңыз келетініне"/>
          </p>


          <div className="confirm__content">

            <button className="confirm__btn" onClick={onClickLogout}>
              <Translate text="Иә"/>
            </button>
            <button className="confirm__btn red" onClick={() => setShow(false)}>
              <Translate text="Бас тарту"/>
            </button>

          </div>


        </div>


      </div>

    </div>
  )
}


function mapDispatchToProps(dispatch) {


  return {
    onLogout: () => dispatch(logoutAction())
  }
}


export default connect(null, mapDispatchToProps)(ModalLogoutConfirm)
