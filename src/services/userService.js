import axios from 'axios'

const baseUrl = 'https://codifyapi.herokuapp.com/api/users'

const getUser = async (id) => {
  const { data } = await axios.get(`${baseUrl}/${id}`)
  return data
}

export default { getUser }
