import React, {useEffect, useState} from 'react'
import checkMark from '../../../../images/general/icons/checkMarkGreen.svg'
import crossRed from '../../../../images/general/icons/crossRed.svg'
import ModalPortal from '../../../modals/ModalPortal/ModalPortal'
import CheckOut from '../checkOut/checkOut'
import {getCoursesForPrices} from '../../../../request/apiPrices'
import './prices.scoped.scss'

const pricesData = [
  {title: 'Видеосабақтар', price1: true, price2: true, price3: true, price4: true},
  {title: 'Тест видео шешімдері', price1: true, price2: true, price3: true, price4: true},
  {title: 'Тақырыптық тесттер', price1: true, price2: true, price3: true, price4: true},
  {title: 'Байқау сынақтары', price1: false, price2: true, price3: true, price4: true},
  {title: 'Кураторлық', price1: false, price2: true, price3: true, price4: true},
  {title: 'Профориентология', price1: false, price2: true, price3: true, price4: true},
  {title: 'Барлық тақырып ', price1: false, price2: true, price3: true, price4: true},
  {title: '7/24 қолжетімді', price1: true, price2: true, price3: true, price4: true},
]

const Prices = ({classPrices = true}) => {
  const [showCheckOut, setShowCheckOut] = useState({show: false, type: null})
  const [courses, setCourses] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {

    getCoursesForPrices()
      .then(res => {
        if (!res.error && +res.data.status === 1) {
          const {data} = res.data

          if (
            !data.kz.combinations ||
            !data.kz.main ||
            !data.ru.combinations ||
            !data.ru.main
          ) {
            setError('we do not have yet any courses')
          } else {
            setCourses(data)
          }

        }
      })

  },[])

  const onShowCheckOut = type => {
    if (!error) {
      setShowCheckOut({show: true, type: type})
    } else {

    }
  }


  return (
    <section className={[classPrices ? 'prices' : null]}>

      { courses && (
          <ModalPortal>
            <CheckOut
              courses={courses}
              type={showCheckOut.type}
              info={showCheckOut}
              show={setShowCheckOut}
            />
          </ModalPortal>
        )
      }
      <div className="prices__container _container">

        <h3 className="prices__title">
          <span>Оқу ақысы</span>
        </h3>

        {
          error ? (
            <p className="error__big text-center">{error}</p>
          ) : null
        }

        <div className="prices__table priceTable">

          <div className="priceTable__top priceTableTop">
            <div className="priceTableTop__content">

              <div className="priceTableTop__column">&nbsp;</div>
              <div className="priceTableTop__column">
                <div className="topTableFirst">
                  <div className="topTableFirst__content">

                    <div className="topTableFirst__column">
                      <div className="topTableFirst__wrapper">
                        <span className="topTableFirst__text">Қазақстан тарихы</span>
                      </div>
                      <div className="topTableFirst__prices">
                        <div className="topTableFirst__oldPrice">0₸</div>
                        <div className="topTableFirst__currentPrice">₸егін</div>
                      </div>
                    </div>

                    <div className="topTableFirst__column">
                      <div className="topTableFirst__wrapper">
                        <span className="topTableFirst__text">Негізгі пәндер</span>
                      </div>
                      <div className="topTableFirst__prices">
                        <div className="topTableFirst__oldPrice">115 000₸</div>
                        <div className="topTableFirst__currentPrice">22 990₸</div>
                      </div>
                    </div>

                    <div className="topTableFirst__column">
                      <div className="topTableFirst__wrapper">
                        <span className="topTableFirst__text">Бейіндік пәндер</span>
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

                    <div className="topTableFirst__column">
                      <button disabled={error} onClick={() => console.log('first column')} className="topTableFirst__button btn__shadowFromNull">
                        <span className="topTableFirst__text">Таңдау</span>
                      </button>
                    </div>

                    <div className="topTableFirst__column">
                      <button disabled={error} onClick={() => onShowCheckOut('main')} className="topTableFirst__button btn__shadowFromNull">
                        <span className="topTableFirst__text">Таңдау</span>
                      </button>
                    </div>

                    <div className="topTableFirst__column">
                      <button disabled={error} onClick={() => onShowCheckOut('profs')} className="topTableFirst__button btn__shadowFromNull">
                        <span className="topTableFirst__text">Таңдау</span>
                      </button>
                    </div>

                    <div className="topTableFirst__column">
                      <button disabled={error} onClick={() => onShowCheckOut('combo')} className="topTableFirst__button btn__shadowFromNull">
                        <span className="topTableFirst__text">Таңдау</span>
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

export default Prices
