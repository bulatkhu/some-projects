import axios from 'axios'
import {APP_BASE_URL} from '../app.config'

export const configAccess = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
}

export function getToken() {
  return localStorage.getItem('token')
}


export async function login(values) {
  return axios
    .post(APP_BASE_URL + '/user/login', { ...values }, { headers: { ...configAccess } })
    .then(res => ({...res, error: false}))
    .catch(err => ({ error: true, errInfo: err}))
}



export async function register(values) {
  return await axios.post(APP_BASE_URL + '/user/register', { ...values }, { headers: { ...configAccess } })
}

export async function keyGenerate(phone) {
  return await axios.post(APP_BASE_URL + '/user/keyGenerate', { phone }, { headers: { ...configAccess } })
}

export async function ApiCheckKeyForPassword({ phone, code }) {
  return await axios.get(APP_BASE_URL + '/user/checkKeyForPassword', { params: { phone, code } })
}

export async function ApiResetPassword({ phone, password }) {
  return await axios.get(APP_BASE_URL + '/user/resetPassword', { params: { phone, password } })
}

export async function checkKey(values) {
  return await axios.post(APP_BASE_URL + '/user/checkKey', { ...values }, { headers: { ...configAccess } })
}

export async function getQuizList() {
  const token = localStorage.getItem('token') || '' || false
  if (!token) return { error: 'Invalid auth token' }

  return await axios.get(APP_BASE_URL + `/quizlist?token=${token}`)
}

export async function getCoursesFromIndex() {
  try {
    return await axios.get(APP_BASE_URL + `/getContents`)
  } catch (e) {
    return e.error || e.response || e.data.response || e.data.error
  }
}

export async function getDetailCourse(id) {
  try {
    return await axios.get(APP_BASE_URL + `/userDetailCourse/${id}`,{ params: { token: getToken() } })
  } catch (e) {
    return e.error || e.response || e.data.response || e.data.error
  }
}

export async function getChatConversations(page = '1') {
  const token = localStorage.getItem('token')
  if (!token) {
    return { error: 'invalid token' }
  }

  return await axios
    .get(APP_BASE_URL + `/chat/getConversations?token=${token}&page=${page}`
    )
}

export async function getChatMentors(type) {
  const token = getToken()
  if (type === 'mentor' || type === 'teacher') {
    return  await axios
      .get(APP_BASE_URL + '/mentor/students', {params: {token}})
  }

  return  await axios
    .get(APP_BASE_URL + '/mentor/lists', {params: {token}})
}

export async function getMessagesByUserId(id) {
  const token = localStorage.getItem('token')
  if (!token) {
    return { error: 'invalid token' }
  }

  return await axios
    .get(APP_BASE_URL + `/chat/getMessagesByUser?token=${token}&id=${id}`)
    .then(res => ({...res, error: false}))
    .catch((error) => {
      if(error.response){
        return {...error.response, error: true}
      }
    })
}

export async function sendMessageById(formData) {
  const token = getToken()
  if (!token) {
    return { error: 'invalid token' }
  }
  formData.append('token', token)

  return await axios
    .post(APP_BASE_URL + `/chat/sendMessage`, formData)
    .then(res => ({...res, error: false}))
    .catch((error) => {
      if(error.response) {
        return {...error.response, error: true}
      }
    })
}

export async function getCalendarTasks() {
  const token = getToken()
  if (!token) return { error: 'invalid token' }


  return await axios.get(APP_BASE_URL + `/user/getSchedule?token=${token}`)
    .then(res => ({...res, error: false}))
    .catch(err => {
      if (err.response) {
        return {...err.response, error: true}
      }
    })
}

export async function getScheduleById(id) {
  const token = getToken()
  if (!token) return { error: 'invalid token' }

  return await axios.get(APP_BASE_URL + `/mentor/scheduleById`, {params: {token, id}})
}

export async function addCalendarTask(task) {
  const token = getToken()
  if (!token) return { error: 'invalid token' }

  return await axios.post(APP_BASE_URL + `/user/addTask?token=${token}`, task)
}

export async function removeCalendarTask(id) {
  const token = getToken()
  if (!token) return { error: 'invalid token' }

  return await axios.get(APP_BASE_URL + `/removeTask?token=${token}&id=${id}`)
}

export async function apiEditProfile(formData) {
  const token = getToken()
  if (!token) return { error: 'invalid token' }

  return await axios.post(`${APP_BASE_URL}/user/editProfile?token=${token}`, formData)
}

export async function ApiSetRatingByBonus() {
  return await axios.get(`${APP_BASE_URL}/educoin/ratingByBonus`)
}
