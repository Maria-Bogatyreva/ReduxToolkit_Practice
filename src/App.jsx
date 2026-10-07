import './App.css'
import Counter from "./features/counter/Counter.jsx";
import TasksList from "./features/tasks/TasksList.jsx";
import CompletedTasks from "./features/tasks/CompletedTasks.jsx";

function App() {

  return (
    <>
      <h1>Приложение</h1>
      <Counter />
      <TasksList />
      <hr/>
      <CompletedTasks />
    </>

  )
}

export default App
