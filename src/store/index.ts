import { configureStore } from '@reduxjs/toolkit'
import {CartApi} from './api'

export const store = configureStore({
  reducer: {
    [CartApi.reducerPath]: CartApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(CartApi.middleware),
})

