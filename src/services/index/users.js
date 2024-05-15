import axios from 'axios'
import { API_URL } from 'utils/constants'

export const signup = async ({ username, email, password }) => {
  try {
    const { data } = await axios.post(API_URL + '/api/v1/auth/register', {
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
    const { data } = await axios.post(API_URL + '/api/v1/auth/login', {
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

    const { data } = await axios.get(API_URL + '/api/v1/auth/me', config)
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

    const { data } = await axios.put(
      API_URL + '/api/v1/auth/me',
      userData,
      config
    )
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}
