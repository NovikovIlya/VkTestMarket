import { configureStore } from '@reduxjs/toolkit'
import {CartApi} from './api'
import sliceData from './sliceData';

export const store = configureStore({
  reducer: {
    [CartApi.reducerPath]: CartApi.reducer,
    sliceData
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(CartApi.middleware),
})



export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;