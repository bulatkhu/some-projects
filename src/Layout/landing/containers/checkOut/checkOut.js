import React, {useEffect} from 'react'
import Select from 'react-select'
import {Link} from 'react-router-dom'
import {scrollBodyHandler} from '../../../../scripts/scrollController/scrollController'
import subjectIMG1 from '../../../../images/general/courses/tab-thing1.jpg'
import subjectIMG2 from '../../../../images/general/courses/tab-thing2.jpg'
// import Stars from '../../../general/stars/stars'
import kaspiBank from '../../../../images/landing/checkBoxes/bankKaspi.svg'
import bankCard from '../../../../images/landing/checkBoxes/bankCard.svg'
import './checkOut.scoped.scss'

function SubjectBox({title, img, id}) {

  return (
    <div className="bottom__column" data-item="true" data-forid={'title'}>
      <div className="bottom__item">
        <h3 className="bottom__item_title">{title}</h3>

        <div className="bottom__item_img">
          {img ? <img src={img} alt="thing"/> : null}
        </div>

        {/*<Stars*/}
        {/*  className="bottom__item_mark"*/}
        {/*  classNameOfValue=""*/}
        {/*  rating={5}*/}
        {/*/>*/}
        <div className="bottom__item_price item_price">
          {/*<span className="item_price__current">{`${price} ${currency}`}</span>*/}
        </div>
        <Link to={"/subject/" + id} className="btn__shadowFromNull bottom__item_button item_button">
          Толығырақ
        </Link>
      </div>
    </div>

  )
}

function CoursesOverplay() {

  return (
    <div className="checkOut-subject__overlay subOverlay">
      <p className="subOverlay__text">
        Негізгі пәндерді қосу арқылы 5 990₸ эконом жасаңыз.
      </p>

      <button className="subOverlay__btn">Қосу</button>
    </div>
  )
}

const options = [
  {label: 2021, value: 2021},
  {label: 2020, value: 2020},
  {label: 2019, value: 2019},
  {label: 2018, value: 2018},
  {label: 2017, value: 2017}
]

function CloseButton({show}) {

  return (
    <span onClick={() => show(false)} className="close">
      <span className="close__relative">
        <span/>
        <span/>
      </span>
    </span>
  )
}


const CheckOut = ({show}) => {
  useEffect(() => {
    scrollBodyHandler.lock()

    return () => scrollBodyHandler.unLock()

  })


  return (
    <div className="checkOut__wrapper">
      <div className="checkOut">
        <h1 className="checkOut__title">
          <span>ТӨЛЕМ ЖАСАУ</span>
          <CloseButton show={show}/>
        </h1>

        <div className="checkOut__body">
          <div className="checkOut__content">
            <div className="checkOut__column">
              <h2 className="checkOut__courseTitle">Пәндерді таңдаңыз</h2>
            </div>
            <div className="checkOut__column"/>
            <div className="checkOut__column">
              <div className="checkOut-select__wrapper checkOut-subject__content">
                <div className="checkOut-select__short">
                  <Select
                    options={{options}}
                    placeholder="Курс тілі"
                  />
                </div>

                <div className="checkOut-select__long">
                  <Select
                    options={{options}}
                    placeholder="Курс тілі"
                  />
                </div>
              </div>
              <div className="checkOut-subject__content">
                <CoursesOverplay/>

                <SubjectBox id={0} img={subjectIMG1} title="ФИЗИКА"/>
                <SubjectBox id={1} img={subjectIMG2} title="МАТЕМАТИКА"/>
              </div>

            </div>

            <div className="checkOut__column">
              <h2 className="checkOut__subTitle">Негізгі пәндер</h2>

              <div className="checkOut-subject__content checkOut-subject__subContent">

                <CoursesOverplay/>

                <SubjectBox id={0} img={subjectIMG1} title="ОҚУ САУАТТЫЛЫҒЫ"/>
                <SubjectBox id={1} img={subjectIMG2} title="МАТЕМАТИКАЛЫҚ САУАТТЫЛЫҚ"/>
                <SubjectBox id={1} img={subjectIMG2} title="ҚАЗАҚСТАН ТАРИХЫ"/>
              </div>

            </div>
            <form className="checkOut__column checkOut-side">
              <div className="checkOut-side__body">

                <h2 className="checkOut-side__title">
                  <span>COMBO</span>
                  <span>5 пәнге/6 айға</span>
                </h2>

                <div className="checkOut-side__wrapper">

                  <div className="checkOut-side__checkBoxes">
                    <h3 className="checkOut-side__checkTitle">Төлем тәсілі</h3>

                    <label className="checkOut-side__label" htmlFor="price1">
                      <input
                        name="price1"
                        id="price1"
                        type="checkbox"
                      />
                      <span className="checkOut-side__checkSubTitle">Бөліп төлеу 34 990₸</span>
                      <span className="checkOut-side__boxRequired">
                        <span>*</span>
                        Келесі төлем (10 000₸) уақыты
                        02.01.2021 – 09.01.2021
                      </span>
                    </label>
                    <label className="checkOut-side__label" htmlFor="price2">
                      <input
                        name="price2"
                        id="price2"
                        type="checkbox"
                      />
                      <span className="checkOut-side__checkSubTitle">
                        Толық төлеу 44 990₸
                      </span>
                    </label>
                  </div>

                  <div className="checkOut-side__checkBoxes">
                    <h3 className="checkOut-side__checkTitle">Төлем түрін таңдаңыз</h3>

                    <label className="checkOut-side__label" htmlFor="price3">
                      <span className="bank">
                        <span className="bank__content">
                          <input
                            name="price3"
                            id="price3"
                            type="checkbox"
                          />

                          <span className="bank__img">
                            <img src={kaspiBank} alt="kaspi"/>
                          </span>

                          <span className="bank__text">Kaspi </span>
                        </span>

                      </span>
                    </label>
                    <label className="checkOut-side__label" htmlFor="price4">

                      <span className="bank">
                        <span className="bank__content">
                           <input
                             name="price4"
                             id="price4"
                             type="checkbox"
                           />

                          <span className="bank__img">
                            <img src={bankCard} alt="card"/>
                          </span>

                          <span className="bank__text">Банк картасы </span>
                        </span>

                      </span>
                    </label>
                  </div>

                  <button className="checkOut-side__btn btn__shadowFromNull">
                    <span>44 990 ₸</span>
                    <span>Төлем жасау</span>
                  </button>
                </div>

              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CheckOut
