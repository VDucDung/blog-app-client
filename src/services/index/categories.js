import { callApi } from './apiUtils'

export const getCategories = async ({
  searchKeyword = '',
  currentPage = 1,
  limit = 10
}) => {
  try {
    const { data } = await callApi(
      'get',
      '/categories',
      searchKeyword !== ''
        ? { keyword: searchKeyword, page: currentPage, limit }
        : { page: currentPage, limit },
      {}
    )

    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const deleteCategory = async ({ categoryId }) => {
  try {
    const { data } = await callApi(
      'delete',
      `/categories/${categoryId}`,
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

export const createCategory = async ({ name }) => {
  try {
    const { data } = await callApi('post', '/categories', null, { name })
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const updateCategory = async ({ name, categoryId }) => {
  try {
    const { data } = await callApi('put', `/categories/${categoryId}`, null, {
      name
    })
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}

export const getSingleCategory = async ({ categoryId }) => {
  try {
    const { data } = await callApi('get', `/categories/${categoryId}`, null, {})
    return data
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message)
    throw new Error(error.message)
  }
}
