import React, {useState} from 'react'
import ReactPlayer from 'react-player'
import '../../landing/components/VideoPlayerModal/VideoPlayerModal.scoped.scss'
import './videoPlayer.scss'
import {apiSetBonusForVideo} from '../../../request/student/apiStudent'
import { Player, Video, DefaultUi, Youtube, Control, Controls } from '@vime/react';
const VideoPlayer = ({ className, url, id, contentId }) => {
  console.log(url)
  const [count, setCount] = useState(0)


  const bonus = () => {
    console.log('blablaBLAVLA')
      setCount(1);
      apiSetBonusForVideo(id,contentId)
    .then((res)=>{
      console.log(res,"BONUS")
    })
    .catch(err=>{
      console.log(err,"BONUS")
    })
    
  }


  return (
    <ReactPlayer
    key={id}
      className={['videoPlayer', className].join(' ')}
      url={url || 'https://vimeo.com/259411563'}
      controls={true}
      width={'100%'}
      height={'100%'}
      onClick={bonus}
      onPlay={bonus}
      playsinline={true}
      config={{
        vimeo: {
          playsinline: true
        }
      }}
    />
    // <Player
    //   theme="dark"
    //   style={{ '--vm-player-theme': '#407BBF' }}
    //   onClick={bonus}
    //   key={url}
    // >
    //   <Youtube videoId={`${url ? url.split('https://youtu.be/')[1] : "DyTCOwB0DVw"}`} />
    //   <DefaultUi>
    //     </DefaultUi>
    // </Player>
  )
}

export default VideoPlayer
