import React from 'react'
import {SITE_BASE_URL} from '../../../app.config'
import playButton from '../../../images/general/subject/play-button.svg'
import lockICon from '../../../images/general/subject/locked-icon.svg'



const SubjectPart = ({name, id, courses, details}) => {
  let duration = 0
  courses.forEach(item => duration = duration + +item.duration)

  return (
    <div data-id={id} className="subject__item subjectItem active">
      <div className="subjectItem__top subjectItemTop">
        <div data-id={id} className="subjectItemTop__overlay"/>

        <div className="subjectItemTop__left">
          <span className="subjectItemTop__toggle"/>

          <span className="subjectItemTop__title">{name}</span>
        </div>

        <div className="subjectItemTop__right">
          <span className="subjectItemTop__lecture">{courses.length} лекция</span>

          <span className="subjectItemTop__duration">{duration} мин</span>
        </div>

      </div>

      <div className="subjectItem__bottom subjectItemButton">

        {courses.map((item, index) => (
          <div key={index} className="subjectItemButton__item">
            <div className="subjectItemButton__left">
              {
                details ? (
                  <a rel="noopener noreferrer" target="_blank"
                     href={
                       item.upload_video.includes('http')
                         ? item.upload_video
                         : SITE_BASE_URL + item.upload_video
                     }
                  >
                    <div className="subjectItemButton__icon">
                      <img src={playButton} alt="play"/>
                    </div>
                  </a>
                ) : (
                  <div className="subjectItemButton__icon">
                    <img src={lockICon} alt="locked"/>
                  </div>
                )
              }
              {/*<a rel="noopener noreferrer" target="_blank"*/}
              {/*   href={*/}
              {/*     item.upload_video.includes('http')*/}
              {/*       ? item.upload_video*/}
              {/*       : SITE_BASE_URL + item.upload_video*/}
              {/*   }*/}
              {/*>*/}
              {/*  <div className="subjectItemButton__icon">*/}
              {/*    {*/}
              {/*      details*/}
              {/*        ? <img src={playButton} alt="play"/>*/}
              {/*        : <img src={lockICon} alt="locked"/>*/}
              {/*    }*/}
              {/*  </div>*/}
              {/*</a>*/}
              <p className="subjectItemButton__title">{item.title}</p>
            </div>
            <div className="subjectItemButton__right">
              {/*<a rel="noopener noreferrer" target="_blank" href={item.upload_video} className="subjectItemButton__preview">{item.title}</a>*/}
              <div className="subjectItemButton__duration">{item.duration} мин</div>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default SubjectPart
