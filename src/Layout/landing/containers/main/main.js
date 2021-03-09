import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import Slider from 'react-slick'
import mainImage1 from '../../../../images/landing/main/main-image1.svg'
import mainImage2 from '../../../../images/landing/main/main-image2.svg'
import mainImage3 from '../../../../images/landing/main/main-image3.svg'
import ModalPortal from '../../../modals/ModalPortal/ModalPortal'
import ModalRequest from '../../../modals/ModalRequest/ModalRequest'
import {Link} from 'react-router-dom'
import {showModalLogin, showModalReg} from '../../../../redux/actions/menu/menuActionsFuncs'
import { scrollBodyHandler } from '../../../../scripts/scrollController/scrollController'
import { Translate as ReactTranslate } from 'react-translated'
import './main.scss'



const settings = {
  fade: true,
  infinite: true,
  speed: 500,
  verticalSwiping: true,
  initialSlide: 0,
  slidesToShow: 1,
  lazyLoad: true,
  slidesToScroll: 1,
  dots: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 576,
      settings: {
        verticalSwiping: false,
      }
    }
  ]
}

const Main = ({onShowRegister, setUserData, menu, isAuth, user}) => {
  const [showModalRequest, setShowModalRequest] = useState(false)


  useEffect(() => {

    if (showModalRequest) {
      scrollBodyHandler.lock()
    } else {
      scrollBodyHandler.unLock()
    }

  }, [showModalRequest])



  return (
    <>
      <ModalPortal>
        <ModalRequest isShow={showModalRequest} setShow={setShowModalRequest} />
      </ModalPortal>
      <main className="main" id="topContent">
        <div className="main__container _container">
          <div className="main__content">
            <div className="main__column body">
              <h1 className="body__title">
                <ReactTranslate text="Болашаққа нық қадамды бүгіннен баста" />
              </h1>
              <p className="body__text">
                <ReactTranslate text="Қашықтан білім беру арқылы Біз әрқашан Сенің жаныңдамыз" />
              </p>
              <div className="body__icon">
                {/* <button onClick={() => setShowModalRequest(prev => !prev)} className="body__icon__button">
                  <span>
                    <ReactTranslate text="Өтінім қалдыру"/>
                  </span>
                </button> */}
                {isAuth && user
                  ? <Link className="headerMenu-login" to={user.type ? '/login/' + user.type : '/login/student'}>
                    <button onClick={() => setShowModalRequest(prev => !prev)} className="body__icon__button">
                      <span>
                        <ReactTranslate text="Профиль" />
                      </span>
                    </button>
                  </Link>
                  : <>
                    <button onClick={() => onShowRegister()} className="body__icon__button">
                      <ReactTranslate text='Тіркелу' />
                    </button>
                  </>
                }
              </div>
            </div>
            <div className="main__column image">

              <Slider {...settings}>
                <div className="image__wrapper">
                  <img src={mainImage1} alt="Work table" />
                </div>

                <div className="image__wrapper">
                  <img src={mainImage2} alt="Work table" />
                </div>

                <div className="image__wrapper">
                  <img src={mainImage3} alt="Work table" />
                </div>
              </Slider>


            </div>
          </div>
        </div>
      </main>
    </>
  )
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuthenticated,
    user: state.user.user ? state.user.user : null,
  }
}

const mapDispatchToProps = dispatch => {

  return {
    onShowLogin: () => dispatch(showModalLogin()),
    onShowRegister: () => dispatch(showModalReg()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
