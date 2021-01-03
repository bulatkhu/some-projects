import React from 'react'
import {NavLink} from 'react-router-dom'
import {
  CalendarIcon,
  ChatIcon,
  EditIcon, EduCoinIcon,
  HatIcon,
  InfoIcon, ListIcon,
  PaymentIcon, PromoIcon,
  TestIcon
} from '../../../images/general/menuIcons/infoIcon'
import LogoutButton from '../../auth/LogoutButton/LogoutButton'


const teacherList = [
  {to: ``, icon: InfoIcon, text: 'Курстарым'},
  {to: `/calendar`, icon: CalendarIcon, text: 'Жоспарларым'},
  {to: `/list`, icon: HatIcon, text: 'Төлемдер'},
  {to: `/chat`, icon: ChatIcon, text: 'Чат', chat: true},
  {to: `/edit`, icon: EditIcon, text: 'Edit Profile'},
]

const studentList = [
  {to: ``, icon: InfoIcon, text: 'Курстарым'},
  {to: `/tests`, icon: TestIcon, text: 'Тестерім'},
  {to: `/chat`, icon: '', text: 'Чат', chat: true},
  {to: `/calendar`, icon: CalendarIcon, text: 'Жоспарларым'},
  {to: `/payment`, icon: PaymentIcon, text: 'Төлемдер'},
  {to: `/eduCoin`, icon: EduCoinIcon, text: 'EduCoin'},
  {to: `/promo`, icon: PromoIcon, text: 'Promo Code'},
  {to: `/edit`, icon: EditIcon, text: 'Edit Profile'},
]

const tutorList = [
  {to: ``, icon: InfoIcon, text: 'Курстарым'},
  {to: `/calendar`, icon: CalendarIcon, text: 'Жоспарларым'},
  {to: `/list`, icon: ListIcon, text: 'Жалпы тізім'},
  {to: `/educoin`, icon: EduCoinIcon, text: 'EduCoin'},
  {to: `/chat`, icon: ChatIcon, text: 'Чат', chat: true},
  {to: `/edit`, icon: EditIcon, text: 'Edit Profile'},
]


const MenuLinks = ({base, type = 'student'}) => {

  let listToShow = () => {
    if (type === 'student') {
      return studentList
    } else if (type === 'teacher') {
      return teacherList
    } else if (type === 'mentor') {
      return tutorList
    }
  }

  return (
    <ul className="loginNav__column loginNav__list">
      {
        listToShow().map((item, index) => {
          if (item.chat) {
            return (
              <li key={index} className="loginNav__item">
                <NavLink className="loginNav__link loginNav__linkChat" to={base + item.to}>
                  <div className="loginNav__overlay"/>
                  <div className="loginNav__infoWrapper">
                    <div className="loginNav__linkIcon">
                      <ChatIcon/>
                    </div>
                    <span className="loginNav__spanText">{item.text}</span>
                  </div>
                </NavLink>
              </li>
            )
          }


          return (
            <li key={index} className="loginNav__item">
              <NavLink exact className="loginNav__link" to={base + item.to}>
                <div className="loginNav__overlay"/>
                <div className="loginNav__infoWrapper">
                  <div className="loginNav__linkIcon">
                    <item.icon/>
                  </div>
                  <span className="loginNav__spanText">{item.text}</span>
                </div>
              </NavLink>
            </li>
          )
        })
      }
      <li className="loginNav__item loginNav__exitButton">
        <LogoutButton>
          Шығу
        </LogoutButton>
      </li>
    </ul>
  )
}

export default MenuLinks
