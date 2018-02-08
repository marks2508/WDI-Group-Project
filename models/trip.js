const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});
commentSchema.set('toJSON', { virtuals: true });

const itemSchema = new mongoose.Schema({
  text: {type: String, required: true },
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});
itemSchema.set('toJSON', { virtuals: true });

const tripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  comments: [ commentSchema ],
  items: [ itemSchema],
  images: [String],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  start: {
    location: {
      lat: Number,
      lng: Number
    }
  },
  users: [ { type: mongoose.Schema.ObjectId, ref: 'User' }],
  end: {
    location: {
      lat: Number,
      lng: Number
    }
  },
  waypoints: [{}]
});

commentSchema.set('toJSON', { virtuals: true });
itemSchema.set('toJSON', { virtuals: true });
tripSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Trip', tripSchema);
