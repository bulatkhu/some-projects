import React, {useRef, useEffect, useState} from 'react'
import './subject.scss'
import Stars from '../stars/stars'
import playButton from '../../../images/general/subject/play-button.svg'
import videoIcon from '../../../images/general/subject/video-icon.png'
import teacherIcon from '../../../images/general/subject/teacher-icon.jpg'

import thing1 from '../../../images/main/things/small-things/thing1.png'
import thing2 from '../../../images/main/things/small-things/thing2.png'
import thing3 from '../../../images/main/things/small-things/thing3.png'
import thing4 from '../../../images/main/things/small-things/thing4.png'
import thing5 from '../../../images/main/things/small-things/thing5.png'
import Comments from '../../login/components/comments/comments'
import studentsIcon from '../../../images/general/teacher/students-icon.jpg'

const commentsInfo = {
  comments: [
    { name: 'Бекзат Ералиев 1', icon: studentsIcon, stars: '3', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit pulvinar quam at ut sed. Sociis ullamcorper fusce libero ultricies. Ante quis vulputate nunc dolor dolor. Quis blandit eu vel sapien pulvinar volutpat dolor. Ligula arcu facilisi quis cursus nibh urna mi. Cursus auctor fusce diam nullam tempor mauris.'},
    { name: 'Бекзат Ералиев 2', icon: studentsIcon, stars: '2', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit pulvinar quam at ut sed. Sociis ullamcorper fusce libero ultricies. Ante quis vulputate nunc dolor dolor. Quis blandit eu vel sapien pulvinar volutpat dolor. Ligula arcu facilisi quis cursus nibh urna mi. Cursus auctor fusce diam nullam tempor mauris.'},
    { name: 'Бекзат Ералиев 3', icon: studentsIcon, stars: '1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit pulvinar quam at ut sed. Sociis ullamcorper fusce libero ultricies. Ante quis vulputate nunc dolor dolor. Quis blandit eu vel sapien pulvinar volutpat dolor. Ligula arcu facilisi quis cursus nibh urna mi. Cursus auctor fusce diam nullam tempor mauris.'},
  ],
  ownProfile: { icon: studentsIcon }
}


const Subject = ({container}) => {
  const [elements, setElements] = useState([])
  const ItemsWrapper = useRef(null)

  useEffect(() => {

    const items = ItemsWrapper.current.querySelectorAll('.subjectItem')
    const itemsObject = []

    items.forEach(item => {
      const height = item.querySelector('.subjectItemButton').scrollHeight
      const bottomElem = item.querySelector('.subjectItemButton')

      itemsObject.push({
        id: item.dataset.id,
        wrapperElem: item,
        bottomElem: bottomElem,
        height: height,
      })

      item.classList.add('active')

    })

    setElements(() => [...itemsObject])
  }, [])
  const toggleItemHandler = event => {

    if (event.target.dataset.id) {
      elements.forEach(item => {
        if ((item.id === event.target.dataset.id)) {

          if (item.wrapperElem.classList.contains('active')) {
            item.wrapperElem.classList.remove('active')
            item.bottomElem.style.height = item.height + 'px'
          } else {
            item.wrapperElem.classList.add('active')
            item.bottomElem.style.height = 0
          }

        }
      })

    }


  }

  const cls = ['subject__container']

  container && cls.push('_container')


  return (
    <section className="subject">

      <div className={cls.join(' ')}>


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

          </div>

          <div className="subject__column">


            <div className="subject__text">

              <h3 className="subject__textTitle">Курс туралы</h3>

              <div className="subject__mainText">
                <p>Всем привет и добро пожаловать в курс "Android разработка с нуля до Junior".</p>

                <p>
                  Этот курс предназначен для людей, которые никогда не изучали языки программирования. Для того чтобы
                  писать
                  приложения, которые не просто хорошо выглядят, но и выполняют различные функции, необходимо знать язык
                  Java, и первый раздел я полностью посвятил его изучению. Java это очень мощный язык, который
                  используется
                  в очень многих сферах в веб разработке, в разработке приложений под Андроид, в серверных приложениях, и
                  считается довольно сложным для новичков, но не переживайте, я специально построил материал таким
                  образом,
                  чтобы он был понятен школьникам и студентам и людям различных профессий в т.ч нетехнических, у которых
                  нет
                  никакого опыта в программировании. Все что нужно от вас – это желание учиться и наличие компьютера.
                  Лекции
                  содержат домашние задания, чтобы вы не просто прослушали материал, но и закрепили его на практике. В
                  первом разделе мы полностью изучим основы Java – программирования, а после займемся разработкой
                  приложений.</p>

                <p>Мы с вами полностью пройдем весь путь от установки среды разработки до загрузки вашего приложения в
                  Google
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

            <div onClick={toggleItemHandler} ref={ItemsWrapper} className="subject__bottom">


              <div data-id="1" className="subject__item subjectItem">

                <div className="subjectItem__top subjectItemTop">

                  <div data-id="1" className="subjectItemTop__overlay"/>

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

              <div data-id="2" className="subject__item subjectItem">

                <div className="subjectItem__top subjectItemTop">

                  <div data-id="2" className="subjectItemTop__overlay"/>

                  <div className="subjectItemTop__left">
                    <span className="subjectItemTop__toggle"/>

                    <span className="subjectItemTop__title">Введение</span>
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

              <div data-id="3" className="subject__item subjectItem">

                <div className="subjectItem__top subjectItemTop">

                  <div data-id="3" className="subjectItemTop__overlay"/>

                  <div className="subjectItemTop__left">
                    <span className="subjectItemTop__toggle"/>

                    <span className="subjectItemTop__title">Введение</span>
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

              <div data-id="4" className="subject__item subjectItem">

                <div className="subjectItem__top subjectItemTop">

                  <div data-id="4" className="subjectItemTop__overlay"/>

                  <div className="subjectItemTop__left">
                    <span className="subjectItemTop__toggle"/>

                    <span className="subjectItemTop__title">Введение</span>
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

                </div>

              </div>

              <div data-id="5" className="subject__item subjectItem">

                <div className="subjectItem__top subjectItemTop">

                  <div data-id="5" className="subjectItemTop__overlay"/>

                  <div className="subjectItemTop__left">
                    <span className="subjectItemTop__toggle"/>

                    <span className="subjectItemTop__title">Введение</span>
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

                </div>

              </div>

              <div data-id="6" className="subject__item subjectItem">

                <div className="subjectItem__top subjectItemTop">

                  <div data-id="6" className="subjectItemTop__overlay"/>

                  <div className="subjectItemTop__left">
                    <span className="subjectItemTop__toggle"/>

                    <span className="subjectItemTop__title">Введение</span>
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

                </div>

              </div>

              <div data-id="7" className="subject__item subjectItem">

                <div className="subjectItem__top subjectItemTop">

                  <div data-id="7" className="subjectItemTop__overlay"/>

                  <div className="subjectItemTop__left">
                    <span className="subjectItemTop__toggle"/>

                    <span className="subjectItemTop__title">Введение</span>
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

                </div>

              </div>


            </div>
          </div>

          <div className="subject__column">
            <div className="subjectVideo">

              <a href="/" className="subjectVideo__img">
              <span>
                <img src={playButton} alt="play button"/>
              </span>
                <img src={videoIcon} alt="video preview"/>
              </a>

              <div className="subjectVideo__price">4000т</div>

              <div className="subjectVideo__text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ullamcorper ornare potenti sed netus laoreet
                tortor. Id dolor ullamcorper in eget imperdiet.
              </div>

              <button className="subjectVideo__btn">Buy Now</button>


            </div>
          </div>
          <div className="subject__column">
            <div className="subjectThings">

              <div className="subjectThings__wrapper">


                <div className="subjectThings__item subjectThings__img">
                  <img src={thing1} alt="thing"/>
                </div>

                <div className="subjectThings__item subjectThings__img">
                  <img src={thing2} alt="thing"/>
                </div>

                <div className="subjectThings__item subjectThings__img">
                  <img src={thing3} alt="thing"/>
                </div>

                <div className="subjectThings__item subjectThings__img">
                  <img src={thing4} alt="thing"/>
                </div>

                <div className="subjectThings__item subjectThings__img">
                  <img src={thing5} alt="thing"/>
                </div>

                <div className="subjectThings__item subjectThings__price">

                  <div className="subjectThings__bottom">
                    <div className="subjectThings__current">
                      <span className="subjectThings__equal">=</span>
                      <span>999999 ₸</span>
                    </div>
                    <div className="subjectThings__old">
                      <span>9999 ₸</span></div>
                  </div>

                </div>

              </div>

              <div className="subjectThings__wrapBottom">

                <button className="subjectThings__btn">Buy</button>

              </div>


            </div>
          </div>

        </div>

        <div className="subject__teacher subjectTeacher">

          <div className="subjectTeacher__top">

            <div className="subjectTeacher__img">
              <img src={teacherIcon} alt="this teacher"/>
            </div>

            <div className="subjectTeacher__description">
              <div className="subjectTeacher__name">Teacher Name</div>
              <div className="subjectTeacher__subject">Math Teacher</div>
            </div>

          </div>

          <div className="subjectTeacher__bottom">
            <p className="subjectTeacher__text"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. A faucibus blandit
              pellentesque praesent ullamcorper purus neque vitae eleifend. Felis accumsan sapien, varius sit integer.
              Condimentum tristique sagittis, duis sit fames nibh tristique. Massa fermentum mus faucibus orci. Amet,
              quisque integer urna, elit ultricies amet, in. Ultrices nibh pharetra dictum eleifend a mauris, purus
              lectus. Id sed ipsum ac quam at magna </p>
          </div>

        </div>


        <Comments info={commentsInfo}/>

      </div>

    </section>
  )
}

export default Subject