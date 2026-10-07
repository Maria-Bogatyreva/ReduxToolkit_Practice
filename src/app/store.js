import {configureStore} from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counterSlice.js'
import tasksReducer from '../features/tasks/tasksSlice.js'
import {apiSlice} from "../services/apiSlice.js";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    tasks: tasksReducer,
    [apiSlice.reducerPath]: apiSlice.reducer // вот подключение API SLICE к редюсеру!!
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store;