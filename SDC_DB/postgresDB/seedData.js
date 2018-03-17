const pg = require('pg');
const fs = require('fs');
const { exec } = require('child_process');
const itemGen = require('./menuItemGen');
const nameGen = require('./restaurantNameGen');

const nameStream = fs.createWriteStream('./testData/names.csv');
const itemStream = fs.createWriteStream('./testData/items.csv');

const write10MItems = (start = 1e7) => {
  let i = start;
  let freeSpace = true;

  while (i > 0 && freeSpace) {
    const item = itemGen(i);
    freeSpace = itemStream.write(item);
    i -= 1;
  }

  if (i > 0) {
    itemStream.once('drain', () => {
      write10MItems(i);
    });
  }
};

write10MItems();
