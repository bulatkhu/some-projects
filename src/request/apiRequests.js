import axios from 'axios'

export const configAccess = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
}


const isForFirebase = true // otherwise add to package.json "proxy": "https://api.ustaz.xyz/api/v1"
const baseUrl = 'https://api.ustaz.xyz/api/v1'

function getToken() {
  return localStorage.getItem('token')
}


export async function login(values) {
  return axios
    .post(!isForFirebase ? '/user/login' : baseUrl + '/user/login', { ...values }, { headers: { ...configAccess } })
    .then(res => ({...res, error: false}))
    .catch(err => ({ error: true, errInfo: err}))
}

export async function register(values) {
  return await axios.post(!isForFirebase ? '/user/register' : baseUrl + '/user/register', { ...values }, { headers: { ...configAccess } })
}

export async function keyGenerate(phone) {
  return await axios.post(!isForFirebase ? '/user/keyGenerate' : baseUrl + '/user/keyGenerate', { phone }, { headers: { ...configAccess } })
}

export async function checkKey(values) {
  return await axios.post(!isForFirebase ? '/user/checkKey' : baseUrl + '/user/checkKey', { ...values }, { headers: { ...configAccess } })
}

export async function getQuizList() {
  const token = localStorage.getItem('token') || '' || false
  if (!token) return { error: 'Invalid auth token' }

  return await axios.get(!isForFirebase ? `/quizlist?token=${token}` : baseUrl + `/quizlist?token=${token}`)
}

export async function getQuizzes(quizId) {
  const token = localStorage.getItem('token')
  // const token = '' || false
  if (!token) return { error: 'Invalid auth token' }

  return await axios.get(!isForFirebase ? `/quiz/${quizId}?token=${token}` : baseUrl + `/quiz/${quizId}?token=${token}`)
}

export async function getCoursesFromIndex() {
  try {
    return await axios.get(!isForFirebase ? '/index' : baseUrl + '/index')
  } catch (e) {
    return e.error || e.response || e.data.response || e.data.error
  }
}

export async function getDetailCourse(id) {
  try {
    return await axios.get(!isForFirebase ? `/getContent/${id}` : baseUrl + `/getContent/${id}`)
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
      : baseUrl + `/chat/getConversations?token=${token}&page=${page}`
    )
}

export async function getChatMentors() {
  return  await axios
    .get(!isForFirebase ? '/mentor/lists' : baseUrl + '/mentor/lists')
}

export async function getMessagesByUserId(id) {
  const token = localStorage.getItem('token')
  if (!token) {
    return { error: 'invalid token' }
  }

  return await axios
    .get(!isForFirebase ? `/chat/getMessagesByUser?token=${token}&id=${id}` : baseUrl + `/chat/getMessagesByUser?token=${token}&id=${id}`)
    .then(res => ({...res, error: false}))
    .catch((error) => {
      if(error.response){
        return {...error.response, error: true}
      }
    })
}

export async function sendMessageById(message, id) {
  const token = getToken()
  if (!token) {
    return { error: 'invalid token' }
  }

  return await axios
    .get(!isForFirebase ? `/chat/sendMessage?token=${token}&id=${id}&message=${message}` : baseUrl + `/chat/sendMessage?token=${token}&id=${id}&message=${message}`)
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