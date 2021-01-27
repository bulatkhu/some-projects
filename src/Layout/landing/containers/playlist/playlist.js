import React, {useEffect, useState} from 'react'
// import Transition from 'react-transition-group/cjs/Transition'
import {Translate} from 'react-translated'
import ModalPortal from '../../../modals/ModalPortal/ModalPortal'
import {scrollBodyHandler} from '../../../../scripts/scrollController/scrollController'
import VideoPlayerModal from '../../components/VideoPlayerModal/VideoPlayerModal'
import {youtubeURLParser} from '../../../../scripts/youtube/getVideoIdFromURL'
import './playlist.scoped.scss'



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
          if (metaVideo && metaVideo.value) {
            const videoId = youtubeURLParser(metaVideo.value)
            return {
              video: metaVideo.value,
              thumbnail: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`
            }
          }
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
          <VideoPlayerModal
            showModal={showModal}
            hideModal={() => setShowModal(false)}
            videoUrl={currentVideo}
          />
        </ModalPortal>


        <div className="playlist__content">

          {
            videoPlayList && videoPlayList.length ? (
              videoPlayList.map((item, index) => {

                return (
                  <div key={index} className="playlist__column">
                    <div onClick={event => onVideoClick(event, index)} className="playlist__overplay">
                      <div className="playlist__video">
                        <svg className="playlist__playBtn" width="30" height="35" viewBox="0 0 30 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M29.5007 16.634C30.1674 17.0189 30.1674 17.9811 29.5007 18.366L1.75073 34.3875C1.08406 34.7724 0.250731 34.2913 0.250731 33.5215L0.250732 1.47853C0.250732 0.708726 1.08407 0.227603 1.75073 0.612503L29.5007 16.634Z" fill="#FF5773"/>
                        </svg>
                        <img className="playlist__thumbnail" src={item.thumbnail} alt="video thumbnail"/>
                        {/*<VideoPlayer url={item.video}/>*/}
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
