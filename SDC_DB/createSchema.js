const mongoose = require('mongoose');
const fs = require('fs');
const faker = require('faker');
const { exec } = require('child_process');
const menu = require('../helpers/menuGenerator');


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
}).index({ name: 1 });

const Restaurant = mongoose.model('restaurantMenus', restaurantSchema);

Restaurant.init()
  .then(() => mongoose.disconnect());

const sampleDataGen = (i) => {
  const data = {
    id: i,
    name: faker.company.companyName(),
    menu: {
      lunch: menu.entreeMenuGen(),
      dinner: menu.entreeMenuGen(),
      dessert: menu.dessertMenuGen(),
    },
  };
  return data;
};

const write10Million = (start = 1e7) => {
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
    const command = 'mongoimport -d silverspoon -c restaurantmenus --file db/testData.json --type json --numInsertionWorkers 4';
    exec(command, () => console.log('COMPLETED IMPORT'));
  }
};

write10Million();
