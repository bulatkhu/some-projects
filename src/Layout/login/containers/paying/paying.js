import React, {useState} from 'react'
import Select from 'react-select'
import teacherImg from '../../../../images/general/paying/teaching-img.jpg'
import './paying.scss'

const Paying = () => {
  const initialSelectors = [
    { value: 'card', label: 'Card', id: 0 },
    { value: 'kaspi', label: 'Kaspi', id: 1 },
  ]

  // eslint-disable-next-line no-unused-vars
  const [selectValue, setSelectValue] = useState(initialSelectors[0])

  const selectorStyles = {
    singleValue: styles => ({
      ...styles,
      color: '#626267',
      fontWeight: 'normal',
      fontSize: '24px',
      lineHeight: '32px',
    }),
    control: styles => ({
      ...styles,
      borderRadius: 34,
      border: '2px solid #626267',
    }),
    option: styles => ({
      ...styles,
    }),
    indicatorSeparator: styles => ({
      ...styles,
      display: 'none'
    }),
    dropdownIndicator: (styles, state) => ({
      ...styles,
      transition: 'all .3s',
      transform: state.isFocused ? 'rotate(180deg)' : 'rotate(0)',
      color: '#626267'
    })
  }

  const renderCurrentBox = () => {

    const currentBox = initialSelectors.find(item => +item.id === +selectValue.id)

    if (currentBox.value === 'card') {
      return (
        <div className="paying-content__column">
          <form className="paying-content__box">

            <div className="paying-content__boxWrapper">

              <input className="paying-content__input" name="name" type="text" placeholder="Card Name"/>

              <input className="paying-content__input" name="number" type="text" placeholder="Card Number"/>

              <div className="paying-content__wrapper">

                <input className="paying-content__input paying-content__minInput" name="valid" type="text"
                       placeholder="Valid"/>

                <input className="paying-content__input paying-content__minInput" name="cvv" type="text"
                       placeholder="CVV"/>

                <input className="paying-content__input paying-content__minInput" name="code" type="text"
                       placeholder="Post Code"/>

              </div>

              <div className="paying-content-check">
                <input required className="paying-content-check__input" id="agreement" name="agreement"
                       type="checkbox"/>
                <label className="paying-content-check__label" htmlFor="agreement">By completing your purchase, you
                  agree to these Terms of Service.</label>
              </div>

            </div>

            <div className="paying-content-btn">
              <button className="paying-content-btn__button">BUY</button>
            </div>


          </form>
        </div>
      )
    } else if (currentBox.value === 'kaspi') {
      return (
        <div className="paying-content__column">
          <form className="paying-content__box">

            <div className="paying-content__boxWrapper">

              <input className="paying-content__input" name="name" type="text" placeholder="Phone Number"/>

              <input className="paying-content__input" name="number" type="text" placeholder="Password"/>

              <div className="paying-content-check">
                <input required className="paying-content-check__input" id="agreement" name="agreement"
                       type="checkbox"/>
                <label className="paying-content-check__label" htmlFor="agreement">
                  By completing your purchase, you agree to these Terms of Service.
                </label>
              </div>

            </div>

            <div className="paying-content-btn">
              <button className="paying-content-btn__button">BUY</button>
            </div>


          </form>
        </div>
      )
    }

    return (
      <div>
        Hello!
      </div>
    )
  }


  return (
    <section className="paying">

      <div className="paying__container _container">

        <div className="paying-type">
          <div className="paying-type__selector">

            <Select
              name="type"
              isSearchable={false}
              defaultValue={initialSelectors[0]}
              options={initialSelectors}
              styles={selectorStyles}
              onChange={value => setSelectValue(() => value)}
            />

          </div>
        </div>

        <div className="paying-content">

          {renderCurrentBox()}

          <div className="paying-content__column">
            <div className="paying-content__box">

              <div className="paying-content__img">
                <img src={teacherImg} alt="course description"/>
              </div>

              <div className="paying-content__description">

                <p className="paying-content__price">
                  <span>Price :</span>
                  <span>100 $</span>
                </p>

                <p>
                  Educon is required by law to collect transaction taxes applicable to purchases made in certain tax areas.
                </p>


                <p>
                  By completing your purchase, you agree to these Terms of Service.
                </p>


              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  )
}

export default Paying