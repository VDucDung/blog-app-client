import axiosInstance from './axiosInstance'

export const callApi = async (
  method,
  url,
  params = null,
  data = null,
  customHeaders = {}
) => {
  try {
    const response = await axiosInstance({
      method: method,
      url: url,
      params: params,
      data: data,
      headers: { ...axiosInstance.defaults.headers, ...customHeaders }
    })
    return response
  } catch (error) {
    if (error) {
      return Promise.reject({ ...error })
    }
  }
}
