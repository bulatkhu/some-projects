import axios from 'axios'

export async function keyGenerate(phone) {
  return await axios.post('https://api.ustaz.xyz/api/v1/user/keyGenerate', { phone })
}

export async function checkKey(values) {
  return await axios.post('https://api.ustaz.xyz/api/v1/user/checkKey', values)
}