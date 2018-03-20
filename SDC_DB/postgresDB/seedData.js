const fs = require('fs');
const { generateMenuItem } = require('./menuItemGen');
const nameGen = require('./restaurantNameGen');
const tagGen = require('./menuTagGen');

const nameStream = fs.createWriteStream(`${__dirname}/testData/names.csv`);
const itemStream = fs.createWriteStream(`${__dirname}/testData/items.csv`);
const tagStream = fs.createWriteStream(`${__dirname}/testData/tags.csv`);

const write480MTags = (start = 48e7) => {
  let index = start;
  let freeSpace = true;

  while (index > 0 && freeSpace) {
    const tag = tagGen(index);
    freeSpace = tagStream.write(tag);
    index -= 1;
  }

  if (index > 0) {
    tagStream.once('drain', () => write480MTags(index));
  }
};


const write10MNames = (start = 1e7) => {
  let index = start;
  let freeSpace = true;
  while (index > 0 && freeSpace) {
    const name = nameGen(index);
    freeSpace = nameStream.write(name);
    index -= 1;
  }

  if (index > 0) {
    nameStream.once('drain', () => write10MNames(index));
  }

  if (index === 0) {
    write480MTags();
  }
};

const generateMenu = (resId) => {
  const menu = [];
  for (let i = 0; i < 48; i += 1) {
    let item;
    if (i < 20) {
      item = generateMenuItem('LUNCH', resId);
    } else if (i < 40) {
      item = generateMenuItem('DINNER', resId);
    } else {
      item = generateMenuItem('DESSERT', resId);
    }
    menu.push(item);
  }
  return menu;
};

const write480MItems = (start = 1e7) => {
  let index = start;
  let freeSpace = true;

  while (index > 0 && freeSpace) {
    const menu = generateMenu(index);
    freeSpace = itemStream.write(`${menu.join('\n')}\n`);
    index -= 1;
  }

  if (index > 0) {
    itemStream.once('drain', () => {
      write480MItems(index);
    });
  }

  if (index === 0) {
    write10MNames();
  }
};

write480MItems();
