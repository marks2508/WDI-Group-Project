const mongoose = require('mongoose');

// const commentSchema = new mongoose.Schema({
//   text: { type: String, required: true },
//   createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
// });
//
// commentSchema.set('toJSON', { virtuals: true });

const tripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startPointLat: { type: Number, required: true },
  startPointLng: { type: Number, required: true },
  endPointLat: { type: Number, required: true },
  endPointLng: { type: Number, required: true }
  // createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
  // comments: [ commentSchema ],
});

tripSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Trip', tripSchema);
