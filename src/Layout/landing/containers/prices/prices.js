import React, {useEffect, useState} from 'react'
import checkMark from '../../../../images/general/icons/checkMarkGreen.svg'
import crossRed from '../../../../images/general/icons/crossRed.svg'
import ModalPortal from '../../../modals/ModalPortal/ModalPortal'
import CheckOut from '../checkOut/checkOut'
import './prices.scoped.scss'
import {getCoursesForPrices} from '../../../../request/apiPrices'

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

const Prices = () => {
  const [showCheckOut, setShowCheckOut] = useState({show: false, id: null, color: null, title: null})
  // eslint-disable-next-line
  const [courses, setCourses] = useState([])

  useEffect(() => {

    getCoursesForPrices()
      .then(res => {
        if (!res.error && +res.data.status === 1) {
          // eslint-disable-next-line
          const {data} = res.data
          // const arrayData = Object
          //   .keys(data)
          //   .map(item => {
          //     data[item].id = +item
          //     return data[item].map(item => {
          //       item.title = item.content.title
          //       const img = item.content.metas.find(item => item.option === 'cover' || item.option === 'thumbnail')
          //       item.img = img.value ? img.value : null
          //       delete item.content
          //       return item
          //     })
          //   })
          // setCourses(arrayData)
        }
      })

  },[])

  const onShowCheckOut = (id, color, title) => setShowCheckOut(() => ({show: true, id, color, title}))


  return (
    <section className="prices">

      { courses.length && (
          <ModalPortal>
            <CheckOut
              courses={courses[showCheckOut.id]}
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
                        <div className="topTableFirst__oldPrice">45 000₸</div>
                        <div className="topTableFirst__currentPrice">22 990₸</div>
                      </div>
                    </div>

                    <div className="topTableFirst__column">
                      <div className="topTableFirst__wrapper">
                        <span className="topTableFirst__text">Бейіндік пәндер</span>
                      </div>
                      <div className="topTableFirst__prices">
                        <div className="topTableFirst__oldPrice">60 000₸</div>
                        <div className="topTableFirst__currentPrice">27 990₸</div>
                      </div>
                    </div>

                    <div className="topTableFirst__column">
                      <div className="topTableFirst__wrapper">
                        <span className="topTableFirst__text">COMBO</span>
                      </div>
                      <div className="topTableFirst__prices">
                        <div className="topTableFirst__oldPrice">100 000₸</div>
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
                    {/*<div className="priceTableBottom__column">{itemOfPrice.price6}</div>*/}
                    {/*<div className="priceTableBottom__column">{itemOfPrice.price7}</div>*/}


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
                      <button onClick={() => console.log('first column')} className="topTableFirst__button btn__shadowFromNull">
                        <span className="topTableFirst__text">Таңдау</span>
                      </button>
                    </div>

                    <div className="topTableFirst__column">
                      <button onClick={() => onShowCheckOut(0,'#6CA04A','Негізгі пәндер')} className="topTableFirst__button btn__shadowFromNull">
                        <span className="topTableFirst__text">Таңдау</span>
                      </button>
                    </div>

                    <div className="topTableFirst__column">
                      <button onClick={() => onShowCheckOut(1,'#3EC1EB','Бейіндік пәндер')} className="topTableFirst__button btn__shadowFromNull">
                        <span className="topTableFirst__text">Таңдау</span>
                      </button>
                    </div>

                    <div className="topTableFirst__column">
                      <button onClick={() => onShowCheckOut(2,'#FD6CA3','COMBO')} className="topTableFirst__button btn__shadowFromNull">
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
