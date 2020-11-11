import React, {useEffect, useState} from 'react'
import './teacherPage.scss'
import teacherIcon from '../../../images/general/teacher/teacher-icon.jpg'
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
// import studentsIcon from '../../../images/general/teacher/students-icon.jpg'
import Stars from '../stars/stars'
import {apiGetTeacherById} from "../../../request/apiTeacher";
import Loader from "../component/loader/loader";
// import Comments from '../../login/components/comments/comments'


// const boxThing = [
//   {tab: 1, img: tabItem1, rating: '3,0', curPrice: '9999 ₸'},
//   {tab: 1, img: tabItem2, rating: '5,0', curPrice: '9999 ₸'},
//   {tab: 1, img: tabItem3, rating: '1,0', curPrice: '9999 ₸'},
//   {tab: 1, img: tabItem4, rating: '2,0', curPrice: '9999 ₸'},
//   {tab: 1, img: tabItem5, rating: '5,0', curPrice: '9999 ₸'},
//   {tab: 1, img: tabItem6, rating: '3,0', curPrice: '9999 ₸'},
//   {tab: 1, img: tabItem7, rating: '5,0', curPrice: '9999 ₸'},
//   {tab: 1, img: tabItem8, rating: '4,0', curPrice: '9999 ₸'},
//   {tab: 1, img: tabItem9, rating: '2,0', curPrice: '9999 ₸'},
//   {tab: 1, img: tabItem10, rating: '4,0', curPrice: '9999 ₸'},
// ]
//
// const commentsInfo = {
//   comments: [
//     { name: 'Бекзат Ералиев 1', icon: studentsIcon, stars: '3', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit pulvinar quam at ut sed. Sociis ullamcorper fusce libero ultricies. Ante quis vulputate nunc dolor dolor. Quis blandit eu vel sapien pulvinar volutpat dolor. Ligula arcu facilisi quis cursus nibh urna mi. Cursus auctor fusce diam nullam tempor mauris.'},
//     { name: 'Бекзат Ералиев 2', icon: studentsIcon, stars: '2', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit pulvinar quam at ut sed. Sociis ullamcorper fusce libero ultricies. Ante quis vulputate nunc dolor dolor. Quis blandit eu vel sapien pulvinar volutpat dolor. Ligula arcu facilisi quis cursus nibh urna mi. Cursus auctor fusce diam nullam tempor mauris.'},
//     { name: 'Бекзат Ералиев 3', icon: studentsIcon, stars: '1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit pulvinar quam at ut sed. Sociis ullamcorper fusce libero ultricies. Ante quis vulputate nunc dolor dolor. Quis blandit eu vel sapien pulvinar volutpat dolor. Ligula arcu facilisi quis cursus nibh urna mi. Cursus auctor fusce diam nullam tempor mauris.'},
//   ],
//   ownProfile: { icon: studentsIcon }
// }

const TeacherPage = ({match: {params: {id}}}) => {
  const [loading, setLoading] = useState(true)
  const [teacher, setTeacher] = useState(null)


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
          console.log('success:', teacher)
        })


    }

  },[id])


  return (
    <section className="teacherPage">

      {
        loading
          ? <Loader container/>
          : <>
            { teacher && (
              <div className="teacherPage__top topTeachPage">

                <div className="topTeachPage__content">

                  <div className="topTeachPage__column">

                    <div className="topTeachPage__profile">

                      <div className="topTeachPage__img">
                        <img src={teacherIcon} alt="teacher"/>
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

                        <p className="teacherDescr__aboutText">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                          diam nonummy nibh euismod tincidunt ut
                          laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Nam liber tempor cum soluta
                          nobis
                          eleifend option congue nihil imperdiet doming id quod mazim placerat Malesuada risus pretium
                          sagittis
                          sit vel diam eu. Morbi consectetur sed ut etiam. Pretium arcu orci, faucibus quam. Porttitor risus,
                          ultrices habitant etiam. Orci lectus pellentesque in pharetra id cras mauris, adipiscing. Porttitor
                          lacinia quisque cum vulputate donec nullam blandit posuere malesuada. Blandit massa mattis feugiat
                          fringilla viverra. Eget faucibus tellus dolor malesuada habitasse gravida donec dolor. Eros,
                          faucibus
                          turpis metus tellus eget id cursus fermentum placerat. Adipiscing morbi sit tempus id. Semper sed
                          tellus
                          tristique id cursus massa quam.
                          Pharetra, placerat pellentesque in consequat sagittis aenean neque orci. Vestibulum amet enim ut
                          pellentesque auctor gravida. Ac dictum posuere egestas ligula. Elit faucibus sit tellus viverra.
                          Condimentum vestibulum massa aliquam nec in volutpat, tempor enim, quisque. Nisi egestas in feugiat
                          interdum.</p>
                      </div>

                      <div className="teacherDescr__about">
                        <h3 className="teacherDescr__aboutTitle">25 That Prevent Job Seekers From Overcoming Failure</h3>

                        <p className="teacherDescr__aboutText">Phasellus enim magna, varius et commodo ut, ultricies vitae
                          velit. Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel justo. In libero urna,
                          venenatis sit amet ornare non, suscipit nec risus. Sed consequat justo non mauris pretium at tempor
                          justo sodales. Quisque tincidunt laoreet malesuada. Cum sociis natoque penatibus et magnis dis
                          parturient montes, nascetur.</p>
                      </div>

                    </div>

                  </div>

                </div>

              </div>
            )}

              <div className="teacherPage__middle middleTeachPage">

                <h3 className="middleTeachPage__title">All Courses by Stephane</h3>

                <div className="middleTeachPage__content">

                  {/*{boxThing.map((item, index) => {*/}

                  {/*  return (*/}
                  {/*    <ThingCard key={index} item={item}/>*/}
                  {/*  )*/}
                  {/*})}*/}

                </div>

              </div>

              {/*<Comments info={commentsInfo}/>*/}
            </>
      }

    </section>
  )
}

export default TeacherPage
