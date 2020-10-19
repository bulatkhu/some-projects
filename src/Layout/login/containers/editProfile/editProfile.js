import React from 'react'
import './editProfile.scss'


const EditProfile = ({type}) => {

  let form

  if (type === 'student') {
    form = <>
            <div className="editProfile__buttons">
              <button className="editProfile__btn editProfile__deletePhoto">Суретті өшіру</button>
              <button className="editProfile__btn editProfile__addPhoto">Сурет жүктеу</button>
            </div>

            <form className="editProfile__form editProfileForm">

              <div className="editProfileForm__content">

                <div className="editProfileForm__column">
                  <input type="text" placeholder="Аты" className="editProfileForm__input"/>
                  <input type="text" placeholder="ЖСН" className="editProfileForm__input"/>
                  <input type="text" placeholder="E-mail" className="editProfileForm__input"/>
                  <input type="text" placeholder="Мектеп" className="editProfileForm__input"/>
                  <input type="text" placeholder="Қала" className="editProfileForm__input"/>
                  <input type="text" placeholder="Ата-ана тел. нөмірі" className="editProfileForm__input"/>
                </div>
                <div className="editProfileForm__column">
                  <input type="text" placeholder="Тегі" className="editProfileForm__input"/>
                  <input type="text" placeholder="ТЖК" className="editProfileForm__input"/>
                  <input type="text" placeholder="Тел. нөмірі" className="editProfileForm__input"/>
                  <input type="text" placeholder="Облысы" className="editProfileForm__input"/>
                  <input type="text" placeholder="Бейіндік пән" className="editProfileForm__input"/>
                  <input type="text" placeholder="Ата-ана тел. нөмірі" className="editProfileForm__input"/>
                </div>

              </div>

              <textarea  placeholder="Өзім туралы ..." className="editProfileForm__textHolder">

              </textarea>

              <div className="editProfileForm__wrapper">
                <button className="editProfileForm__button">Сақтау</button>
              </div>

            </form>
          </>
  } else if (type === 'teacher' || type === 'tutor'){
    form = <>


      <form className="editProfile__form editProfileForm">

        <div className="editProfileForm__content">

          <div className="editProfileForm__column">
            <input type="text" placeholder="Аты" className="editProfileForm__input"/>
            <input type="text" placeholder="ЖОО" className="editProfileForm__input"/>
            <input type="text" placeholder="E-mail" className="editProfileForm__input"/>
            <input type="text" placeholder="Пәні" className="editProfileForm__input"/>
          </div>
          <div className="editProfileForm__column">
            <input type="text" placeholder="Тегі" className="editProfileForm__input"/>
            <input type="text" placeholder="Мамандық" className="editProfileForm__input"/>
            <input type="text" placeholder="Тел. нөмірі" className="editProfileForm__input"/>
            <div className="editProfile__buttons" style={{textAlign: 'right'}}>
              <button className="editProfile__teacherBtn editProfile__btn editProfile__deletePhoto">Суретті өшіру</button>
              <button className="editProfile__teacherBtn editProfile__btn editProfile__addPhoto">Сурет жүктеу</button>
            </div>
          </div>

        </div>

        <textarea  placeholder="Өзім туралы ..." className="editProfileForm__textHolder"/>


        <div className="editProfileForm__wrapper">
          <button className="editProfileForm__button">Сақтау</button>
        </div>

      </form>
    </>
  }

  return (
    <section className="editProfile">
      {form}
    </section>
  )
}

export default EditProfile