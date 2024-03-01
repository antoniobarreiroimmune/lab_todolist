
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

const Task = require('./models/task.model')

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/todo_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

app.get('/:id', async (req, res) => {
  try {
    const tasks = await Task.findById(req.params.id);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

app.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({ title, description });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: 'Error creating task' });
  }
});

app.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: 'Error updating task' });
  }
});

app.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting task' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
