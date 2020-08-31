import React from 'react'
import './subject.scss'
import Stars from '../stars/stars'
import playButton from '../../../images/general/subject/play-button.svg'


const Subject = () => {

  const toggleItemHandler = event => {

    console.log(event.target)

    if (event.currentTarget !== event.target && event.target.classList.contains('subjectItemTop')) {

      event.currentTarget.querySelector('subjectItem')

      event.currentTarget.querySelector('subjectItem').classList.contains('active')
        ? event.currentTarget.querySelector('subjectItem').classList.remove('active')
        : event.currentTarget.querySelector('subjectItem').classList.add('active')
    }

  }


  return (
    <section className="subject">

      <div className="subject__content">

        <div className="subject__column">

          <div className="subject__titles">
            <h1 className="subject__title">Математика</h1>
            <h2 className="subject__subTitle">Ұлттық Бірыңғай тестілеуге дайындыққа арналған. </h2>
          </div>

          <div className="subject__info subjectInfo">

            <div className="subjectInfo__rating">
              <Stars className="subjectInfo__stars" rating="4.5"/>

              <span className="subjectInfo__students">(123 Student)</span>
            </div>

            <div className="subjectInfo__person">

              <span className="subjectInfo__name">Ұстаз: Оралбек Қалиев</span>

              <span className="subjectInfo__language">Қазақша</span>

            </div>

            <div className="subjectInfo__buttons">

              <button className="subjectInfo__btn subjectInfo__wishlist">Wishlist</button>
              <button className="subjectInfo__btn subjectInfo__part">Бөлісу</button>
              <button className="subjectInfo__btn subjectInfo__present">Сыйға тарту</button>

            </div>

            <div className="subjectInfo__studying">
              <h2 className="subjectInfo__studyingTitle">Не үйренесіз?</h2>

              <div className="subjectInfo__labels">

                <div className="subjectInfo__label">
                  <span>Tristique eget in ac sed.</span>
                  <span>Tristique eget in ac sed.</span>
                </div>

                <div className="subjectInfo__label">
                  <span>Tristique eget in ac sed.</span>
                  <span>Tristique eget in ac sed.</span>
                </div>

                <div className="subjectInfo__label">
                  <span>Tristique eget in ac sed.</span>
                  <span>Tristique eget in ac sed.</span>
                </div>

                <div className="subjectInfo__label">
                  <span>Tristique eget in ac sed.</span>
                  <span>Tristique eget in ac sed.</span>
                </div>

              </div>

            </div>

          </div>

          <div className="subject__text">

            <h3 className="subject__textTitle">Курс туралы</h3>

            <div className="subject__mainText">
              <p>Всем привет и добро пожаловать в курс "Android разработка с нуля до Junior".</p>

              <p>
                Этот курс предназначен для людей, которые никогда не изучали языки программирования. Для того чтобы писать
                приложения, которые не просто хорошо выглядят, но и выполняют различные функции, необходимо знать язык
                Java, и первый раздел я полностью посвятил его изучению. Java это очень мощный язык, который используется
                в очень многих сферах в веб разработке, в разработке приложений под Андроид, в серверных приложениях, и
                считается довольно сложным для новичков, но не переживайте, я специально построил материал таким образом,
                чтобы он был понятен школьникам и студентам и людям различных профессий в т.ч нетехнических, у которых нет
                никакого опыта в программировании. Все что нужно от вас – это желание учиться и наличие компьютера. Лекции
                содержат домашние задания, чтобы вы не просто прослушали материал, но и закрепили его на практике. В
                первом разделе мы полностью изучим основы Java – программирования, а после займемся разработкой
                приложений.</p>

              <p>Мы с вами полностью пройдем весь путь от установки среды разработки до загрузки вашего приложения в Google
                Play. Первые наши приложения будут очень простые, потом с каждым уроком мы будем их усложнять, добавлять
                все больше новых элементов.</p>


            </div>

          </div>

          <div className="subject__text">

            <h3 className="subject__textTitle">Кімдерге арналған?
            </h3>

            <div className="subject__mainText">
              Талапкерлерге, мектеп оқушыларына, білімін шыңдағысы келетін ұстаздарға
            </div>

          </div>

          <div className="subject__text">

            <h3 className="subject__textTitle">Материалы курса</h3>

            <div className="subject__mainText">
              • 104 лекций • Общая продолжительность 24 ч 21 мин
            </div>

          </div>

          <div className="subject__bottom" onClick={toggleItemHandler}>

            <div className="subject__item subjectItem">

              <div className="subjectItem__top subjectItemTop">

                <div className="subjectItemTop__left">
                  <span className="subjectItemTop__toggle"/>

                  <span className="subjectItemTop__title">Кіріспе</span>
                </div>

                <div className="subjectItemTop__right">
                  <span className="subjectItemTop__lecture">2 лекции</span>

                  <span className="subjectItemTop__duration">4 мин</span>
                </div>

              </div>

              <div className="subjectItem__bottom subjectItemButton">

                <div className="subjectItemButton__item">
                  <div className="subjectItemButton__left">
                    <div className="subjectItemButton__icon">
                      <img src={playButton} alt="play"/>
                    </div>
                    <a href="/" className="subjectItemButton__title">Как проходить данный курс</a>
                  </div>
                  <div className="subjectItemButton__right">
                    <a href="/" className="subjectItemButton__preview">Предпросмотр</a>
                    <div className="subjectItemButton__duration">02:38</div>
                  </div>
                </div>
                <div className="subjectItemButton__item">
                  <div className="subjectItemButton__left">
                    <a href="/" className="subjectItemButton__icon">
                      <img src={playButton} alt="play"/>
                    </a>
                    <a href="/" className="subjectItemButton__title">Как проходить данный курс</a>
                  </div>
                  <div className="subjectItemButton__right">
                    <a href="/" className="subjectItemButton__preview">Предпросмотр</a>
                    <div className="subjectItemButton__duration">02:38</div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
        <div className="subject__column">
          <div className="subject__box"></div>
        </div>
        <div className="subject__column">
          <div className="subject__box"></div>
        </div>

      </div>

    </section>
  )
}

export default Subject