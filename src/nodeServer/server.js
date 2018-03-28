require('newrelic');
const mongoose = require('mongoose');
const app = require('./app');
const redisClient = require('./redisClient');

const port = process.env.PORT || 3005;
const MONGO_URI = 'mongodb://ec2-52-53-248-96.us-west-1.compute.amazonaws.com/silverspoon';

mongoose.connect(MONGO_URI, { poolSize: 10 });

app.listen(port, () => console.log(`LISTENING ---> ${port}`));
