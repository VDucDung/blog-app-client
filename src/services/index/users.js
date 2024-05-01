import axios from 'axios'
import { API_URL } from 'utils/constants'

export const signup = async ({ username, email, password }) => {
  try {
    const { data } = await axios.post(API_URL + '/api/v1/auth/register', {
      username,
      email,
      password
    })
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}
