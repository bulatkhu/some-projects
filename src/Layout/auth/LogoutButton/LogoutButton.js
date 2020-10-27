import React from 'react'
import {LogoutIcon} from '../../../images/general/menuIcons/infoIcon'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutAction} from '../../../redux/actions/auth/authActionsFuncs'


const LogoutButton = props => {

  const onLogoutFunction = () => props.onLogout()

  return (
    <Link onClick={onLogoutFunction} className="loginNav__link" to="/">
      <div className="loginNav__logOutIcon">
        <LogoutIcon/>
      </div>
      <span>{props.children}</span>
    </Link>
  )
}


function mapDispatchToProps(dispatch) {


  return {
    onLogout: () => dispatch(logoutAction())
  }
}


export default connect(null, mapDispatchToProps)(LogoutButton)