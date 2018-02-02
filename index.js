const express    = require('express');
const mongoose   = require('mongoose');
const morgan     = require('morgan');
const bluebird   = require('bluebird');
const bodyParser = require('body-parser');
const app        = express();
const env        = app.get('env');

const { port, db }    = require('./config/environment');
const customResponses = require('./lib/customResponses');
const errorHandler    = require('./lib/errorHandler');
const routes          = require('./config/routes');

const dest = `${__dirname}/public`;

mongoose.Promise = bluebird;
mongoose.connect(db[env]);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(dest));

app.use(customResponses);
app.use('/api', routes);
app.get('/*', (req, res) => res.sendFile(`${dest}/index.html`));
app.use(errorHandler);


app.listen(port, () => console.log(`Express is running on port: ${port}`));
