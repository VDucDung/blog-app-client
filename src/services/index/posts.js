import axios from 'axios'

import { API_URL } from 'utils/constants'

export const getAllPosts = async () => {
  try {
    const { data } = await axios.get(API_URL + '/posts')

    return data
  } catch (error) {
    if (error.response && error.response.data.message) throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const getSinglePost = async ({ slug }) => {
  try {
    const { data } = await axios.get(API_URL + `/posts/${slug}`)
    return data
  } catch (error) {
    if (error.response && error.response.data.message) throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}
