const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  release: Date,
  poster: String,
  trailerId: String
});

movieSchema.pre('save', function splitUrl(next){
  if(this.isModified('trailerId')) {
    this.trailerId = this.trailerId.match(/[a-zA-Z0-9_-]{11}/);
  }
  next();
});

movieSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Movie', movieSchema);
