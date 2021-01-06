import React from 'react'
import VideoPlayer from '../../../general/videoPlayer/videoPlayer'
import Transition from 'react-transition-group/cjs/Transition'
import './VideoPlayerModal.scoped.scss'

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

const VideoPlayerModal = ({showModal, hideModal, videoUrl}) => {

  return (
    <Transition
      unmountOnExit={true}
      in={showModal}
      timeout={duration}
    >
      {state => (
        <div
          style={{...defaultStyle, ...transitionStyles[state]}}
          className="videoPlayerModal"
        >
          <div className="videoPlayerModal__closeWrapper">
                    <span
                      onClick={hideModal}
                      className="videoPlayerModal__close"
                    />
          </div>
          <div className="videoPlayerModal__videoWrapper">
            <VideoPlayer className="videoPlayerModal__video" url={videoUrl}/>
          </div>
        </div>
      )}
    </Transition>
  )
}

export default VideoPlayerModal
