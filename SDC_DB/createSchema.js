const mongoose = require('mongoose');
const fs = require('fs');
const { generator } = require('../data/sampleData');

const writeStream = fs.createWriteStream('./db/testData.json');

mongoose.connect('mongodb://localhost/silverspoon');

const restaurantSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: String,
  menu: {
    lunch: [{
      foodItem: String,
      cost: Number,
      tags: String,
    }],
    dinner: [{
      foodItem: String,
      cost: Number,
      tags: String,
    }],
    dessert: [{
      foodItem: String,
      cost: Number,
      tags: String,
    }],
  },
}).index({ name: 'text' });

const Restaurant = mongoose.model('restaurantMenus', restaurantSchema);

function write10Million(start = 1e7) {
  let i = start;
  let freeSpace = true;

  while (i > 0 && freeSpace) {
    const data = generator(i);
    freeSpace = writeStream.write(`${JSON.stringify(data)}\n`);
    i -= 1;
  }

  if (i > 0) {
    writeStream.once('drain', () => {
      write10Million(i);
    });
  }

  if (i === 0) {
    mongoose.disconnect();
  }
}

write10Million();
