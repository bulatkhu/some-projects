import React from 'react'
import ReactPlayer from 'react-player'
import '../../landing/components/VideoPlayerModal/VideoPlayerModal.scoped.scss'
import './videoPlayer.scss'
import { Player, Video, DefaultUi, Youtube } from '@vime/react';
const VideoPlayer = ({ className, url }) => {
console.log(url)

  return (
    // <ReactPlayer
    //   className={['videoPlayer', className].join(' ')}
    //   url={url || 'https://vimeo.com/259411563'}
    //   controls={true}
    //   width={'100%'}
    //   height={'100%'}
    //   playsinline={true}
    //   config={{
    //     vimeo: {
    //       playsinline: true
    //     }
    //   }}
    // />
  <Player
    theme="dark"
    style={{ '--vm-player-theme': '#e86c8b' }}
  >
    <Youtube videoId={`${url ? url.split('https://youtu.be/')[1] : "DyTCOwB0DVw"}`} />
    <DefaultUi />
  </Player>
  )
}

export default VideoPlayer
