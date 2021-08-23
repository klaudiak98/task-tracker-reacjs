import {useState} from 'react'
import Header from "./components/Header";
import Tasks from "./components/Tasks";


function App() {

  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'First task',
        day: 'Feb 5th at 2:30pm',
        remainder: true
    },
    {
        id: 2,
        text: 'Second tast',
        day: 'Feb 6th at 1:30pm',
        remainder: false
    }
  ])

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) =>  task.id !== id))
  }

  return (
    <div className='container'>
      <Header />
      { tasks.length > 0 ? 
        <Tasks tasks={tasks} onDelete={deleteTask}/> : 
        'No Tasks To Show'}
   </div>
  );
}

export default App;
