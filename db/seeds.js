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
   passwordConfirmation: 'password',
   picture: 'http://static2.businessinsider.com/image/5899ffcf6e09a897008b5c041200/.jpg'
 }, {
   username: 'MarkS',
   email: 'mark@ga.com',
   password: 'password',
   passwordConfirmation: 'password',
   picture: 'http://presidentofindia.nic.in/images/presidentprofiledownload.jpg'
 }, {
   username: 'RobT',
   email: 'rob@ga.com',
   password: 'password',
   passwordConfirmation: 'password',
   picture: 'https://upload.wikimedia.org/wikipedia/en/7/70/Shawn_Tok_Profile.jpg'
 }, {
   username: 'm',
   email: 'm@m',
   password: 'm',
   passwordConfirmation: 'm',
   picture: 'https://vignette.wikia.nocookie.net/jamesbond/images/9/90/M_%28Judi_Dench%29__Profile.jpg/revision/latest?cb=20130506215045'
 }])
 .then((users) => {
   console.log(`${users.length} users created!`);

   return Trip.create([{
     title: 'Route 66',
     description: 'Grab your cowboy hat and hit the road on the historic Route 66  America\'s most famous highway. Follow in the tyremarks of settlers, cowboys, migrants and travellers on the main street of America and learn about the importance of this pathway through America\'s heartland. From the green shores of the Great Lakes, watch the landscape gradually change from fertile farmlands to arid desert, eventually giving way to the celebrated beaches of the Californian coastline.',
     start: {
       location: {
         lat: 41.878245,
         lng: 87.624432
       }
     },
     end: {
       location: {
         lat: 34.010959,
         lng: 118.495381
       }
     },
     images: ['http://www.telegraph.co.uk/content/dam/Travel/Destinations/North%20America/USA/Route%2066/AP_Route66_Travel.jpg'],
     createdBy: users[0]

   }, {

     title: 'The Red Centre Way',
     description: 'There is plenty to do and see in this region. You can spot rock wallabies at Simpsons Gap or swim in Glen Helen Gorge both in the West MacDonnell Ranges. Swim in the tropical pools of the Garden of Eden or climb to the rim of Kings Canyon. You can even opt for a dawn camel trek around Uluṟu. Explore the steep russet domes of Kata Tjuṯa nearby and make your way through the mulga forest and the red desert sands. Immerse yourself in Aboriginal history and art on this unforgettable adventure through the ancient part of Australia.',
     start: {
       location: {
         lat: 23.6980,
         lng: 133.8807
       }
     },
     end: {
       location: {
         lat: 25.3444,
         lng: 131.0369
       }
     },
     images: ['https://www.mappingmegan.com/wpcontent/uploads/2015/01/IMG_1196.jpg', 'http://southseasadventures.com/sites/default/files/countrycoverphoto/201701/SydneyOperaHouse.jpg', 'https://www.australia.com/etc/designs/tourismaustralia/clientlibs/imgs/fallback/kangaroo_600_600.jpg'],
     createdBy: users[1]

   }, {

     title: 'Pacific Coast Highway',
     description: 'California\'s famous coast road, Highway 1, is a spectacular ribbon of road between San Francisco and San Diego. Highlights include Big Sur, where jagged mountains plunge down into pounding surf, fabled beach communities such as Venice and Malibu, old Spanish mission towns, art colonies, wine regions and the glitz and glamour of LA.',
     start: {
       location: {
         lat: 32.7157,
         lng: 117.1611
       }
     },
     end: {
       location: {
         lat: 37.7749,
         lng: 122.4194
       }
     },
     images: ['https://i.ytimg.com/vi/s5SgIvdVdGg/maxresdefault.jpg'],
     createdBy: users[2]

   },{

     title: 'The Garden Route',
     description: 'Hugging the curve of the coast around the very southern tip of Africa from Cape Town to Port Elizabeth, this celebrated touring route travels past white sandy beaches and over mountain passes through South Africa\'s holiday heartland. Named after the region\'s bountiful wildflowers, other attractions, beyond the majestic scenery, include forests with 800yearold trees, vineyards and plenty of wildlife.',
     start: {
       location: {
         lat: 33.9249,
         lng: 18.4241
       }
     },
     end: {
       location: {
         lat: 33.7139,
         lng: 25.5207
       }
     },
     images: ['https://nomadtours.co.za/media/gardenroute.jpg'],
     createdBy: users[1]

   },{

     title: 'The Ring Road',
     description: 'A lap of Iceland on the ring road (Highway 1), is one of the most desolate, but beautiful, drives in the world through an almost mythical landscape of active volcanoes (sometimes too active), glaciers, waterfalls, geothermal pools, spouting geysers, snowcapped mountains and icebergfilled glacial lagoons.',
     start: {
       location: {
         lat: 64.1265,
         lng: 21.8174
       }
     },
     end: {
       location: {
         lat: 65.1264,
         lng: 21.8173
       }
     },
     images: ['https://photos.smugmug.com/Europe/Iceland/iZtdVdBr/0/XL/ringroadlandscapeXL.jpg'],
     createdBy: users[0]

   },{

     title: 'Stelvio Pass',
     description: 'Not for the fainthearted, this legendary piece of road straddling the Swiss/Italian border with its notorious wall of 48 hairpin turns between Bormio and Stilfs (Stelvio) attracts driving enthusiasts (and masochistic cyclists and skateboarders) from around the world for the few summer months of the year it\'s open.',
     start: {
       location: {
         lat: 46.4664,
         lng: 10.3705
       }
     },
     end: {
       location: {
         lat: 46.5979,
         lng: 10.5444
       }
     },
     images: ['http://www.colcorsa.com/wpcontent/uploads/2016/07/StelvioPass.jpg'],
     createdBy: users[2]

   }])
     .then((trips) => {
       console.log(`${trips.length} posts created!`);		
     })

     .finally(() => {
       return mongoose.connection.close();
     })
     .catch(err => console.log(err));
 });
