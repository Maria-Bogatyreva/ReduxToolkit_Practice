import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addNewTask, deleteTask, fetchTasks, selectTasks, selectTasksState, toggleStatus} from "./tasksSlice.js";

export default function TasksList() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (text.trim()) {
      dispatch(addNewTask(text));
      setText('');
    }
  }

  const { status, error } = useSelector(selectTasksState);
  const tasks = useSelector(selectTasks)


  useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchTasks())
      }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <p>Загрузка</p>
  }

  if (status === 'failed') {
    return <p>Ошибка {error}</p>
  }

  return (
    <>
      <h1>Список задач</h1>
      <div>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
        <button type="button" onClick={handleAddTask}> Добавить задачу</button>
      </div>
      <ul>
        {tasks.map( task => (
          <li key={task.id} style={{textDecoration: task.completed ? 'line-through' : 'none'}}>
            {task.title}
            &nbsp;
            <button onClick={()=>dispatch(toggleStatus(task.id))}>{task.completed ? 'Отменить' : 'Завершить'}</button>
            <button onClick={()=>dispatch(deleteTask(task.id))}>Удалить</button>
          </li>
          )
        )}
      </ul>
    </>
  )
}
