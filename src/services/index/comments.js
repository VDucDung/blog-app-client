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
