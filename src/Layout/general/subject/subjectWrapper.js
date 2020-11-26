import React, {useEffect, useRef, useState} from 'react'
import Stars from '../stars/stars'
import playButton from '../../../images/general/subject/play-button.svg'
import thing1 from '../../../images/main/things/small-things/thing1.png'
import thing2 from '../../../images/main/things/small-things/thing2.png'
import thing3 from '../../../images/main/things/small-things/thing3.png'
import thing4 from '../../../images/main/things/small-things/thing4.png'
import thing5 from '../../../images/main/things/small-things/thing5.png'
import Comments from '../../login/components/comments/comments'
import studentsIcon from '../../../images/general/teacher/students-icon.jpg'
import VideoPlayer from '../videoPlayer/videoPlayer'
import {getFromUserMeta} from '../../../scripts/dataHandler/dataHandler'
import NoPhoto from '../../../images/general/noPhoto/noPhoto'


function getVideoFromRes(response) {
  const linkToVideo = response.meta.video
    ? response.meta.video
    : response.parts[0].video || response.parts[0].upload_video

  return linkToVideo
}


const SubjectWrapper = ({response, isLoaded}) => {
  const [elements, setElements] = useState([])
  const ItemsWrapper = useRef(null)
  const toggleItemHandler = event => {
    if (event.target.dataset.id) {
      console.log('id', event.target.dataset.id)

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

  const linkToVideo = getVideoFromRes(response)


  useEffect(() => {
    if (response && isLoaded) {
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
    }

    console.log('response', response)
  }, [response, isLoaded])

  const {user} = response.product || null
  const biography = getFromUserMeta(user, 'biography') ||
    getFromUserMeta(user, 'short_biography')
  const avatar = getFromUserMeta(user, 'avatar')
  const comments = response.product.comments

  return (
    <>

      <div className="subject__content">

        <div className="subject__column">

          <div className="subject__titles">
            {/*<h1 className="subject__title">Математика</h1>*/}
            <h1 className="subject__title">{response.product.title}</h1>
            <h2 className="subject__subTitle">{response.product.category.title}</h2>
          </div>

          <div className="subject__info subjectInfo">

            <div className="subjectInfo__rating">
              <Stars className="subjectInfo__stars" rating={response.product.comments_count}/>

              <span className="subjectInfo__students">(123 Student)</span>
            </div>

            <div className="subjectInfo__person">

              <span className="subjectInfo__name">Ұстаз: {user.name}</span>

              <span className="subjectInfo__language">Қазақша</span>

            </div>

            <div className="subjectInfo__buttons">

              <button className="btn__shadowFromNull subjectInfo__btn subjectInfo__wishlist">Wishlist</button>
              <button className="btn__shadowFromNull subjectInfo__btn subjectInfo__part">Бөлісу</button>
              <button className="btn__shadowFromNull subjectInfo__btn subjectInfo__present">Сыйға тарту</button>

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

          <div
            className="subject__textContent"
            dangerouslySetInnerHTML={{__html: response.product.content}}
          />

          <div className="subject__text">

            <h3 className="subject__textTitle">Материалы курса</h3>

            <div className="subject__mainText">
              • 104 лекций • Общая продолжительность {Math.floor(response.Duration / 60)} ч {response.Duration % 60} мин
            </div>

          </div>

          <div onClick={toggleItemHandler} ref={ItemsWrapper} className="subject__bottom">

            <div data-id="1" className="subject__item subjectItem active">
              <div className="subjectItem__top subjectItemTop">
                <div data-id={1} className="subjectItemTop__overlay"/>

                  <div className="subjectItemTop__left">
                    <span className="subjectItemTop__toggle"/>

                    <span className="subjectItemTop__title">{response.product.title}</span>
                  </div>

                  <div className="subjectItemTop__right">
                    <span className="subjectItemTop__lecture">{response.parts.length} лекция</span>

                    <span className="subjectItemTop__duration">{response.Duration} мин</span>
                  </div>

              </div>

              <div className="subjectItem__bottom subjectItemButton">

                {response.parts.map((item, index) => (
                  <div key={index} className="subjectItemButton__item">
                    {/*<div*/}
                    {/*  className="subject__textContent"*/}
                    {/*  dangerouslySetInnerHTML={{__html: item.description}}*/}
                    {/*/>*/}
                    <div className="subjectItemButton__left">
                      <div className="subjectItemButton__icon">
                        <img src={playButton} alt="play"/>
                      </div>
                      <a href="/" className="subjectItemButton__title">{item.title}</a>
                    </div>
                    <div className="subjectItemButton__right">
                      <a href="/" className="subjectItemButton__preview">Предпросмотр</a>
                      <div className="subjectItemButton__duration">{item.duration} мин</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="subject__column">
          <div className="subjectVideo">

            <VideoPlayer
              url={linkToVideo}
            />

            <div className="subjectVideo__price">{response.meta.price}т</div>
            <div className="subjectVideo__price buySubjectItems__oldPrice">{response.meta.post_price}т</div>

            <div className="subjectVideo__text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ullamcorper ornare potenti sed netus laoreet
              tortor. Id dolor ullamcorper in eget imperdiet.
            </div>

            <button className="btn__shadowFromNull subjectVideo__btn">Buy Now</button>


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

              <button className="btn__shadowFromNull subjectThings__btn">Buy</button>

            </div>


          </div>
        </div>

      </div>

      <div className="subject__teacher subjectTeacher">

        <div className="subjectTeacher__top">

          <div className="subjectTeacher__img">
            {
              avatar
                ? <img src={'http://api.ustaz.xyz/' + avatar} alt="this teacher"/>
                : <NoPhoto/>
            }
          </div>

          <div className="subjectTeacher__description">
            <div className="subjectTeacher__name">{user.name}</div>
            <div className="subjectTeacher__subject">{user.email}</div>
          </div>

        </div>

        <div className="subjectTeacher__bottom">
          <p className="subjectTeacher__text">{biography}</p>
        </div>

      </div>

      <Comments comments={comments} profilePhoto={studentsIcon}/>

    </>
  )
}

export default SubjectWrapper
