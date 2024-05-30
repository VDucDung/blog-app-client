import axios from 'axios'

import { API_URL } from 'utils/constants'
export const getCategories = async ({ token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.get(`${API_URL}/categories`, config)
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}
