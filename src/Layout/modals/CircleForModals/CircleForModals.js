import React from 'react'
import './CircleForModals.scoped.scss'
import {connect} from 'react-redux'
import {hideModalLogin, hideModalReg, showModalLogin, showModalReg} from '../../../redux/actions/menu/menuActionsFuncs'
import {Translate} from "react-translated";


const CircleForModals = props => {
  const {title = 'Тіркелу'} = props

  const switchModals = () => {

    if (props.showRegisterModal) {
      props.hideRegister()
      props.showLogin()
    } else {
      props.hideLogin()
      props.showRegister()
    }
  }


  return (
    <button onClick={switchModals} className="circle btn__shadowFromNull">
      <span className="circle__title">
        <Translate text={title}/>
      </span>
    </button>
  )
}

function mapStateToProps(state) {

  return {
    ...state.menu
  }
}

function mapDispatchToProps(dispatch) {
  return {
    hideRegister: () => dispatch(hideModalReg()),
    hideLogin: () => dispatch(hideModalLogin()),
    showRegister: () => dispatch(showModalReg()),
    showLogin: () => dispatch(showModalLogin())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CircleForModals)
