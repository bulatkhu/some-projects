import React from 'react'
import './payment.scss'


const Payment = () => {

  const downloadIcon = <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.667 10H1.33366C0.965469 10 0.666992 10.2985 0.666992 10.6667C0.666992 11.0349 0.965469 11.3333 1.33366 11.3333H10.667C11.0352 11.3333 11.3337 11.0349 11.3337 10.6667C11.3337 10.2985 11.0352 10 10.667 10Z" fill="white"/>
    <path d="M0.666992 9.33334L0.666992 10.6667C0.666992 11.0349 0.965469 11.3333 1.33366 11.3333C1.70185 11.3333 2.00033 11.0349 2.00033 10.6667V9.33334C2.00033 8.96515 1.70185 8.66667 1.33366 8.66667C0.965469 8.66667 0.666992 8.96515 0.666992 9.33334Z" fill="white"/>
    <path d="M10 9.33334V10.6667C10 11.0349 10.2985 11.3333 10.6667 11.3333C11.0349 11.3333 11.3333 11.0349 11.3333 10.6667V9.33334C11.3333 8.96515 11.0349 8.66667 10.6667 8.66667C10.2985 8.66667 10 8.96515 10 9.33334Z" fill="white"/>
    <path d="M6.00029 8C5.86208 8.00105 5.72696 7.95912 5.61363 7.88L2.94696 6C2.80323 5.89804 2.70572 5.74333 2.67574 5.56968C2.64576 5.39604 2.68574 5.21758 2.78696 5.07333C2.83748 5.00123 2.90179 4.93985 2.97616 4.89274C3.05054 4.84562 3.13351 4.81371 3.22028 4.79883C3.30706 4.78395 3.39592 4.78641 3.48174 4.80607C3.56756 4.82572 3.64864 4.86218 3.72029 4.91333L6.00029 6.50667L8.26696 4.8C8.40841 4.69391 8.58621 4.64836 8.76124 4.67337C8.93628 4.69837 9.09421 4.79188 9.20029 4.93333C9.30638 5.07478 9.35193 5.25258 9.32693 5.42761C9.30192 5.60265 9.20841 5.76058 9.06696 5.86667L6.40029 7.86667C6.2849 7.95322 6.14454 8 6.00029 8Z" fill="white"/>
    <path d="M6.00065 6.66667C5.82384 6.66667 5.65427 6.59643 5.52925 6.4714C5.40422 6.34638 5.33398 6.17681 5.33398 6V0.666667C5.33398 0.489856 5.40422 0.320286 5.52925 0.195262C5.65427 0.0702379 5.82384 0 6.00065 0C6.17746 0 6.34703 0.0702379 6.47206 0.195262C6.59708 0.320286 6.66732 0.489856 6.66732 0.666667V6C6.66732 6.17681 6.59708 6.34638 6.47206 6.4714C6.34703 6.59643 6.17746 6.66667 6.00065 6.66667Z" fill="white"/>
  </svg>


  return (
    <section className="payment">

      <div className="payment__newPayments newPaying">
        <h2 className="payment__title newPaying__title">Жаңа төлемдер</h2>

        <div className="newPaying__table payment__table">
          <div className="newPaying__column newPaying__title">
            <div className="payment__tableTitle newPaying__item">Пәні</div>
            <div className="payment__tableTitle newPaying__item">Жылдық құны</div>
            <div className="payment__tableTitle newPaying__item">Төленді</div>
            <div className="payment__tableTitle newPaying__item">Келесі төлем уақыты</div>
            <div className="payment__tableTitle newPaying__item">EduCoin</div>
            <div className="payment__tableTitle newPaying__item">Чек</div>
          </div>
          <div className="newPaying__column payment__row">
            <div className="payment__tableItem newPaying__item">Қазақстан тарихы</div>
            <div className="payment__tableItem newPaying__item">16000т</div>
            <div className="payment__tableItem newPaying__item">
              <span>4000т</span>
              <span className="newPaying__littleDate">17.09.2020</span>
            </div>
            <div className="payment__tableItem newPaying__item">
              <span className="newPaying__bigDate">17.10.2020</span>
              <span className="newPaying__currency">4000т</span>
            </div>
            <div className="payment__tableItem newPaying__item">
              <div className="newPaying__educoin">
                <span>7000 ₸</span> <span className="newPaying__coin"/> <span>=7000 ₸</span>
              </div>
            </div>
            <div className="payment__tableItem newPaying__item">
              <a href="/" className="payment__button newPaying__button">Pay</a>
            </div>
          </div>
          <div className="newPaying__column payment__row">
            <div className="payment__tableItem newPaying__item">Оқу сауаттылығы</div>
            <div className="payment__tableItem newPaying__item">16000т</div>
            <div className="payment__tableItem newPaying__item">
              <span>4000т</span>
            </div>
            <div className="payment__tableItem newPaying__item">
              <span className="newPaying__bigDate">17.10.2020</span>
            </div>
            <div className="payment__tableItem newPaying__item">
              <div className="newPaying__educoin">
                <span>7000 ₸</span> <span className="newPaying__coin"/> <span>=7000 ₸</span>
              </div>
            </div>
            <div className="payment__tableItem newPaying__item">
              <a href="/" className="payment__button newPaying__button">Pay</a>
            </div>
          </div>
          <div className="newPaying__column payment__row">
            <div className="payment__tableItem newPaying__item">Математикалық
              сауаттылық
            </div>
            <div className="payment__tableItem newPaying__item">16000т</div>
            <div className="payment__tableItem newPaying__item">
              <span>4000т</span>
              <span className="newPaying__littleDate">17.09.2020</span>
            </div>
            <div className="payment__tableItem newPaying__item">
              <span className="newPaying__bigDate">17.10.2020</span>
              <span className="newPaying__currency">4000т</span>
            </div>
            <div className="payment__tableItem newPaying__item">
              <div className="newPaying__educoin">
                <span>7000 ₸</span> <span className="newPaying__coin"/> <span>=7000 ₸</span>
              </div>
            </div>
            <div className="payment__tableItem newPaying__item">
              <a href="/" className="payment__button newPaying__button">Pay</a>
            </div>
          </div>
        </div>
      </div>

      <div className="payment__history historyPayment">
        <h2 className="payment__title historyPayment__title">Төлемдер тарихы</h2>

        <div className="historyPayment__table">

          <div className="historyPayment__content historyPayment__title">
            <div className="payment__tableTitle historyPayment__item">Пәні</div>
            <div className="payment__tableTitle historyPayment__item">Жылдық құны</div>
            <div className="payment__tableTitle historyPayment__item">Айлық төлем құны</div>
            <div className="payment__tableTitle historyPayment__item">Төленді</div>
            <div className="payment__tableTitle historyPayment__item">Келесі төлем уақыты</div>
            <div className="payment__tableTitle historyPayment__item">EduCoin</div>
            <div className="payment__tableTitle historyPayment__item">Чек</div>
          </div>

          <div className="historyPayment__column payment__row">
            <div className="payment__tableItem historyPayment__item">Қазақстан тарихы</div>
            <div className="payment__tableItem historyPayment__item">16000т</div>
            <div className="payment__tableItem historyPayment__item">
              <span>4000т</span>
            </div>
            <div className="payment__tableItem historyPayment__item">
              <span className="historyPayment__currency">4000т</span>
              <span className="historyPayment__littleDate">17.10.2020</span>
            </div>
            <div className="payment__tableItem historyPayment__item">
              <span className="newPaying__bigDate">17.10.2020</span>
              <span className="newPaying__currency">4000т</span>
            </div>
            <div className="payment__tableItem historyPayment__item">
              <div className="newPaying__educoin">
                <span>7000 ₸</span> <span className="newPaying__coin"/> <span>=7000 ₸</span>
              </div>
            </div>
            <div className="payment__tableItem historyPayment__item">
              <a href="/" className="payment__button newPaying__button"><span className="historyPayment__downloadText">Download.pdf</span> <span className="historyPayment__download">{downloadIcon}</span></a>
            </div>
          </div>

          <div className="historyPayment__column payment__row">
            <div className="payment__tableItem historyPayment__item">Оқу сауаттылығы</div>
            <div className="payment__tableItem historyPayment__item">16000т</div>
            <div className="payment__tableItem historyPayment__item">
              <span>4000т</span>
            </div>
            <div className="payment__tableItem historyPayment__item">
              <span className="historyPayment__currency">4000т</span>
            </div>
            <div className="payment__tableItem historyPayment__item">
              <span className="newPaying__bigDate">17.10.2020</span>
            </div>
            <div className="payment__tableItem historyPayment__item">
              <div className="newPaying__educoin">
                <span>7000 ₸</span> <span className="newPaying__coin"/> <span>=7000 ₸</span>
              </div>
            </div>
            <div className="payment__tableItem historyPayment__item">
              <a href="/" className="payment__button newPaying__button"><span className="historyPayment__downloadText">Download.pdf</span> <span className="historyPayment__download">{downloadIcon}</span></a>
            </div>
          </div>

          <div className="historyPayment__column payment__row">
            <div className="payment__tableItem historyPayment__item">Математикалық
              сауаттылық</div>
            <div className="payment__tableItem historyPayment__item">16000т</div>
            <div className="payment__tableItem historyPayment__item">
              <span>4000т</span>
            </div>
            <div className="payment__tableItem historyPayment__item">
              <span className="historyPayment__currency">4000т</span>
            </div>
            <div className="payment__tableItem historyPayment__item">
              <span className="newPaying__bigDate">17.10.2020</span>
            </div>
            <div className="payment__tableItem historyPayment__item">
              <div className="newPaying__educoin">
                <span>7000 ₸</span> <span className="newPaying__coin"/> <span>=7000 ₸</span>
              </div>
            </div>
            <div className="payment__tableItem historyPayment__item">
              <a href="/" className="payment__button newPaying__button"><span className="historyPayment__downloadText">Download.pdf</span> <span className="historyPayment__download">{downloadIcon}</span></a>

            </div>
          </div>

          <div className="historyPayment__column payment__row">
            <div className="payment__tableItem historyPayment__item">Физика</div>
            <div className="payment__tableItem historyPayment__item">20000т</div>
            <div className="payment__tableItem historyPayment__item">
              <span>4000т</span>
            </div>
            <div className="payment__tableItem historyPayment__item">
              <span className="historyPayment__currency">4000т</span>
            </div>
            <div className="payment__tableItem historyPayment__item">
              <span className="newPaying__bigDate">17.10.2020</span>
            </div>
            <div className="payment__tableItem historyPayment__item">
              <div className="newPaying__educoin">
                <span>7000 ₸</span> <span className="newPaying__coin"/> <span>=7000 ₸</span>
              </div>
            </div>
            <div className="payment__tableItem historyPayment__item">
              <a href="/" className="payment__button newPaying__button"><span className="historyPayment__downloadText">Download.pdf</span> <span className="historyPayment__download">{downloadIcon}</span></a>

            </div>
          </div>

          <div className="historyPayment__column payment__row">
            <div className="payment__tableItem historyPayment__item">Математика </div>
            <div className="payment__tableItem historyPayment__item">20000т</div>
            <div className="payment__tableItem historyPayment__item">
              <span>4000т</span>
            </div>
            <div className="payment__tableItem historyPayment__item">
              <span className="historyPayment__currency">4000т</span>
            </div>
            <div className="payment__tableItem historyPayment__item">
              <span className="newPaying__bigDate">17.10.2020</span>
            </div>
            <div className="payment__tableItem historyPayment__item">
              <div className="newPaying__educoin">
                <span>7000 ₸</span> <span className="newPaying__coin"/> <span>=7000 ₸</span>
              </div>
            </div>
            <div className="payment__tableItem historyPayment__item">
              <a href="/" className="payment__button newPaying__button"><span className="historyPayment__downloadText">Download.pdf</span> <span className="historyPayment__download">{downloadIcon}</span></a>
            </div>
          </div>

          <div className="historyPayment__column payment__row">
            <div className="payment__tableItem historyPayment__item">Combo</div>
            <div className="payment__tableItem historyPayment__item">59990т</div>
            <div className="payment__tableItem historyPayment__item">
              <span>4000т</span>
            </div>
            <div className="payment__tableItem historyPayment__item">
              <span className="historyPayment__currency">4000т</span>
            </div>
            <div className="payment__tableItem historyPayment__item">
              <span className="newPaying__bigDate">17.10.2020</span>
            </div>
            <div className="payment__tableItem historyPayment__item">
              <div className="newPaying__educoin">
                <span>7000 ₸</span> <span className="newPaying__coin"/> <span>=7000 ₸</span>
              </div>
            </div>
            <div className="payment__tableItem historyPayment__item">
              <a href="/" className="payment__button newPaying__button"><span className="historyPayment__downloadText">Download.pdf</span> <span className="historyPayment__download">{downloadIcon}</span></a>
            </div>
          </div>

        </div>

        <div className="historyPayment__buttonWrapper">
          <button className="historyPayment__button">
            Төлем жасау
            4000 ₸
          </button>
        </div>
      </div>

    </section>
  )
}

export default Payment