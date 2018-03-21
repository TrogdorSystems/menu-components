const db = require('./db/dbHelpers');
const sampleData = require('./data/sampleData');
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/silverspoon';

mongoose.connect(MONGO_URI);

db.save({ data: sampleData, model: db.Restaurant }, (result) => {
  if (result) {
    console.log('all added to db');
    mongoose.disconnect();
  }
});
