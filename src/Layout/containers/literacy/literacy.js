import React from 'react'
import './literacy.scss'
import maths from '../../../images/literacy/video-link.svg'

const Literacy = () => {

  return (
    <section className="literacy">
      <div className="literacy__header_title header_title">
        <div className="header_title__content">
          <div className="header_title__column header_title__column__item1">
            <div className="header_title__class">
              Мастер класс
            </div>
          </div>
          <div className="header_title__column header_title__column__item2">
            <div className="header_title__text">
              Математикалық сауаттылық
            </div>
          </div>
        </div>
      </div>
      <div className="literacy__container _container">
        <div className="literacy__content">

          <div className="literacy__column literacy__column__item1">
            <div className="table">
              <h3 className="table__title">Мастер классқа тіркелу</h3>
              <div className="table__content">
                <div className="table__content_box">
                  <input type="text" placeholder="Атыңыз"/>
                  <input type="text" placeholder="Тегіңіз"/>
                  <input type="text" placeholder="Тел. нөміріңіз"/>
                  <input type="text" placeholder="e-mail "/>
                  <input type="text" placeholder="Облыс"/>
                  <input type="text" placeholder="Қала"/>
                  <input type="text" placeholder="Мектеп"/>
                  <input type="text" placeholder="Сынып"/>
                  <input type="text" placeholder="Бейіндік пән"/>
                </div>

                <button className="table__content_button">Тіркелу</button>
              </div>
            </div>
          </div>

          <div className="literacy__column literacy__column__item2">
            <div className="timetable">
              <p className="timetable__item timetable__item__icon icon__comment">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam sodales mollis mattis adipiscing id duis
                lorem posuere. Et interdum sed est at lacinia. Vitae nulla orci ut aliquam lorem euismod a eu ultrices.
              </p>
              <p className="timetable__item timetable__item__icon icon__payment">
                Тегін
              </p>
              <p className="timetable__item timetable__item__icon icon__calender">
                03.08.2020
              </p>
              <p className="timetable__item timetable__item__icon icon__time">
                20:00
              </p>
              <p className="timetable__item timetable__item__icon icon__person">
                Оралбек Қалиев
              </p>
            </div>
          </div>

          <div className="literacy__column link literacy__column__item3">
            <a href="/">
              <img className="link__video" src={maths} alt=""/>
            </a>
          </div>

          <div className="literacy__column timer literacy__column__item4">
            <div className="timer__content">
              <div className="timer__column time">
                <span className="time__number time__days">00</span><span className="timer__dots">:</span>
              </div>
              <div className="timer__column time">
                <span className="time__number time__hours">00</span><span className="timer__dots">:</span>
              </div>
              <div className="timer__column time">
                <span className="time__number time__minutes">00</span><span className="timer__dots">:</span>
              </div>
              <div className="timer__column time">
                <span className="time__number time__seconds">00</span><span className="timer__dots">&nbsp;</span>
              </div>

              <div className="timer__column timer__column__row2 time">
                <span className="time__mark">Күн</span> <span>&nbsp;</span>
              </div>
              <div className="timer__column timer__column__row2 time">
                <span className="time__mark">Сағат</span> <span>&nbsp;</span>
              </div>
              <div className="timer__column timer__column__row2 time">
                <span className="time__mark">Минут</span> <span>&nbsp;</span>
              </div>
              <div className="timer__column timer__column__row2 time">
                <span className="time__mark">Секунд</span> <span>&nbsp;</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Literacy