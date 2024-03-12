
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const CartApi = createApi({
  reducerPath: 'apiMovies',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/products' }),
  tagTypes: ['Fetch'],
  endpoints: (builder) => ({
    fetchCart: builder.query<any, any>({
      query: () => ({
        url: `?limit=6`,
      }),
    }),
    deleteCart: builder.query<any, any>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});


export const { useFetchCartQuery,useDeleteCartQuery } = CartApi;