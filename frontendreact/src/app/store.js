import { configureStore } from '@reduxjs/toolkit'
import userReduce from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    user: userReduce,
  },
})