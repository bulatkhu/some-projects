import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Translate} from 'react-translated'
import checkMark from '../../../../images/general/icons/checkMarkGreen.svg'
import crossRed from '../../../../images/general/icons/crossRed.svg'
import ModalPortal from '../../../modals/ModalPortal/ModalPortal'
import CheckOut from '../checkOut/checkOut'
import {showModalLogin} from '../../../../redux/actions/menu/menuActionsFuncs'
import './prices.scoped.scss'

const pricesData = [
  {title: <Translate text="Видеосабақтар"/>, price1: true, price2: true, price3: true, price4: true},
  {title: <Translate text="Тест видео шешімдері"/>, price1: true, price2: true, price3: true, price4: true},
  {title: <Translate text="Тақырыптық тесттер"/>, price1: true, price2: true, price3: true, price4: true},
  {title: <Translate text="Байқау сынақтары"/>, price1: false, price2: true, price3: true, price4: true},
  {title: <Translate text="Кураторлық"/>, price1: false, price2: true, price3: true, price4: true},
  {title: <Translate text="Профориентология"/>, price1: false, price2: true, price3: true, price4: true},
  {title: <Translate text="Барлық тақырып "/>, price1: false, price2: true, price3: true, price4: true},
  {title: <Translate text="7/24 қолжетімді"/>, price1: true, price2: true, price3: true, price4: true},
]

const Prices = ({classPrices = true, isAuth, user, onShowLogin}) => {
  const [showCheckOut, setShowCheckOut] = useState({show: false, type: null})

  const onShowCheckOut = type => {
    setShowCheckOut({show: true, type: type})
  }

  const firstButton = () => {
    const type = (user && user.type) ? user.type : null
    if (type === 'student') {
      return <Link onClick={() => window.scroll(0,0)} to="/login/student"><Translate text="Таңдау"/></Link>
    } else if (!isAuth) {
      return <div onClick={() => onShowLogin()}><Translate text="Таңдау"/></div>
    }
  }


  return (
    <section id="prices" className={[classPrices ? 'prices' : null]}>

      { showCheckOut.show && (
          <ModalPortal>
            <CheckOut
              type={showCheckOut.type}
              info={showCheckOut}
              show={setShowCheckOut}
            />
          </ModalPortal>
        )
      }
      <div className="prices__container _container">

        <h3 className="prices__title">
          <span>{<Translate text="Оқу ақысы"/>}</span>
        </h3>

        <div className="prices__table priceTable">

          <div className="priceTable__top priceTableTop">
            <div className="priceTableTop__content">

              <div className="priceTableTop__column">&nbsp;</div>
              <div className="priceTableTop__column">
                <div className="topTableFirst">
                  <div className="topTableFirst__content">

                    <div className="topTableFirst__column">
                      <div className="topTableFirst__wrapper">
                        <span className="topTableFirst__text"><Translate text="Қазақстан тарихы"/></span>
                      </div>
                      <div className="topTableFirst__prices">
                        <div className="topTableFirst__oldPrice">0₸</div>
                        <div className="topTableFirst__currentPrice"><Translate text="₸егін"/></div>
                      </div>
                    </div>

                    <div className="topTableFirst__column">
                      <div className="topTableFirst__wrapper">
                        <span className="topTableFirst__text"><Translate text="Негізгі пәндер"/></span>
                      </div>
                      <div className="topTableFirst__prices">
                        <div className="topTableFirst__oldPrice">115 000₸</div>
                        <div className="topTableFirst__currentPrice">22 990₸</div>
                      </div>
                    </div>

                    <div className="topTableFirst__column">
                      <div className="topTableFirst__wrapper">
                        <span className="topTableFirst__text"><Translate text="Бейіндік пәндер"/></span>
                      </div>
                      <div className="topTableFirst__prices">
                        <div className="topTableFirst__oldPrice">140 000₸ </div>
                        <div className="topTableFirst__currentPrice">27 990₸</div>
                      </div>
                    </div>

                    <div className="topTableFirst__column">
                      <div className="topTableFirst__wrapper">
                        <span className="topTableFirst__text">COMBO</span>
                      </div>
                      <div className="topTableFirst__prices">
                        <div className="topTableFirst__oldPrice">225 000₸</div>
                        <div className="topTableFirst__currentPrice">44 990₸</div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>

            <div className="priceColumnBottom__content">

              {pricesData.map((itemOfPrice, index) => {
                const keys = Object.keys(itemOfPrice)

                keys.forEach(item => {
                  if (itemOfPrice[item] === 'minus' ||
                    itemOfPrice[item] === '-' ||
                    itemOfPrice[item] === false
                  ) {
                    // itemOfPrice[item] = <div className="tableBottom__redMinus"><span/></div>
                    itemOfPrice[item] = <img src={crossRed} alt="cross"/>
                  } else if (
                    itemOfPrice[item] === 'plus' ||
                    itemOfPrice[item] === '+' ||
                    itemOfPrice[item] === true
                  ) {
                    // itemOfPrice[item] = <div className="tableBottom__greenCross"><span/><span/></div>
                    itemOfPrice[item] = <img src={checkMark} alt="yes"/>
                  }
                })

                return (

                  <div key={index + itemOfPrice.price2} className="priceTableBottom__content priceColumnBottom__column">

                    <div className="priceTableBottom__column">
                      <div className="priceTableBottom__title">{itemOfPrice.title}</div>
                    </div>
                    <div className="priceTableBottom__column">

                      <div className="tableBottom__content">

                        <div className="tableBottom__column">
                          <div className="tableBottom__text">{itemOfPrice.price1}</div>
                        </div>

                        <div className="tableBottom__column">
                          <div className="tableBottom__text">{itemOfPrice.price2}</div>
                        </div>

                        <div className="tableBottom__column">
                          <div className="tableBottom__text">{itemOfPrice.price3}</div>
                        </div>

                        <div className="tableBottom__column">
                          <div className="tableBottom__text">{itemOfPrice.price4}</div>
                        </div>

                      </div>

                    </div>


                  </div>

                )
              })}


            </div>

            <div className="priceTableTop__content">

              <div className="priceTableTop__column">&nbsp;</div>
              <div className="priceTableTop__column">
                <div className="topTableFirst">
                  <div className="topTableFirst__content">

                    <div className="topTableFirst__column ">
                      <button className="topTableFirst__button btn__shadowFromNull topTableFirst__link">
                        <span className="topTableFirst__text">{firstButton()}</span>
                      </button>
                    </div>

                    <div className="topTableFirst__column">
                      <button onClick={() => onShowCheckOut('main')} className="topTableFirst__button btn__shadowFromNull">
                        <span className="topTableFirst__text"><Translate text="Таңдау"/></span>
                      </button>
                    </div>

                    <div className="topTableFirst__column">
                      <button onClick={() => onShowCheckOut('profs')} className="topTableFirst__button btn__shadowFromNull">
                        <span className="topTableFirst__text"><Translate text="Таңдау"/></span>
                      </button>
                    </div>

                    <div className="topTableFirst__column">
                      <button onClick={() => onShowCheckOut('combo')} className="topTableFirst__button btn__shadowFromNull">
                        <span className="topTableFirst__text"><Translate text="Таңдау"/></span>
                      </button>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>


        </div>

      </div>

    </section>
  )
}


const mapStateToProps = state => {

  return {
    isAuth: state.auth.isAuthenticated,
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => {

  return {
    onShowLogin: () => dispatch(showModalLogin()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Prices)
