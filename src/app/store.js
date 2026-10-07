import {configureStore} from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counterSlice.js'
import tasksReducer from '../features/tasks/tasksSlice.js'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    tasks: tasksReducer,
  }
})

export default store;