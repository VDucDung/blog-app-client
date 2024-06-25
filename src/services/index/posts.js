import { callApi } from './apiUtils'

export const getAllPosts = async (
  searchKeyword = '',
  page = 1,
  limit = 10,
  checkCache = 'unchecked'
) => {
  try {
    const response = await callApi(
      'get',
      '/posts',
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

export const getSinglePost = async ({ slug }) => {
  try {
    const { data } = await callApi('get', `/posts/${slug}`, null, {})
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const deletePost = async ({ postId }) => {
  try {
    const { data } = await callApi('delete', `/posts/post/${postId}`, null, {})

    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const updatePost = async ({ updatedData, postId }) => {
  try {
    const { data } = await callApi(
      'put',
      `/posts/post/${postId}`,
      null,
      updatedData,
      {
        'Content-Type': 'multipart/form-data'
      }
    )
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const createPost = async ({ newData }) => {
  try {
    const { data } = await callApi('post', '/posts', null, newData, {
      'Content-Type': 'multipart/form-data'
    })
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const getPostsByUserId = async ({
  userId,
  searchKeyword = '',
  page = 1,
  limit = 10
}) => {
  try {
    const response = await callApi(
      'get',
      `/posts/user/${userId}`,
      {
        keyword: searchKeyword,
        page: page,
        limit: limit
      },
      {}
    )
    return { data: response.data, headers: response.headers }
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}
