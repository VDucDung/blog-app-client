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
      API_URL + '/comments',
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

export const updateComment = async ({ token, comment, commentId }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.put(
      API_URL + `/comments/${commentId}`,
      {
        comment
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

export const deleteComment = async ({ token, commentId }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.delete(
      API_URL + `/comments/${commentId}`,
      config
    )
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}
