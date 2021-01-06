import React, {useEffect, useState} from 'react'
// import Transition from 'react-transition-group/cjs/Transition'
import {Translate} from 'react-translated'
import VideoPlayer from '../../../general/videoPlayer/videoPlayer'
import ModalPortal from '../../../modals/ModalPortal/ModalPortal'
import {scrollBodyHandler} from '../../../../scripts/scrollController/scrollController'
import VideoPlayerModal from '../../components/VideoPlayerModal/VideoPlayerModal'
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
