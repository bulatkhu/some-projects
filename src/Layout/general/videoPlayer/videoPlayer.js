import React from 'react'
import ReactPlayer from 'react-player'
import '../../landing/components/VideoPlayerModal/VideoPlayerModal.scoped.scss'
import './videoPlayer.scss'
import { Player, Ui, DefaultUi, Video } from '@vime/react';
const VideoPlayer = ({ className, url }) => {


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
//<Player>
  //    {/* Provider component is placed here. */}
   //   <Video>
   //       <source data-src="https://vimeo.com/192834629" type="video/mp4" />
   //     </Video>
   //   <DefaultUi>
  //    </DefaultUi>
  //  </Player>
  )
}

export default VideoPlayer
