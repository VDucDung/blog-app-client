import { callApi } from './apiUtils'
import { api_url } from 'utils/constants'

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
      `${api_url}/users/${userId}`,
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
export const forgotPassword = async ({ email }) => {
  try {
    const { data } = await callApi(
      'post',
      `${api_url}/auth/forgot-password`,
      null,
      { email }
    )
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const verifyOtpForgotPassword = async ({ tokenForgot, otp }) => {
  try {
    const { data } = await callApi(
      'post',
      `${api_url}/auth/verify-otp-forgot-password`,
      null,
      { tokenForgot, otp }
    )
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const resetPassword = async ({ tokenVerifyOTP, newPassword }) => {
  try {
    const { data } = await callApi(
      'post',
      `${api_url}/auth/reset-password`,
      null,
      { tokenVerifyOTP, newPassword }
    )
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}
