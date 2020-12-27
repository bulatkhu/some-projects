import React, {useState} from 'react'
import {LogoutIcon} from '../../../images/general/menuIcons/infoIcon'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutAction} from '../../../redux/actions/auth/authActionsFuncs'
import ModalPortal from '../../modals/ModalPortal/ModalPortal'
import ModalLogoutConfirm from '../../modals/ModalLogoutConfirm/ModalLogoutConfirm'


const LogoutButton = props => {
  const [showConfirmWindow, setShowConfirmWindow] = useState(false)

  const onLogoutFunction = event => {
    event.preventDefault()
    setShowConfirmWindow(true)
  }

  return (
    <>
      {
        showConfirmWindow && (
          <ModalPortal>
            <ModalLogoutConfirm setShow={setShowConfirmWindow}/>
          </ModalPortal>
        )
      }
      <Link onClick={onLogoutFunction} className="loginNav__link" to="/">
        <div className="loginNav__logOutIcon">
          <LogoutIcon/>
        </div>
        <span>{props.children}</span>
      </Link>
    </>
  )
}


function mapDispatchToProps(dispatch) {


  return {
    onLogout: () => dispatch(logoutAction())
  }
}


export default connect(null, mapDispatchToProps)(LogoutButton)
