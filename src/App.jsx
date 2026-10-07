import './App.css'
import Counter from "./features/counter/Counter.jsx";
import TasksList from "./features/tasks/TasksList.jsx";
import CompletedTasks from "./features/tasks/CompletedTasks.jsx";
import UsersList from "./components/UsersList.jsx";

function App() {

  return (
    <>
      <h1>Приложение</h1>
      <UsersList />
      <hr/>
      <Counter />
      <TasksList />
      <hr/>
      <CompletedTasks />
    </>

  )
}

export default App
