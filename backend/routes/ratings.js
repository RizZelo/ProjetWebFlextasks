import express from 'express';
import Rating from '../models/Rating.js';
import Task from '../models/Task.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Create a rating
router.post('/', protect, async (req, res) => {
  try {
    const { taskId, ratedUser, rating, comment, punctuality, professionalism, quality, communication } = req.body;

    // Verify task is completed
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.status !== 'completed') {
      return res.status(400).json({ message: 'Can only rate completed tasks' });
    }

    // Verify user is part of the task
    const isClient = task.client.toString() === req.user.id;
    const isStudent = task.student && task.student.toString() === req.user.id;

    if (!isClient && !isStudent) {
      return res.status(403).json({ message: 'Not authorized to rate this task' });
    }

    // Create rating
    const newRating = await Rating.create({
      task: taskId,
      ratedUser,
      ratedBy: req.user.id,
      rating,
      comment,
      punctuality,
      professionalism,
      quality,
      communication
    });

    res.status(201).json(newRating);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already rated this task' });
    }
    res.status(500).json({ message: error.message });
  }
});

// Get ratings for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const ratings = await Rating.find({ ratedUser: req.params.userId })
      .populate('ratedBy', 'name')
      .populate('task', 'title category')
      .sort({ createdAt: -1 });

    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get rating for a specific task
router.get('/task/:taskId', protect, async (req, res) => {
  try {
    const ratings = await Rating.find({ task: req.params.taskId })
      .populate('ratedUser', 'name')
      .populate('ratedBy', 'name');

    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
