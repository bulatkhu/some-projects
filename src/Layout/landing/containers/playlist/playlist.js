import React, {useEffect, useState} from 'react'
import Transition from 'react-transition-group/cjs/Transition'
import {Translate} from 'react-translated'
import VideoPlayer from '../../../general/videoPlayer/videoPlayer'
import ModalPortal from '../../../modals/ModalPortal/ModalPortal'
import {scrollBodyHandler} from '../../../../scripts/scrollController/scrollController'
import './playlist.scoped.scss'

const duration = 250;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  position: 'fixed',
  top: '-100%',
  opacity: 0
}

const transitionStyles = {
  entering: {position: 'fixed', top: '-100%', opacity: 1},
  entered: {position: 'fixed', top: '50%', opacity: 1},
  exiting: {position: 'fixed', top: '-100%', opacity: 1},
  exited: {position: 'fixed', top: '-100%', opacity: 0},
}


const Playlist = ({activeTab, courses}) => {
  const [currentVideo, setCurrentVideo] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [videoPlayList, setVideoPlayList] = useState([])

  useEffect(() => {

    if (showModal) {
      scrollBodyHandler.lock()
    } else {
      scrollBodyHandler.unLock()
    }

  }, [showModal])


  useEffect(() => {

    if (courses && activeTab) {
      const coursesVideos = courses[activeTab]
        .map(course => {
          const metaVideo = course.metas.find(meta => meta.option === 'video')
          if (metaVideo && metaVideo.value) return {video: metaVideo.value}
          return null
        })
        .filter(course => course)
      setVideoPlayList(coursesVideos)
    }

  }, [courses, activeTab])


  const onVideoClick = (event, videoId) => {
    event.stopPropagation()
    setCurrentVideo(videoPlayList[videoId].video)
    setShowModal(true)
  }

  return (
    <section  id="playlist" className="playlist">

      <div className="playlist__container _container">
        <h2 className="playlist__title">{<Translate text="Видеосабақ үзінділері"/>}</h2>

        <ModalPortal>
          <Transition
            unmountOnExit={true}
            in={showModal}
            timeout={duration}
          >
            {state => (
              <div
                style={{...defaultStyle, ...transitionStyles[state]}}
                className="playlistModal"
              >
                <div className="playlistModal__closeWrapper">
                    <span
                      onClick={() => setShowModal(false)}
                      className="playlistModal__close"
                    />
                </div>
                <div className="playlistModal__videoWrapper">
                  <VideoPlayer className="playlistModal__video" url={currentVideo}/>
                </div>
              </div>
            )}
          </Transition>
        </ModalPortal>


        <div className="playlist__content">

          {
            videoPlayList && videoPlayList.length ? (
              videoPlayList.map((item, index) => {

                return (
                  <div key={index} className="playlist__column">
                    <div onClick={event => onVideoClick(event, index)} className="playlist__overplay">
                      <div className="playlist__video">

                        <VideoPlayer url={item.video}/>

                      </div>
                    </div>
                  </div>
                )
              })
            ) : <div>No courses</div>


          }

        </div>
      </div>

    </section>
  )
}

export default Playlist
