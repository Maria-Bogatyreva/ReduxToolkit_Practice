import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: 'api', //уникальное имя апи
  baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com/'}),
  endpoints: (builder) => ({
    getUsers: builder.query({
      // query: () => 'users?_limit=5', // эндпоинт для получения пользователей
      query: () => 'users?_limit=5', // эндпоинт для получения пользователей
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: 'users', // эндпоинт для добавления нового пользователя
        method: 'POST',
        body: newUser
      })
    }),
  }),
})

// экспорт хуков для использования в компонентах
export const {useGetUsersQuery, useAddUserMutation} = api;