import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('https://task-master-backend-285e.onrender.com/tasks');
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async () => {
    if (!title.trim()) return;

    await fetch('https://task-master-backend-285e.onrender.com/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });

    setTitle('');
    fetchTasks();
  };

  // Toggle task
  const toggleTask = async (id) => {
    await fetch(`https://task-master-backend-285e.onrender.com/tasks/${id}`, {
      method: 'PATCH'
    });
    fetchTasks();
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`https://task-master-backend-285e.onrender.com/tasks/${id}`, {
      method: 'DELETE'
    });
    fetchTasks();
  };

  // Start editing
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.title);
  };

  // Save edit
  const saveEdit = async (id) => {
    await fetch(`https://task-master-backend-285e.onrender.com/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editText })
    });

    setEditingId(null);
    fetchTasks();
  };

  // Add subtask
  const addSubtask = async (taskId, text) => {
    if (!text.trim()) return;

    await fetch(`https://task-master-backend-285e.onrender.com/tasks/${taskId}/subtasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: text })
    });

    fetchTasks();
  };

  // Toggle subtask
  const toggleSubtask = async (taskId, subId) => {
    await fetch(`https://task-master-backend-285e.onrender.com/tasks/${taskId}/subtasks/${subId}`, {
      method: 'PATCH'
    });

    fetchTasks();
  };

  // Delete subtask
  const deleteSubtask = async (taskId, subId) => {
    await fetch(`https://task-master-backend-285e.onrender.com/tasks/${taskId}/subtasks/${subId}`, {
      method: 'DELETE'
    });

    fetchTasks();
  };

  // Filter logic
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="container">
      <div className="todo-app">
        <h1>To-Do List</h1>

        {/* Add Task */}
        <div className="row">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a task..."
          />
          <button onClick={addTask}>Add</button>
        </div>

        {/* Filters */}
        <div className="filters">
          <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
          <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
          <button onClick={() => setFilter('pending')} className={filter === 'pending' ? 'active' : ''}>Pending</button>
        </div>

        {/* TASK JSX STARTS HERE */}
        {filteredTasks.map(task => (
          <div className="task" key={task.id}>

            {/* Checkbox circle */}
            <div
              className={`circle ${task.completed ? 'checked' : ''}`}
              onClick={() => toggleTask(task.id)}
            />

            {/* Text OR Edit */}
            {editingId === task.id ? (
              <input
                className="edit-input"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => saveEdit(task.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    saveEdit(task.id);
                  }
                }}
              />
            ) : (
              <div
                className={`text ${task.completed ? 'completed' : ''}`}
                onDoubleClick={() => startEdit(task)}
              >
                {task.title}
              </div>
            )}

            {/* Delete */}
            <div className="delete" onClick={() => deleteTask(task.id)}>
              ❌
            </div>

            {/* Subtasks Section */}
            <div style={{ width: '100%', marginTop: '10px' }}>
              
              {/* Subtask input */}
              <input
                placeholder="Add subtask..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addSubtask(task.id, e.target.value);
                    e.target.value = '';
                  }
                }}
                style={{ marginLeft: '30px' }}
              />

              {/* Subtask list */}
              {task.subtasks && task.subtasks.map(sub => (
                <div key={sub.id} style={{ marginLeft: '40px', marginTop: '5px' }}>
                  
                  <span
                    onClick={() => toggleSubtask(task.id, sub.id)}
                    style={{
                      textDecoration: sub.completed ? 'line-through' : 'none',
                      cursor: 'pointer',
                      marginRight: '10px'
                    }}
                  >
                    {sub.title}
                  </span>

                  <span onClick={() => deleteSubtask(task.id, sub.id)}>
                    ❌
                  </span>
                </div>
              ))}
            </div>

          </div>
        ))}
        {/* TASK JSX ENDS HERE */}

      </div>
    </div>
  );
}

export default App;