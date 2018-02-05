const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { db, env } = require('../config/environment');
const User = require('../models/user');
const Trip = require('../models/trip');

mongoose.connect(db[env]);

User.collection.drop();
Trip.collection.drop();

User
  .create([{
    username: 'JackD',
    email: 'jack@ga.com',
    password: 'password',
    passwordConfirmation: 'password'
  }, {
    username: 'MarkS',
    email: 'mark@ga.com',
    password: 'password',
    passwordConfirmation: 'password'
  }, {
    username: 'RobT',
    email: 'rob@ga.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created!`);

    return Trip.create([{
      title: 'Route 66',
      description: 'Grab your cowboy hat and hit the road on the historic Route 66 - America\'s most famous highway. Follow in the tyre-marks of settlers, cowboys, migrants and travellers on the main street of America and learn about the importance of this pathway through America\'s heartland. From the green shores of the Great Lakes, watch the landscape gradually change from fertile farmlands to arid desert, eventually giving way to the celebrated beaches of the Californian coastline.',
      start: {
        location: {
          lat: 41.878245,
          lng: -87.624432
        },
        description: 'Chicago'
      },
      end: {
        location: {
          lat: 34.010959,
          lng: -118.495381
        },
        description: 'Hollywood'
      },
      image: 'http://www.telegraph.co.uk/content/dam/Travel/Destinations/North%20America/USA/Route%2066/AP_Route66_Travel.jpg',
      createdBy: users[0]

    }, {
      title: 'The Red Centre Way',
      description: 'There is plenty to do and see in this region. You can spot rock wallabies at Simpsons Gap or swim in Glen Helen Gorge both in the West MacDonnell Ranges. Swim in the tropical pools of the Garden of Eden or climb to the rim of Kings Canyon. You can even opt for a dawn camel trek around Uluṟu. Explore the steep russet domes of Kata Tjuṯa nearby and make your way through the mulga forest and the red desert sands. Immerse yourself in Aboriginal history and art on this unforgettable adventure through the ancient part of Australia.',
      startPointLat: '',
      startPointLng: '',
      endPointLat: '',
      endPointLng: '',
      start: {
        location: {
          lat: '23.6980',
          lng: '133.8807'
        },
        description: 'Australia'
      },
      end: {
        location: {
          lat: '25.3507',
          lng: '131.0674'
        },
        description: 'Australia'
      },
      image: 'https://www.mappingmegan.com/wp-content/uploads/2015/01/IMG_1196.jpg',
      createdBy: users[1]
    }]);
  })
  .then((trips) => {
    console.log(`${trips.length} posts created!`);
  })
  .finally(() => {
    return mongoose.connection.close();
  })
  .catch(err => console.log(err));
