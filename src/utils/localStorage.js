/* eslint-disable no-prototype-builtins */
export const getLocalStorageItem = (itemName) => {
  try {
    const item = JSON.parse(localStorage.getItem(itemName))
    return item
  } catch (error) {
    console.error(
      `Lỗi khi lấy thông tin từ localStorage cho item ${itemName}:`,
      error
    )
    return null
  }
}

export const updateFieldInLocalStorage = (
  fieldName,
  fieldValueName,
  newValue
) => {
  try {
    const storedData = JSON.parse(localStorage.getItem(fieldName))
    if (
      !storedData ||
      typeof storedData !== 'object' ||
      !storedData.hasOwnProperty(fieldValueName)
    ) {
      console.error(
        `Đối tượng ${fieldName} không hợp lệ hoặc thiếu trường "${fieldValueName}"`
      )
      return
    }

    storedData[fieldValueName] = newValue

    localStorage.setItem(fieldName, JSON.stringify(storedData))
  } catch (error) {
    console.error(
      `Lỗi khi cập nhật giá trị ${fieldValueName} của ${fieldName} trong localStorage:`,
      error
    )
  }
}

export const addOrUpdateFieldInLocalStorage = (
  fieldName,
  newField,
  newValue
) => {
  try {
    let storedData
    if (fieldName) {
      storedData = JSON.parse(localStorage.getItem(fieldName)) || {}
      if (newField) {
        storedData[newField] = newValue
      } else {
        storedData[newField] = newValue
      }
      localStorage.setItem(fieldName, JSON.stringify(storedData))
    } else {
      localStorage.setItem(newField, JSON.stringify(newValue))
    }
  } catch (error) {
    console.error(
      'Lỗi khi thêm hoặc cập nhật trường trong localStorage:',
      error
    )
  }
}
