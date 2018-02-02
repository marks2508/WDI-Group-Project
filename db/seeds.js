const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Movie = require('../models/movie');

mongoose.connect(dbURI);

Movie.collection.drop();

Movie
  .create([{
    title: 'Ladybird',
    director: 'Greta Gerwig',
    release: new Date('3 November 2017'),
    poster: 'https://upload.wikimedia.org/wikipedia/en/6/61/Lady_Bird_poster.jpeg',
    trailerId: 'https://www.youtube.com/watch?v=cNi_HC839Wo'
  },{
    title: 'Little Miss Sunshine',
    director: 'Jonathan Dayton & Valerie Faris',
    release: new Date('8 September 2006'),
    poster: 'https://upload.wikimedia.org/wikipedia/en/1/16/Little_miss_sunshine_poster.jpg',
    trailerId: 'https://www.youtube.com/watch?v=wvwVkllXT80'
  },{
    title: 'Baby Driver',
    director: 'Edgar Wright',
    release: new Date('28 June 2017'),
    poster: 'https://upload.wikimedia.org/wikipedia/en/8/8e/Baby_Driver_poster.jpg',
    trailerId: 'https://www.youtube.com/watch?v=z2z857RSfhk'
  },{
    title: 'The Breakfast Club',
    director: 'John Hughes',
    release: new Date('February 15, 1985'),
    poster: 'https://upload.wikimedia.org/wikipedia/en/5/50/The_Breakfast_Club.jpg',
    trailerId: 'https://www.youtube.com/watch?v=dkX8J-FKndE'
  },{
    title: 'The Grand Budapest Hotel',
    director: 'Wes Anderson',
    release: new Date('7 March 2014'),
    poster: 'http://t0.gstatic.com/images?q=tbn:ANd9GcSDDmHpt0TcHkK9DCv0QU-Xx4WNEVOJnHlj7pVfN61-1mEX2eCG',
    trailerId: 'https://www.youtube.com/watch?v=1Fg5iWmQjwk'
  }])
  .then(movies => console.log(`${movies.length} movies created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
