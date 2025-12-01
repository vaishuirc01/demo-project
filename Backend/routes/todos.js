import express from 'express';
import{Todo} from '../models/Todo.js';


const router = express.Router();


// Create
router.post('/', async (req, res) => {
try {
const todo = new Todo(req.body);
await todo.save();
res.status(201).json(todo);
} catch (err) {
res.status(400).json({ message: err.message });
}
});


// Read all
router.get('/', async (req, res) => {
try {
const todos = await Todo.find().sort({ createdAt: -1 });
res.json(todos);
} catch (err) {
res.status(500).json({ message: err.message });
}
});


// Read one
router.get('/:id', async (req, res) => {
try {
const todo = await Todo.findById(req.params.id);
if (!todo) return res.status(404).json({ message: 'Not found' });
res.json(todo);
} catch (err) {
res.status(500).json({ message: err.message });
}
});


// Update
router.put('/:id', async (req, res) => {
try {
const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
if (!todo) return res.status(404).json({ message: 'Not found' });
res.json(todo);
} catch (err) {
res.status(400).json({ message: err.message });
}
});


// Delete
router.delete('/:id', async (req, res) => {
try {
const todo = await Todo.findByIdAndDelete(req.params.id);
if (!todo) return res.status(404).json({ message: 'Not found' });
res.json({ message: 'Deleted' });
} catch (err) {
res.status(500).json({ message: err.message });
}
});


export default router;