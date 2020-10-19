import React from 'react'
import './prices.scss'

const pricesData = [
  {title: '1 айға', price1: '3990₸', price2: '5990₸', price3: '8990₸',  price4: '7990₸', price5: '14990₸', price6: '14990₸', price7: '14990₸'},
  {title: '3 айға', price1: '5990₸', price2: '7990₸', price3: '13990₸', price4: '12990₸', price5: '24990₸', price6: '24990₸', price7: '24990₸'},
  {title: '6 айға', price1: '11990₸', price2: '13990₸', price3: '23990₸',  price4: '22990₸', price5: '44990₸', price6: '44990₸', price7: '44990₸'},
  {title: '9 айға', price1: '15990₸', price2: '19990₸', price3: '33990₸',  price4: '32990₸', price5: '59990₸', price6: '59990₸', price7: '59990₸'},
  {title: 'Видеосабақтар', price1: '+', price2: '+', price3: 'plus',  price4: 'plus', price5: 'plus', price6: 'plus', price7: 'plus'},
  {title: 'Тест видео шешімдері', price1: 'plus', price2: 'plus', price3: 'plus',  price4: 'plus', price5: 'plus', price6: 'plus', price7: 'plus'},
  {title: 'Тақырыптық тесттер', price1: 'plus', price2: 'plus', price3: 'plus',  price4: 'plus', price5: 'plus', price6: 'plus', price7: 'plus'},
  {title: 'Байқау сынақтары', price1: '-', price2: 'plus', price3: 'plus',  price4: 'plus', price5: 'plus', price6: 'plus', price7: 'plus'},
  {title: 'Айлық қорытынды тесті', price1: 'minus', price2: 'plus', price3: 'plus',  price4: 'plus', price5: 'plus', price6: 'plus', price7: 'plus'},
  {title: 'Кураторлық', price1: 'minus', price2: 'minus', price3: 'plus',  price4: 'plus', price5: 'plus', price6: 'plus', price7: 'plus'},
  {title: 'Профориентология ', price1: 'minus', price2: 'minus', price3: 'minus',  price4: 'minus', price5: 'plus', price6: 'minus', price7: 'minus'},
  {title: 'Live вебинар', price1: 'minus', price2: 'minus', price3: 'plus',  price4: 'plus', price5: 'plus', price6: 'plus', price7: 'plus'},
]

const Prices = () => {

  return (
    <section className="prices">

      <div className="prices__container _container">

        <h3 className="prices__title">Price</h3>

        <div className="prices__table priceTable">

          <div className="priceTable__top priceTableTop">
            <div className="priceTableTop__content">

              <div className="priceTableTop__column">&nbsp;</div>
              <div className="priceTableTop__column">
                <span>ҰБТ</span>
                <div className="topTableFirst">
                  <div className="topTableFirst__content">

                    <div className="topTableFirst__column topTableFirst__column__bg">
                      <span>1 пән</span>
                      <div className="topSmallTable__content2">
                        <div className="topSmallTable__column">
                          <span>Негізгі пән</span>
                        </div>

                        <div className="topSmallTable__column">
                          <span>Бейіндік пән</span>
                        </div>
                      </div>
                    </div>

                    <div className="topTableFirst__column">
                      <span>2 пән</span>
                      <div className="topSmallTable__content">
                        <div className="topSmallTable__column">
                          <span>Бейіндік пән</span>
                        </div>
                      </div>
                    </div>

                    <div className="topTableFirst__column">
                      <span>3 пән</span>
                      <div className="topSmallTable__content">
                        <div className="topSmallTable__column">
                          <span>Негізгі пән</span>
                        </div>
                      </div>
                    </div>

                    <div className="topTableFirst__column">
                      <span>5 пән</span>
                      <div className="topSmallTable__content">
                        <div className="topSmallTable__column">
                          <span>Combo</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="priceTableTop__column">
                <span>НЗМ</span>

                <div className="topTableSecond">
                  <span className="theme">5 пән</span>
                  <div className="topSmallTable__content">
                    <div className="topSmallTable__column">
                      <span>Combo</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="priceTableTop__column">
                <span>БИЛ</span>

                <div className="topTableSecond">
                  <span className="theme">4 пән</span>
                  <div className="topSmallTable__content">
                    <div className="topSmallTable__column">
                      <span>Combo</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>


            <div className="priceColumnBottom__content">

              {pricesData.map((itemOfPrice, index) => {
                const keys = Object.keys(itemOfPrice)

                keys.forEach(item => {
                  if (itemOfPrice[item] === 'minus' || itemOfPrice[item] === '-') {
                    itemOfPrice[item] = <div className="tableBottom__redMinus"><span/></div>
                  } else if (itemOfPrice[item] === 'plus' || itemOfPrice[item] === '+') {
                    itemOfPrice[item] = <div className="tableBottom__greenCross"><span/><span/></div>
                  }
                })

                return (

                  <div key={index + itemOfPrice.price2} className="priceTableBottom__content priceColumnBottom__column">

                    <div className="priceTableBottom__column">{itemOfPrice.title}</div>
                    <div className="priceTableBottom__column">

                      <div className="tableBottom__content">

                        <div className="tableBottom__column">
                          {itemOfPrice.price1}
                        </div>

                        <div className="tableBottom__column">
                          {itemOfPrice.price2}
                        </div>

                        <div className="tableBottom__column">
                          {itemOfPrice.price3}
                        </div>

                        <div className="tableBottom__column">
                          {itemOfPrice.price4}
                        </div>

                        <div className="tableBottom__column">
                          {itemOfPrice.price5}
                        </div>

                      </div>

                    </div>
                    <div className="priceTableBottom__column">{itemOfPrice.price6}</div>
                    <div className="priceTableBottom__column">{itemOfPrice.price7}</div>


                  </div>

                )
              })}


            </div>


          </div>


        </div>

      </div>

    </section>
  )
}

export default Prices