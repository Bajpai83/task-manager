import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/tasks').then(res => setTasks(res.data));
  }, []);

  const addTask = () => {
    if (newTask.trim()) {
      axios.post('http://localhost:5000/tasks', { title: newTask }).then(res => {
        setTasks([...tasks, res.data]);
        setNewTask("");
      });
    }
  };

  const completeTask = (id) => {
    axios.put(`http://localhost:5000/tasks/${id}`).then(res => {
      setTasks(tasks.map(t => t._id === id ? res.data : t));
    });
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`).then(() => {
      setTasks(tasks.filter(t => t._id !== id));
    });
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>Task Manager</h2>
      <input
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</span>
            <button onClick={() => completeTask(task._id)}>✓</button>
            <button onClick={() => deleteTask(task._id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;