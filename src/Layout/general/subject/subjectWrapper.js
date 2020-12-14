import React, {useEffect, useRef, useState} from 'react'
import Comments from '../../login/components/comments/comments'
import VideoPlayer from '../videoPlayer/videoPlayer'
import {SITE_BASE_URL} from '../../../app.config'
import {Transition} from 'react-transition-group'
import SubjectPart from "./subjectPart";
import Prices from "../../landing/containers/prices/prices";
import AddComment from '../../login/components/addComment/addComment'

const duration = 300;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  transform: 'translateX(100%)',
  opacity: 0,
  display: 'none'
}

const transitionStyles = {
  entering: {  transform: 'translateX(0)', opacity: 1, display: 'none'},
  entered: {  transform: 'translateX(0)', opacity: 1, display: 'block'},
  exiting: {  transform: 'translateX(-40%)', opacity: 0.1, display: 'block'},
  exited: {  transform: 'translateX(-100%)', opacity: 0, display: 'none'},
}

function transformPartsToShowParts(resParts) {
  return Object.keys(resParts).map(item => ({
    name: item,
    courses: resParts[item]
  }))
}

function getVideoFromRes(response) {
  if (!response.meta) return null
  let linkToVideo = response.meta.video
  if (!linkToVideo) {
    return linkToVideo
  }
  if (!linkToVideo.toString().includes('http')) {
    linkToVideo = SITE_BASE_URL + linkToVideo
  }

  return linkToVideo
}

const transitionWrapper = ({show, content}) => (
  <Transition in={show} timeout={duration}>
    {state => (
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
        {content}
      </div>
    )}
  </Transition>
);


const SubjectWrapper = ({response, isLoaded, details}) => {
  const ItemsWrapper = useRef(null)
  const [elements, setElements] = useState([])
  const [contentToShow, setContentToShow] = useState(1)
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

  const linkToVideo = getVideoFromRes(response)

  const parts = transformPartsToShowParts(response.parts)

  const {user} = response.product || null
  const comments = response.product.comments


  return (
    <div className="subject__content">

      <div className="subject__column">

        <div className="subject__titles">
          <h1 className="subject__title">{response.product.title}</h1>
          <h2 className="subject__subTitle">{response.product.category.title}</h2>
        </div>

        <div className="subject__info subjectInfo">

          <div className="subjectInfo__person">

            <span className="subjectInfo__name">Ұстаз: {user.name}</span>

            <span className="subjectInfo__language">{response.product.category.class}</span>

          </div>

        </div>

      </div>

      {
        linkToVideo
          ? <div className="subjectVideo">
              <VideoPlayer
                className="subjectVideo__video"
                url={linkToVideo}
              />
            </div>
          : null
      }

      <div className="subject__column">

        <div className="subject-tab">

          <div className="subject-tab__header">
            <button
              onClick={() => setContentToShow(1)}
              className={['subject-tab__headerItem', 'btn__noFocus', contentToShow === 1 ? 'active' : null].join(' ')}
            >Тақырыптар
            </button>
            <button
              onClick={() => setContentToShow(2)}
              className={['subject-tab__headerItem', 'btn__noFocus', contentToShow === 2 ? 'active' : null].join(' ')}
            >Курс туралы
            </button>
            <button
              onClick={() => setContentToShow(3)}
              className={['subject-tab__headerItem', 'btn__noFocus', contentToShow === 3 ? 'active' : null].join(' ')}
            >Пікірлер
            </button>
          </div>
          <div className="subject-tab__body">

            {
              transitionWrapper({
                show: contentToShow === 1,
                content: (
                  <div onClick={toggleItemHandler} ref={ItemsWrapper} className="subject__bottom">
                    {
                      parts.length
                        ? parts.map((part, id) => (
                          <SubjectPart details={details} key={id} id={id} courses={part.courses} name={part.name}/>
                        ))
                        : <p className="error">Course does not have parts</p>
                    }
                  </div>
                )
              })
            }

            {
              transitionWrapper({
                show: contentToShow === 2,
                content: (
                  <div className="subject-tab__secondContent">
                    <div className="subject__column">

                      <div
                        className="subject__textContent"
                        dangerouslySetInnerHTML={{__html: response.product.content}}
                      />

                    </div>
                  </div>
                )
              })
            }

            {
              transitionWrapper({
                show: contentToShow === 3,
                content: (
                  <>
                    <AddComment id={response ? response.product.id : null} />
                    <Comments comments={comments}/>
                  </>
                )
              })
            }

          </div>

        </div>

      </div>


      <div className="subject__column">
        <Prices classPrices={false}/>
      </div>


    </div>
  )
}

export default SubjectWrapper
