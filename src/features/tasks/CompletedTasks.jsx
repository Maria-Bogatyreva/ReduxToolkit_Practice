import {useSelector} from "react-redux";
import {selectCompletedTasks} from "./tasksSlice.js";

export default function CompletedTasks() {
  const completedTasks = useSelector(selectCompletedTasks);
  return (
    <>
      <h2>Только выполненные задачи</h2>
      <ul>{
        completedTasks.map( task => (
          <li key={task.id} style={{textDecoration: 'line-through'}}>{task.title}</li>
        ))
      }</ul>
    </>
  )
}
