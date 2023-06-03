import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/users'

const register = async credentials => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

export default { register }
