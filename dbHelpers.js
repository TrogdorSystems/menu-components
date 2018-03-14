const mongoose = require('mongoose');
const faker = require('faker');
const moment = require('moment');
const v8 = require('v8');
const heapdump = require('heapdump');
const menu = require('../helpers/menuGenerator');

const restaurantSchema = mongoose.Schema({
  id: { type: Number, unique: true },
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
});

const Restaurant = mongoose.model('restaurantMenus', restaurantSchema);

// const save = (options, cb) => {
//   const { data } = options;
//   const Model = options.model;
//   let count = 0;
//   const idArr = [];
//   data.forEach((item) => {
//     const instance = new Model({
//       id: item.id,
//       name: item.name,
//       menu: {
//         lunch: item.menu.lunch,
//         dinner: item.menu.dinner,
//         dessert: item.menu.dessert,
//       },
//     });
//     if (!idArr.includes(item.id)) {
//       idArr.push(item.id);
//       Model.create(instance, (err, result) => {
//         count += 1;
//         if (err) {
//           console.log('ERR: duplicate title already found in collection');
//         }
//         if (count === data.length) {
//           cb(result);
//         }
//       });
//     } else {
//       count += 1;
//     }
//   });
// };
const tags = [
  'gluten-free',
  'vegan',
  'vegetarian',
];

const insert = (start, max) => {
  let i = start;
  const begin = moment();
  console.log('ADDING', max);

  while (i < max) {
    let id = i;
    const item = {
      id,
      name: faker.company.companyName() + i,
      menu: {
        lunch: Array(20).fill(1).map((x) => {
          return {
            foodItem: faker.lorem.words(),
            cost: Math.floor(Math.random() * 15) + 5,
            tags: tags[Math.floor(Math.random() * tags.length)],
          };
        }),
        dinner: Array(20).map((x) => {
          return {
            foodItem: faker.lorem.words(),
            cost: Math.floor(Math.random() * 15) + 5,
            tags: tags[Math.floor(Math.random() * tags.length)],
          };
        }),
        dessert: Array(8).map((x) => {
          return {
            foodItem: faker.lorem.words(),
            cost: Math.floor(Math.random() * 15) + 5,
            tags: tags[Math.floor(Math.random() * tags.length)],
          };
        }),
      },
    };
    i += 1;
    id += 1;
    Restaurant.create(item).then(() => {
      if (id === max) {
        const end = moment();
        console.log(`Total Elapsed Time is ${end.diff(begin, 'seconds')}`);
        mongoose.disconnect();
      }
    })
    .catch(e => console.log(e));
    // if (i % 1000 === 0) {
    //   console.log(v8.getHeapSpaceStatistics()[0]);
    // }
  }
  return 'DONE';
};

const find = (options, cb) => {
  const query = options.query || 'id menu.lunch';
  const idNum = options.id || 90976;

  if (query === '{}') {
    Restaurant.find({}).exec((err, data) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, data);
      }
    });
  } else {
    Restaurant.find({ id: idNum }).select(query).exec((err, data) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, data);
      }
    });
  }
};

module.exports.insert = insert;
module.exports.find = find;
module.exports.Restaurant = Restaurant;
