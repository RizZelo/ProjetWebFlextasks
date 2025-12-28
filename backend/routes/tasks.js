import express from 'express';
import Task from '../models/Task.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Create a new task (client only)
router.post('/', protect, async (req, res) => {
  try {
    if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Only clients can create tasks' });
    }

    const task = await Task.create({
      ...req.body,
      client: req.user.id
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all tasks (with filters)
router.get('/', async (req, res) => {
  try {
    const { status, category, clientId, studentId } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (category) filter.category = category;
    if (clientId) filter.client = clientId;
    if (studentId) filter.student = studentId;

    const tasks = await Task.find(filter)
      .populate('client', 'name email averageRating')
      .populate('student', 'name email averageRating')
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single task
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('client', 'name email phone averageRating')
      .populate('student', 'name email phone averageRating')
      .populate('applicants.student', 'name email averageRating skills');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Apply for a task (student only)
router.post('/:id/apply', protect, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can apply for tasks' });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.status !== 'open') {
      return res.status(400).json({ message: 'Task is not open for applications' });
    }

    // Check if already applied
    const alreadyApplied = task.applicants.some(
      app => app.student.toString() === req.user.id
    );

    if (alreadyApplied) {
      return res.status(400).json({ message: 'Already applied to this task' });
    }

    task.applicants.push({
      student: req.user.id,
      message: req.body.message
    });

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Assign task to student (client only)
router.put('/:id/assign', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.client.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    task.student = req.body.studentId;
    task.status = 'assigned';

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update task status
router.put('/:id/status', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check authorization
    const isClient = task.client.toString() === req.user.id;
    const isStudent = task.student && task.student.toString() === req.user.id;

    if (!isClient && !isStudent) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    task.status = req.body.status;
    if (req.body.status === 'completed') {
      task.completedDate = new Date();
    }

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
