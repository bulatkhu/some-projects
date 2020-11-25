import React, {useEffect, useState} from 'react'
import './teacherPage.scss'
// import teacherIcon from '../../../images/general/teacher/teacher-icon.jpg'
import telegramIcon from '../../../images/general/teacher/telegram-svg.svg'
import instagramIcon from '../../../images/general/teacher/instagram-svg.svg'
import whatsappIcon from '../../../images/general/teacher/whatsapp-svg.svg'

import videoIcon from '../../../images/general/teacher/video-img.jpg'
// import tabItem1 from '../../../images/general/courses/tab-thing1.jpg'
// import tabItem2 from '../../../images/general/courses/tab-thing2.jpg'
// import tabItem3 from '../../../images/general/courses/tab-thing3.jpg'
// import tabItem4 from '../../../images/general/courses/tab-thing4.jpg'
// import tabItem5 from '../../../images/general/courses/tab-thing5.jpg'
// import tabItem6 from '../../../images/general/courses/tab-thing6.jpg'
// import tabItem7 from '../../../images/general/courses/tab-thing7.jpg'
// import tabItem8 from '../../../images/general/courses/tab-thing8.jpg'
// import tabItem9 from '../../../images/general/courses/tab-thing9.jpg'
// import tabItem10 from '../../../images/general/courses/tab-thing10.jpg'
// import ThingCard from '../../landing/components/ThingCard/ThingCard'
//
import studentsIcon from '../../../images/general/teacher/students-icon.jpg'
import Stars from '../stars/stars'
import {apiGetTeacherById, apiGetTeacherComments} from '../../../request/apiTeacher'
import Loader from '../component/loader/loader'
import {SITE_BASE_URL} from '../../../app.config'
import {getFromUserMeta} from '../../../scripts/dataHandler/dataHandler'
import NoPhoto from '../../../images/general/noPhoto/noPhoto'
import AddComment from '../../login/components/addComment/addComment'


const commentsInfo = [
  {},
  {},
  {},
]

function OneComment() {

  return (
    <div className="bottomTeachPage__column">
      <div className="bottomTeachPage__comment">
        <div className="bottomTeachPage__img">
          {
            studentsIcon
              ? <img src={studentsIcon} alt="student"/>
              : <NoPhoto/>
          }
        </div>

        <div className="bottomTeachPage__about">
          <h4 className="bottomTeachPage__name">Student</h4>
          <Stars
            className="bottomTeachPage__stars"
            rating={5}
            classNameOfValue="bottomTeachPage__starsValue"
          />

          <p className="bottomTeachPage__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit pulvinar quam at ut sed. Sociis ullamcorper
            fusce libero ultricies. Ante quis vulputate nunc dolor dolor. Quis blandit eu vel sapien pulvinar volutpat
            dolor. Ligula arcu facilisi quis cursus nibh urna mi.
            Cursus auctor fusce diam nullam tempor mauris.
          </p>
        </div>
      </div>
    </div>
  )
}


const TeacherPage = ({match: {params: {id}}}) => {
  const [loading, setLoading] = useState(true)
  const [teacher, setTeacher] = useState(null)
  const [commmentErr, setCommmentErr] = useState(null)


  useEffect(() => {

    if (id) {
      apiGetTeacherById(id)
        .then(res => {
          if (res.error) {
            setLoading(false)
            return console.log('error:', res)
          }
          const {teacher} = res.data
          setLoading(false)
          setTeacher(teacher)
          // console.log('success:', teacher)
        })

      apiGetTeacherComments(id)
        .then(res => {
          if (res.error) {
            setCommmentErr(res.response.data.message)
            return console.log('error:', res.response.data.message)
          }

          console.log('success:', res)
        })


    }

  }, [id])

  useEffect(() => {

    if (teacher) {
      console.log(teacher)
    }

  }, [teacher])


  return (
    <section className="teacherPage">
      <div className="teacherPage__container _container">

        {
          loading
            ? <Loader container/>
            : <>
              {teacher && (
                <div className="teacherPage__top topTeachPage">

                  <div className="topTeachPage__content">

                    <div className="topTeachPage__column">

                      <div className="topTeachPage__profile">

                        <div className="topTeachPage__img">
                          {
                            getFromUserMeta(teacher, 'avatar')
                              ? <img src={`${SITE_BASE_URL}${getFromUserMeta(teacher, 'avatar')}`} alt="teacher"/>
                              : <NoPhoto/>
                          }

                        </div>

                        <div className="topTeachPage__name">{teacher.username}</div>

                        <div className="topTeachPage__subject">Math Teacher</div>

                        <div className="topTeachPage__socLinks">
                          <a href="/" className="topTeachPage__socLink">
                            <img src={whatsappIcon} alt="whatsapp"/>
                          </a>

                          <a href="/" className="topTeachPage__socLink">
                            <img src={telegramIcon} alt="telegram"/>
                          </a>

                          <a href="/" className="topTeachPage__socLink">
                            <img src={instagramIcon} alt="instagram"/>
                          </a>
                        </div>

                      </div>

                      <div className="topTeachPage__wrapperVideo">
                        <a href="/" className="topTeachPage__video">
                          <img src={videoIcon} alt="video"/>
                        </a>
                      </div>
                    </div>

                    <div className="topTeachPage__column">

                      <div className="topTeachPage__description teacherDescr">

                        <div className="teacherDescr__top">
                          <h1 className="teacherDescr__name">{teacher.username}</h1>

                          {/*<h2 className="teacherDescr__qualification">A certified instructor From Bootcamp</h2>*/}
                          <h2 className="teacherDescr__qualification">E-mail: {teacher.email}</h2>

                          <div className="teacherDescr__wrapper">
                            <div className="teacherDescr__students">23,564 Total Students</div>
                            <Stars rating={teacher.rate_count} className="teacherDescr__stars"/>
                          </div>

                          <div className="teacherDescr__reviews">256 Reviews</div>
                        </div>


                        <div className="teacherDescr__about">
                          <h3 className="teacherDescr__aboutTitle">About Me</h3>

                          <p className="teacherDescr__aboutText">
                            {getFromUserMeta(teacher, 'biography') || 'No info about this person'}
                          </p>
                        </div>

                        <div className="teacherDescr__about">
                          <h3 className="teacherDescr__aboutTitle">Short biography</h3>

                          <p className="teacherDescr__aboutText">
                            {getFromUserMeta(teacher, 'short_biography') || 'No info about this person'}
                          </p>
                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              )}

              <div className="teacherPage__middle middleTeachPage">

                <h3 className="middleTeachPage__title">Ұстаз туралы пікірлер</h3>

                <div className="bottomTeachPage__content">

                  {
                    commmentErr
                      ? <div className="error__big text-center">Cannot get comments: {commmentErr}</div>
                      : commentsInfo.map((item, index) => {
                        return (
                          <OneComment key={index}/>
                        )
                      })
                  }

                </div>

                <AddComment/>

              </div>

              {/*<Comments info={commentsInfo}/>*/}
            </>
        }

      </div>
    </section>
  )
}

export default TeacherPage
