import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/users'

const getUser = async (id) => {
  const { data } = await axios.get(`${baseUrl}/${id}`)
  return data
}

export default { getUser }
