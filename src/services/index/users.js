import { callApi } from './apiUtils'
import { API_URL } from 'utils/constants'

export const signup = async ({ username, email, password }) => {
  try {
    const { data } = await callApi('post', '/auth/register', null, {
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

export const login = async ({ email, password }) => {
  try {
    const { data } = await callApi('post', '/auth/login', null, {
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

export const getUserProfile = async () => {
  try {
    const { data } = await callApi('get', '/auth/me', null, {})
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const updateProfile = async ({ userData }) => {
  try {
    const { data } = await callApi('put', '/auth/me', null, userData, {
      'Content-Type': 'multipart/form-data'
    })
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const changePassword = async ({ oldPassword, newPassword }) => {
  try {
    const { data } = await callApi('post', '/auth/change-password', null, {
      oldPassword,
      newPassword
    })
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const getAllUsers = async (searchKeyword = '', page = 1, limit = 10) => {
  try {
    const { data } = await callApi(
      'get',
      '/users',
      searchKeyword !== ''
        ? { keyword: searchKeyword, page, limit }
        : { page, limit },
      {}
    )
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const updateUser = async ({ userId, userData }) => {
  try {
    const { data } = await callApi('put', `/users/${userId}`, null, userData)
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const deleteUser = async ({ userId }) => {
  try {
    const { data } = await callApi(
      'delete',
      `${API_URL}/users/${userId}`,
      null,
      {}
    )
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}
