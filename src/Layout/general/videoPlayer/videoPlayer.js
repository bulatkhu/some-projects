import React from 'react'
import ReactPlayer from 'react-player'
import './videoPlayer.scss'


const VideoPlayer = props => {


  return (
    <ReactPlayer
      className={['videoPlayer', props.className].join(' ')}
      url={props.url || 'https://vimeo.com/259411563'}
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