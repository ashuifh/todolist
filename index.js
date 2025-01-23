const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');  // Import Todo model
const app = express();

app.use(cors());
app.use(express.json());  // To parse JSON bodies

mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({ task: task })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// DELETE route for deleting a todo by ID
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete(id)
        .then(() => res.status(200).json({ message: 'Todo deleted successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
