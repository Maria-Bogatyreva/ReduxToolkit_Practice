import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, {rejectWithValue}) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      if (!response.ok) {
        throw new Error('error!!')
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async(id, {rejectWithValue, dispatch}) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Can not delete task!')
      }

      dispatch(removeTask(id))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addNewTask = createAsyncThunk(
  'tasks/addHewTask',
  async(text, {rejectWithValue, dispatch})=> {
    const newTask = {
      title: text,
      userId: 1,
      completed: false
    }
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      });

      if (!response.ok) {
        throw new Error('Can not add task!')
      }

      const data = await response.json();
      dispatch(addTask(data))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const toggleStatus = createAsyncThunk(
  'tasks,toggleStatus',
  async (id, {rejectWithValue, dispatch, getState}) => {
    const currentTask = getState().tasks.tasks.find(t => t.id === id);

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          completed: !currentTask.completed
        })
      });
      if (!response.ok) {
        throw new Error('Can\'t toggle status. Server error.');
      }

      dispatch(toggleTask(id))
    } catch (error) {
      return rejectWithValue(error.message)

    }
  }
)

const initialState = {
  tasks: [],
  status: 'idle',
  error: null
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload)
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);

      if (task) {
        task.completed = !task.completed
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeed';
        state.tasks = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message
      })
      .addCase(deleteTask.pending, (state, action) => {
        console.log('Удаление задачи')
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        console.log('Задача удалена успешно')
      })
  }
})
const {addTask, removeTask, toggleTask} = tasksSlice.actions;

// Экспорт селекторов, для использования в компонентах
export const selectTasksState = (state) => state.tasks;
export const selectTasks = (state) => state.tasks.tasks

//Мемоизированный селектор для выполненных задач
export const selectCompletedTasks = createSelector(
  [selectTasks],
  (tasks) => tasks.filter(t => t.completed)
)

// Экспорт редюсера для добавления в store
export default tasksSlice.reducer;