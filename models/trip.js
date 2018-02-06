const mongoose = require('mongoose');
const User = require('./user.js');

const waypointSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  description: String
});

waypointSchema.set('toJSON', { virtuals: true });

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

commentSchema.set('toJSON', { virtuals: true });

const tripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  comments: [ commentSchema ],
  image: { type: String},
  start: {
    location: {
      lat: Number,
      lng: Number
    },
    description: String,
    places: []
  },
  waypoints: [ waypointSchema ],
  users: [],
  end: {
    location: {
      lat: Number,
      lng: Number
    },
    description: String
  },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

commentSchema.set('toJSON', { virtuals: true });
tripSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Trip', tripSchema);
