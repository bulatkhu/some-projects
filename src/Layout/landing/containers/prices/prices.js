import React from 'react'
import './prices.scss'

const pricesData = [
  {title: '1 айға', price1: '4000₸', price2: '6000₸', price3: '9000₸',  price4: '8000₸', price5: '14900₸', price6: '65465₸', price7: '65465₸'},
  {title: '3 айға', price1: '6000₸', price2: '8000₸', price3: '14000₸', price4: '13000₸', price5: '24900₸', price6: '65465₸', price7: '65465₸'},
  {title: '6 айға', price1: '12000₸', price2: '14000₸', price3: '24000₸',  price4: '23000₸', price5: '44990₸', price6: '65465₸', price7: '65465₸'},
  {title: '9 айға', price1: '16000₸', price2: '20000₸', price3: '34000₸',  price4: '33000₸', price5: '59990₸', price6: '65465₸', price7: '65465₸'},
  {title: 'Видеосабақтар', price1: 'plus', price2: 'plus', price3: 'plus',  price4: 'plus', price5: 'plus', price6: 'plus', price7: 'plus'},
  {title: 'Тест видео шешімдері', price1: 'plus', price2: 'plus', price3: 'plus',  price4: 'plus', price5: 'plus', price6: 'plus', price7: 'plus'},
  {title: 'Тест видео шешімдері', price1: 'plus', price2: 'plus', price3: 'plus',  price4: 'plus', price5: 'plus', price6: 'plus', price7: 'plus'},
  {title: 'Тақырыптық тесттер', price1: 'plus', price2: 'plus', price3: 'plus',  price4: 'plus', price5: 'plus', price6: 'plus', price7: 'plus'},
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