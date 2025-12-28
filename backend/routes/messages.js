import express from 'express';
import Message from '../models/Message.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Send a message
router.post('/', protect, async (req, res) => {
  try {
    const { task, receiver, content } = req.body;

    const message = await Message.create({
      task,
      sender: req.user.id,
      receiver,
      content
    });

    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'name')
      .populate('receiver', 'name');

    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get messages for a task
router.get('/task/:taskId', protect, async (req, res) => {
  try {
    const messages = await Message.find({ task: req.params.taskId })
      .populate('sender', 'name profileImage')
      .populate('receiver', 'name profileImage')
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark message as read
router.put('/:id/read', protect, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (message.receiver.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    message.isRead = true;
    message.readAt = new Date();
    await message.save();

    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
