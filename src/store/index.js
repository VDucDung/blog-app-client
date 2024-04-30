import { configureStore } from '@reduxjs/toolkit'

import { countReducer } from 'store/reducers/countReducers'

const store = configureStore({
  reducer: {
    count: countReducer
  }
})

export default store
