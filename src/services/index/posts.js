import axios from 'axios'

import { API_URL } from 'utils/constants'

export const getAllPosts = async (searchKeyword = '', page = 1, limit = 10) => {
  try {
    const token = JSON.parse(localStorage.getItem('accessToken'))
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    const response = await axios.get(
      `${API_URL}/posts?keyword=${searchKeyword}&page=${page}&limit=${limit}`,
      config
    )
    return { data: response.data, headers: response.headers }
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const getSinglePost = async ({ slug }) => {
  try {
    const { data } = await axios.get(`${API_URL}/posts/${slug}`)
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const deletePost = async ({ postId, token }) => {
  try {
    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.delete(
      `${API_URL}/posts/post/${postId}`,
      config
    )
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}
