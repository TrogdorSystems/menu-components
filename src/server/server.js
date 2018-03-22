require('newrelic');
const app = require('./app');
const mongoose = require('mongoose');

const port = process.env.PORT || 3005;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/silverspoon';

mongoose.connect(MONGO_URI);
app.listen(port, () => { console.log(`listening on port: ${port}`); });
