import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  // Equivalent of component.didMount(); for functional components
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
  }, []);

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    return await res.json();
  }

    // Fetch task
    const fetchTask = async (taskId) => {
      const res = await fetch(`http://localhost:5000/tasks/${taskId}`);
      return await res.json();
    };

  const deleteTask = async (taskId) => {
    await fetch(`http://localhost:5000/tasks/${taskId}`, { method: "DELETE" });
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
  };

  const toggleReminder = async (taskId) => {
    const reminderResponse = await fetchTask(taskId);
    if (reminderResponse?.id) {
      const updatedReminder = {
        ...reminderResponse,
        reminder: !reminderResponse.reminder,
      };
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(updatedReminder),
      });
      const responseData = await response.json();
      const remappedTasks = tasks.map((task) => (task.id === taskId ? { ...task, reminder: !responseData.reminder } : task));
      setTasks(remappedTasks);
    }
  };

  const addTask = async (task) => {
    const response = await fetch('http://localhost:5000/tasks', {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-type": "application/json",
      }
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
  };

  return (
    <Router>
      <div className="container">
        <Header showAdd={showAddTask} onAdd={() => setShowAddTask(!showAddTask)} title="Time Tracker"/>
        
        <Routes>
          <Route path="/"  element={
              <>
                { showAddTask && <AddTask onAdd={addTask} /> }
                { tasks.length > 0 ? <Tasks tasks={tasks} onToggle={toggleReminder} onDelete={deleteTask} /> : <h4>Nothing to show</h4> }
              </>
              } 
            />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
