import React, {useEffect, useState} from 'react'
import Transition from 'react-transition-group/cjs/Transition'
import VideoPlayer from '../../../general/videoPlayer/videoPlayer'
import ModalPortal from '../../../modals/ModalPortal/ModalPortal'
import {scrollBodyHandler} from '../../../../scripts/scrollController/scrollController'
import './playlist.scoped.scss'

const videoPlaylist = [
  { video: 'https://www.youtube.com/watch?v=JRb3is9uzKI&list=PLa4jWVzklkO7JHPZFq_MWZzZ8WC3v0ACj&index=1' },
  { video: 'https://www.youtube.com/watch?v=91m_WBsnAUM&list=PLa4jWVzklkO7JHPZFq_MWZzZ8WC3v0ACj&index=2' },
  { video: 'https://www.youtube.com/watch?v=btPJDODKvyY&list=PLa4jWVzklkO7JHPZFq_MWZzZ8WC3v0ACj&index=3' },
  { video: 'https://www.youtube.com/watch?v=xNFusJN7ho0&list=PLa4jWVzklkO7JHPZFq_MWZzZ8WC3v0ACj&index=4' },
  { video: 'https://www.youtube.com/watch?v=iOUR4t-gqtQ&list=PLa4jWVzklkO7JHPZFq_MWZzZ8WC3v0ACj&index=5' },
  { video: 'https://www.youtube.com/watch?v=-MFGszPVyy0&list=PLa4jWVzklkO7JHPZFq_MWZzZ8WC3v0ACj&index=6' },
  { video: 'https://www.youtube.com/watch?v=EafwmW2dpcc&list=PLa4jWVzklkO7JHPZFq_MWZzZ8WC3v0ACj&index=7' },
  { video: 'https://www.youtube.com/watch?v=N7mxq9AoH6c&list=PLa4jWVzklkO7JHPZFq_MWZzZ8WC3v0ACj&index=8' },
  { video: 'https://www.youtube.com/watch?v=0wSzBzt87O8&list=PLa4jWVzklkO7JHPZFq_MWZzZ8WC3v0ACj&index=9' },
  { video: 'https://www.youtube.com/watch?v=UN4eLtYta-0&list=PLa4jWVzklkO7JHPZFq_MWZzZ8WC3v0ACj&index=10' },
  { video: 'https://www.youtube.com/watch?v=wB67AZMdBZU&list=PLa4jWVzklkO7JHPZFq_MWZzZ8WC3v0ACj&index=11' },
  { video: 'https://www.youtube.com/watch?v=EaRUB4iRFko&list=PLa4jWVzklkO7JHPZFq_MWZzZ8WC3v0ACj&index=12' },
]

const duration = 250;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  position: 'fixed',
  top: '-100%',
  opacity: 0
}

const transitionStyles = {
  entering: { position: 'fixed', top: '-100%', opacity: 1},
  entered:  { position: 'fixed', top: '50%', opacity: 1 },
  exiting:  { position: 'fixed', top: '-100%', opacity: 1 },
  exited:  { position: 'fixed', top: '-100%', opacity: 0 },
}


const Playlist = () => {
  const [currentVideo, setCurrentVideo] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {

    if (showModal) {
      scrollBodyHandler.lock()
    } else {
      scrollBodyHandler.unLock()
    }

  },[showModal])

  const onVideoClick = (event, videoId) => {
    event.stopPropagation()
    setCurrentVideo(videoPlaylist[videoId].video)
    setShowModal(true)
  }

  return (
    <section className="playlist">

      <div className="playlist__container _container">
        <h2 className="playlist__title">Видеосабақ үзінділері</h2>

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
            videoPlaylist.map((item, index) => {

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
          }

        </div>
      </div>

    </section>
  )
}

export default Playlist