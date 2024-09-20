import axios from 'axios'
import { api_url } from 'utils/constants'

export const createContact = async ({ username, email, phone, message }) => {
  try {
    const { data } = await axios.post(`${api_url}/contacts`, {
      username,
      email,
      phone,
      message
    })
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}
