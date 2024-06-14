import axios from 'axios'

import { API_URL } from 'utils/constants'

export const signup = async ({ username, email, password }) => {
  try {
    const { data } = await axios.post(API_URL + '/auth/register', {
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
    const { data } = await axios.post(API_URL + '/auth/login', {
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

export const getUserProfile = async ({ token }) => {
  try {
    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.get(API_URL + '/auth/me', config)
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const updateProfile = async ({ token, userData }) => {
  try {
    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.put(API_URL + '/auth/me', userData, config)
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const changePassword = async ({ token, oldPassword, newPassword }) => {
  try {
    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
    const { data } = await axios.post(
      API_URL + '/auth/change-password',
      { oldPassword, newPassword },
      config
    )
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const getAllUsers = async (
  token,
  searchKeyword = '',
  page = 1,
  limit = 10
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.get(
      searchKeyword !== ''
        ? `${API_URL}/users?keyword=${searchKeyword}&page=${page}&limit=${limit}`
        : `${API_URL}/users?page=${page}&limit=${limit}`,
      config
    )
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const deleteUser = async ({ userId, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.delete(`${API_URL}/users/${userId}`, config)
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}
