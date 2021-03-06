const mongoose = require('mongoose');
const fs = require('fs');
const faker = require('faker');
const { exec } = require('child_process');
const menu = require('../helpers/menuGenerator');


const writeStream = fs.createWriteStream('./SDC_DB/mongoData.json');

mongoose.connect('mongodb://ec2-52-53-248-96.us-west-1.compute.amazonaws.com/silverspoon');

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
}).index({ name: 1 });

const Restaurant = mongoose.model('restaurantMenus', restaurantSchema);

Restaurant.init()
  .then(() => mongoose.disconnect());

const sampleDataGen = (i) => {
  const data = {
    id: i,
    name: faker.lorem.word() + i,
    menu: {
      lunch: menu.entreeMenuGen(),
      dinner: menu.entreeMenuGen(),
      dessert: menu.dessertMenuGen(),
    },
  };
  return data;
};

const write10Million = (start = 1e6) => {
  let i = start;
  let freeSpace = true;

  while (i > 0 && freeSpace) {
    const data = sampleDataGen(i);
    freeSpace = writeStream.write(`${JSON.stringify(data)}\n`);
    i -= 1;
    if (i % 100000 === 0) {
      console.log('ADDED', i);
    }
  }

  if (i > 0) {
    writeStream.once('drain', () => {
      write10Million(i);
    });
  }

  if (i === 0) {
    const command = 'mongoimport --uri mongodb://ec2-52-53-248-96.us-west-1.compute.amazonaws.com/silverspoon -c restaurantmenus --file ./SDC_DB/mongoData.json --type json --numInsertionWorkers 4';
    exec(command, () => console.log('COMPLETED IMPORT'));
  }
};

write10Million();
