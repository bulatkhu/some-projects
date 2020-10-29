import axios from 'axios'

export const configAccess = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
}

export async function login(values) {
  return axios.post('/user/login', { ...values }, { headers: { ...configAccess } })
}

export async function register(values) {
  return await axios.post('/user/register', { ...values }, { headers: { ...configAccess } })
}

export async function keyGenerate(phone) {
  return await axios.post('/user/keyGenerate', { phone }, { headers: { ...configAccess } })
}

export async function checkKey(values) {
  return await axios.post('/user/checkKey', { ...values }, { headers: { ...configAccess } })
}

export async function getQuizList() {
  const token = localStorage.getItem('token') || '' || false
  if (!token) return { error: 'Invalid auth token' }

  return await axios.get(`/quizlist?token=${token}`)
}

export async function getQuizzes(quizId) {
  const token = localStorage.getItem('token') || '' || false
  // const token = '' || false
  if (!token) return { error: 'Invalid auth token' }

  return await axios.get(`/quiz/${quizId}?token=${token}`)
}