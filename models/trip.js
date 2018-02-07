const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

commentSchema.set('toJSON', { virtuals: true });

const tripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  comments: [ commentSchema ],
  images: [String],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  start: {
    location: {
      lat: Number,
      lng: Number
    }
  },
<<<<<<< HEAD


  users: [ { type: mongoose.Schema.ObjectId, ref: 'User' }],

=======
  users: [ { type: mongoose.Schema.ObjectId, ref: 'User' }],
>>>>>>> tests
  end: {
    location: {
      lat: Number,
      lng: Number
    }
  },
  waypoints: [{}]
});

commentSchema.set('toJSON', { virtuals: true });
tripSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Trip', tripSchema);
