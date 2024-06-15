import axios from 'axios'

import { API_URL } from 'utils/constants'
import {
  addOrUpdateFieldInLocalStorage,
  getLocalStorageItem
} from 'utils/localStorage'

const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(async (config) => {
  const token = getLocalStorageItem('accessToken')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },

  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const refreshToken = getLocalStorageItem('refreshToken')
        const response = await axiosInstance.post(
          `${API_URL}/auth/refresh-tokens`,
          {
            refreshToken: refreshToken
          }
        )

        const newAccessToken = response.data.accessToken
        addOrUpdateFieldInLocalStorage(null, 'accessToken', newAccessToken)
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = 'auth/login'
        return Promise.reject(refreshError)
      }
    }
    if (error.response) {
      const { code, message } = error.response.data
      return Promise.reject({
        success: false,
        message: message,
        code: code,
        url: error.config.url
      })
    } else {
      return Promise.reject({
        success: false,
        message: 'Network error',
        code: 0
      })
    }
  }
)

export default axiosInstance
