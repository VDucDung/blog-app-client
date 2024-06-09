import axios from 'axios'

import { API_URL } from 'utils/constants'
export const getCategories = async ({
  token,
  searchKeyword = '',
  currentPage = 1,
  limit = 10
}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.get(
      `${API_URL}/categories?keyword=${searchKeyword}&page=${currentPage}&limit=${limit}`,
      config
    )

    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const deleteCategory = async ({ categoryId, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.delete(
      `${API_URL}/categories/${categoryId}`,
      config
    )
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const createCategory = async ({ token, name }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.post(`${API_URL}/categories`, { name }, config)
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const updateCategory = async ({ token, name, categoryId }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.put(
      `${API_URL}/categories/${categoryId}`,
      { name },
      config
    )
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const getSingleCategory = async ({ categoryId, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const { data } = await axios.get(
      `${API_URL}/categories/${categoryId}`,
      config
    )
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}
