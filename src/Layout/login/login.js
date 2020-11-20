import React, {useState} from 'react'
import {connect} from 'react-redux'
import {setUsersData} from '../../redux/actions/user/userActionsFuncs'
import {SITE_BASE_URL} from '../../app.config'
import MenuLinks from './menuLinks/menuLinks'
import NoPhoto from '../../images/general/noPhoto/noPhoto'
import eduCoin from '../../images/landing/educoin/eduCoin.svg'
import './login.scss'


const Login = ({children, links, user}) => {
  const [showMenu, setShowMenu] = useState(true)
  const {base} = links

  const toggleNavBar = event => {

    if (event.target.classList.contains('btnBurger__menu') || event.target.classList.contains('btnBurger__span')) {
      setShowMenu(prev => !prev)
    }
  }


  return (
    <section className="loginNav">

      <div onClick={toggleNavBar} className={['loginNav__navBar', !showMenu ? null : 'active'].join(' ')}>
        <div className="loginNav__column loginNav__btnBurger btnBurger">
          <div className="btnBurger__menu">
            <span className="btnBurger__span"/><span className="btnBurger__span"/><span className="btnBurger__span"/>
          </div>
        </div>

        <div className="loginNav__column loginNav__profile loginProf">
          <div className="loginProf__img loginProf__column">
            {user && user.localAvatar
              ? <img src={SITE_BASE_URL + user.localAvatar} alt="avatar"/>
              : <NoPhoto/>
            }
          </div>

          {
            user && (
              <div className="loginProf__description loginProf__column">
                <div className="loginProf__name">{user.name}</div>
                <div className="loginProf__coins">
                  <div className="loginProf__educoin">
                    <img src={eduCoin} alt="eduCoin"/>
                  </div>
                  <span>{user.credit}</span>
                </div>
              </div>
            )
          }
        </div>
        {
          user && (
            <MenuLinks base={base} type={user.type}/>
          )
        }
      </div>

      <div className="loginNav__body">
        <div className="loginNav__container _container">
          <div className="loginNav__thinkLine"/>
          {children}
          <div className="loginNav__thinkLine"/>
        </div>
      </div>


    </section>
  )
}


function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated,
    user: state.user.user ? state.user.user : null,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUserData: () => dispatch(setUsersData())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
