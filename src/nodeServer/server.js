require('newrelic');
const mongoose = require('mongoose');
const app = require('./app');
const redisClient = require('./redisClient');

const port = process.env.PORT || 3005;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/silverspoon';

mongoose.connect(MONGO_URI, { poolSize: 10 });


app.listen(port, () => console.log(`LISTENING ---> ${port}`));
