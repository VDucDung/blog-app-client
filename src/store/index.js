import { configureStore } from '@reduxjs/toolkit'

import { userReducer } from 'store/reducers/userReducers'

const userInfoFromStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const initialState = {
  user: { userInfo: userInfoFromStorage }
}

const store = configureStore({
  reducer: {
    user: userReducer
  },
  preloadedState: initialState
})

export default store
