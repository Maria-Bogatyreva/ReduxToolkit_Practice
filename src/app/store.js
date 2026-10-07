import {configureStore} from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counterSlice.js'
import tasksReducer from '../features/tasks/tasksSlice.js'
import {api} from "../services/api.js";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    tasks: tasksReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

export default store;