const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

// GET all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// POST create new task
app.post('/tasks', (req, res) => {
    const { title } = req.body;

    if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required' });
    }

    const newTask = {
        id: Date.now(),
        title,
        completed: false,
        createdAt: new Date(),
        subtasks: [] 
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.post('/tasks/:id/subtasks', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const task = tasks.find(t => t.id == id);

    if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Subtask title required' });
}

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const subtask = {
        id: Date.now(),
        title,
        completed: false
    };

    task.subtasks.push(subtask);

    res.status(201).json(subtask);
});

app.patch('/tasks/:id', (req, res) => {
    const { id } = req.params;

    const task = tasks.find(t => t.id == id);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    // ✅ SAFE ACCESS (no destructuring)
    if (req.body && req.body.title !== undefined) {
        task.title = req.body.title;
    } else {
        task.completed = !task.completed;
    }

    res.json(task);
});

app.patch('/tasks/:taskId/subtasks/:subId', (req, res) => {
    const { taskId, subId } = req.params;

    const task = tasks.find(t => t.id == taskId);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const subtask = task.subtasks.find(s => s.id == subId);
    if (!subtask) {
        return res.status(404).json({ error: 'Subtask not found' });
    }

    // ✅ SAFE handling (same logic as tasks)
    if (req.body && req.body.title !== undefined) {
        subtask.title = req.body.title;
    } else {
        subtask.completed = !subtask.completed;
    }

    res.json(subtask);
});

// DELETE task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;

    const index = tasks.findIndex(t => t.id == id);

    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const deletedTask = tasks.splice(index, 1);

    res.json(deletedTask[0]);
});

app.delete('/tasks/:taskId/subtasks/:subId', (req, res) => {
    const { taskId, subId } = req.params;

    const task = tasks.find(t => t.id == taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const index = task.subtasks.findIndex(s => s.id == subId);
    if (index === -1) return res.status(404).json({ error: 'Subtask not found' });

    const deleted = task.subtasks.splice(index, 1);

    res.json(deleted[0]);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});