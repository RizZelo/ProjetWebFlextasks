import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  ratedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ratedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxlength: 500
  },
  // Rating categories
  punctuality: {
    type: Number,
    min: 1,
    max: 5
  },
  quality: {
    type: Number,
    min: 1,
    max: 5
  },
  communication: {
    type: Number,
    min: 1,
    max: 5
  }
}, {
  timestamps: true
});

// Ensure one rating per user per task
ratingSchema.index({ task: 1, ratedBy: 1 }, { unique: true });
// Index for user profile queries
ratingSchema.index({ ratedUser: 1 });

// Update user's average rating after saving
ratingSchema.post('save', async function() {
  const Rating = mongoose.model('Rating');
  const User = mongoose.model('User');
  
  // Calculate new average rating for the rated user
  const ratings = await Rating.find({ ratedUser: this.ratedUser });
  const avgRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
  
  await User.findByIdAndUpdate(this.ratedUser, {
    averageRating: avgRating,
    totalRatings: ratings.length
  });
});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
