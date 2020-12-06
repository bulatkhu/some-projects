import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {SITE_BASE_URL} from '../../../app.config'
import {apiGetTeachers} from '../../../request/apiTeacher'
import {capitalizeFirstLetter} from '../../../scripts/capitFirstLetter/capitFirstLetter'
import {getFromUserMeta} from '../../../scripts/dataHandler/dataHandler'
import Loader from '../component/loader/loader'
import NoPhoto from '../../../images/general/noPhoto/noPhoto'
import './teachersRoute.scss'


function TeacherLittleBox({id, img, user}) {
  return (
    <Link to={`/teacher-page/${id}`} className="teachersRoute__column teachersRouteCol">
      <div className="teachersRouteCol__img">
        {
          img
            ? <img src={SITE_BASE_URL + img} alt="teacher"/>
            : <NoPhoto/>
        }
      </div>
      <div className="teachersRouteCol__name">{capitalizeFirstLetter(user.name)}</div>
      <div className="teachersRouteCol__subject">{capitalizeFirstLetter(user.username)}</div>
    </Link>
  )
}


const TeachersRoute = () => {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [isError, setError] = useState(false)


  useEffect(() => {

    apiGetTeachers()
      .then(res => {
        if (res.error) {
          setLoading(false)
          setError(res.response.data.message)
          return console.log('error:', res.response.data.message)
        }

        const {teachers} = res.data
        console.log('success:', teachers)
        setLoading(false)
        setError(false)
        setTeachers(teachers)
      })

  }, [])


  return (
    <section className="teachersRoute">

      <div className="teachersRoute__container _container">
        <h1 className="teachersRoute__title">Ұстаздар</h1>

        {loading
          ? <Loader container/>
          : isError
            ? <div style={{minHeight: '20vh', color: 'red', fontSize: 20}}>Error: {isError}</div>
            : <div className="teachersRoute__content">
              {teachers.map(({id, user}, index) => {
                const img = getFromUserMeta(user, 'avatar')

                return (
                  <TeacherLittleBox
                    id={id}
                    img={img}
                    user={user}
                    key={id + index}
                  />
                )
              })}
            </div>
        }
      </div>

    </section>
  )
}

export default TeachersRoute
