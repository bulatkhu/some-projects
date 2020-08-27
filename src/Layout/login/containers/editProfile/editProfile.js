import React from 'react'
import './editProfile.scss'


const EditProfile = () => {


  return (
    <section className="editProfile">
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
    </section>
  )
}

export default EditProfile