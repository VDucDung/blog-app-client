import { callApi } from './apiUtils'

export const createNewComment = async ({
  comment,
  slug,
  parent,
  replyOnUser
}) => {
  try {
    const { data } = await callApi('post', '/comments', null, {
      comment,
      slug,
      parent,
      replyOnUser
    })
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const updateComment = async ({ comment, check, commentId }) => {
  try {
    const { data } = await callApi('put', `/comments/${commentId}`, null, {
      comment,
      check
    })
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const deleteComment = async ({ commentId }) => {
  try {
    const { data } = await callApi('delete', `/comments/${commentId}`, null, {})
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const getAllComments = async (
  searchKeyword = '',
  page = 1,
  limit = 10,
  checkCache = 'unchecked'
) => {
  try {
    const response = await callApi(
      'get',
      '/comments',
      {
        keyword: searchKeyword,
        page: page,
        limit: limit,
        checkCache: checkCache
      },
      {}
    )
    return {
      data: response.data,
      headers: response.headers
    }
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}
