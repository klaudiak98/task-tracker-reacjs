import { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';

const App = () => {

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('https://my-json-server.typicode.com/klaudiak98/task-tracker-db/tasks')
    const data = await res.json()
    
    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`https://my-json-server.typicode.com/klaudiak98/task-tracker-db/tasks/${id}`)
    const data = await res.json()
    
    return data
  }

  // Add task
  const addTask = async (task) => {
    const res = await fetch(
      'https://my-json-server.typicode.com/klaudiak98/task-tracker-db/tasks', 
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(task)
      })
    
    const data = await res.json()

    setTasks([...tasks, data])

    /*const id = Math.floor(Math.random() * 10000) + 1
    const newTask = {id, ...task, }
    setTasks([...tasks, newTask])*/
  }

  // Delete task
  const deleteTask = async (id) => {
    await fetch(
      `https://my-json-server.typicode.com/klaudiak98/task-tracker-db/tasks/${id}`,
      {
        method: 'DELETE'
      })

    setTasks(tasks.filter((task) =>  task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    console.log('dziala')
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(
      `https://my-json-server.typicode.com/klaudiak98/task-tracker-db/tasks/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type':'application/json'
        },
        body:JSON.stringify(updTask)
      }
      )
    const data = await res.json()

    setTasks(tasks.map(
      (task) => task.id === id ? 
        { ...task , reminder: data.reminder} 
        : task
      ))
  }

  return (
    <Router>
      <div className='container'>
        <Header 
          onAdd={() => {setShowAddTask(!showAddTask)}} 
          showAdd={showAddTask}
        />
        <Routes>
          <Route 
            path='/' 
            exact 
            element={
              <>
                { showAddTask && <AddTask onAdd={addTask} />}
                { tasks.length > 0 ? 
                  <Tasks 
                    tasks={tasks} 
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                  : 'No Tasks To Show'}
              </>
           }
          />

          <Route 
            path='/about' 
            element={<About/>}
          />

        </Routes>

        <Footer/>
      </div>
    </Router>
  );
}

export default App;
