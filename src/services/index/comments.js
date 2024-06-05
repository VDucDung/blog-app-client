import axios from 'axios'

import { API_URL } from 'utils/constants'

export const createNewComment = async ({
  token,
  comment,
  slug,
  parent,
  replyOnUser
}) => {
  try {
    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.post(
      '${API_URL}/comments',
      {
        comment,
        slug,
        parent,
        replyOnUser
      },
      config
    )
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const updateComment = async ({ token, comment, check, commentId }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.put(
      `${API_URL}/comments/${commentId}`,
      {
        comment,
        check
      },
      config
    )
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const deleteComment = async ({ commentId, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.delete(
      `${API_URL}/comments/${commentId}`,
      config
    )
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const getAllComments = async (
  token,
  searchKeyword = '',
  page = 1,
  limit = 10,
  checkCache = false
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data, headers } = await axios.get(
      `${API_URL}/comments?keyword=${searchKeyword}&page=${page}&limit=${limit}&checkCache=${checkCache}`,
      config
    )
    return { data, headers }
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}
