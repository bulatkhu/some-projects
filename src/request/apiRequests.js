import axios from 'axios'
import {APP_BASE_URL} from '../app.config'

export const configAccess = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
}


const isForFirebase = true // otherwise add to package.json "proxy": "https://api.ustaz.xyz/api/v1"

export function getToken() {
  return localStorage.getItem('token')
}


export async function login(values) {
  return axios
    .post(!isForFirebase ? '/user/login' : APP_BASE_URL + '/user/login', { ...values }, { headers: { ...configAccess } })
    .then(res => ({...res, error: false}))
    .catch(err => ({ error: true, errInfo: err}))
}

export async function register(values) {
  return await axios.post(!isForFirebase ? '/user/register' : APP_BASE_URL + '/user/register', { ...values }, { headers: { ...configAccess } })
}

export async function keyGenerate(phone) {
  return await axios.post(!isForFirebase ? '/user/keyGenerate' : APP_BASE_URL + '/user/keyGenerate', { phone }, { headers: { ...configAccess } })
}

export async function checkKey(values) {
  return await axios.post(!isForFirebase ? '/user/checkKey' : APP_BASE_URL + '/user/checkKey', { ...values }, { headers: { ...configAccess } })
}

export async function getQuizList() {
  const token = localStorage.getItem('token') || '' || false
  if (!token) return { error: 'Invalid auth token' }

  return await axios.get(!isForFirebase ? `/quizlist?token=${token}` : APP_BASE_URL + `/quizlist?token=${token}`)
}

export async function getQuizzes(quizId) {
  const token = localStorage.getItem('token')
  // const token = '' || false
  if (!token) return { error: 'Invalid auth token' }

  return await axios.get(!isForFirebase ? `/quiz/${quizId}?token=${token}` : APP_BASE_URL + `/quiz/${quizId}?token=${token}`)
}

export async function getCoursesFromIndex() {
  try {
    return await axios.get(!isForFirebase ? '/index' : APP_BASE_URL + '/index')
  } catch (e) {
    return e.error || e.response || e.data.response || e.data.error
  }
}

export async function getDetailCourse(id) {
  try {
    return await axios.get(!isForFirebase ? `/getContent/${id}` : APP_BASE_URL + `/getContent/${id}`)
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
    .get(!isForFirebase
      ? `/chat/getConversations?token=${token}&page=${page}`
      : APP_BASE_URL + `/chat/getConversations?token=${token}&page=${page}`
    )
}

export async function getChatMentors(type) {
  console.log('get chat for', type)
  const token = getToken()
  if (type === 'mentor' || type === 'teacher') {
    return  await axios
      .get(!isForFirebase ? '/mentor/students' : APP_BASE_URL + '/mentor/students', {params: {token}})
  }

  return  await axios
    .get(!isForFirebase ? '/mentor/lists' : APP_BASE_URL + '/mentor/lists', {params: {token}})
}

export async function getMessagesByUserId(id) {
  const token = localStorage.getItem('token')
  if (!token) {
    return { error: 'invalid token' }
  }

  return await axios
    .get(!isForFirebase ? `/chat/getMessagesByUser?token=${token}&id=${id}` : APP_BASE_URL + `/chat/getMessagesByUser?token=${token}&id=${id}`)
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
    .post(!isForFirebase ? `/chat/sendMessage` : APP_BASE_URL + `/chat/sendMessage`,
      formData)
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


  return await axios.get(`https://api.ustaz.xyz/api/v1/user/getSchedule?token=${token}`)
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

  return await axios.get(`${APP_BASE_URL}/mentor/scheduleById`, {params: {token, id}})
    .then(res => ({...res, error: false}))
    .catch(err => {
      if (err.response) {
        return {...err.response, error: true}
      }
    })
}

export async function addCalendarTask(task) {
  const token = getToken()
  if (!token) return { error: 'invalid token' }

  return await axios.post(`https://api.ustaz.xyz/api/v1/user/addTask?token=${token}`, task)
    .then(res => ({...res, error: false}))
    .catch(err => {
      if (err.response) {
        return {...err.response, error: true}
      }
    })
}

export async function removeCalendarTask(id) {
  const token = getToken()
  if (!token) return { error: 'invalid token' }

  return await axios.get(`https://api.ustaz.xyz/api/v1/user/removeTask?token=${token}&id=${id}`)
    .then(res => ({...res, error: false}))
    .catch(err => {
      if (err.response) {
        return {...err.response, error: true}
      }
    })
}

export async function apiEditProfile(values) {
  const token = getToken()
  if (!token) return { error: 'invalid token' }


  return await axios.post('https://api.ustaz.xyz/api/v1/user/editProfile', {...values, token})
    .then(res => ({...res, error: false}))
    .catch(err => {
      if (err.response) {
        return {...err.response, error: true}
      }
    })

}
