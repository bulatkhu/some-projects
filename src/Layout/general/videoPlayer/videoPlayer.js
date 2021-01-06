import React from 'react'
import ReactPlayer from 'react-player'
import '../../landing/components/VideoPlayerModal/VideoPlayerModal.scoped.scss'
import './videoPlayer.scss'

const VideoPlayer = ({className, url}) => {


  return (
    <ReactPlayer
      className={['videoPlayer', className].join(' ')}
      url={url || 'https://vimeo.com/259411563'}
      controls={true}
      width={'100%'}
      height={'100%'}
      playsinline={true}
      config={{
        vimeo: {
          playsinline: true
        }
      }}
    />
  )
}

export default VideoPlayer
