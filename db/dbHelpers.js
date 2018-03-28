const mongoose = require('mongoose');

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

const save = (options, cb) => {
  const { data } = options;
  const Model = options.model;
  let count = 0;
  const idArr = [];
  data.forEach((item) => {
    const instance = new Model({
      id: item.id,
      name: item.name,
      menu: {
        lunch: item.menu.lunch,
        dinner: item.menu.dinner,
        dessert: item.menu.dessert,
      },
    });
    if (!idArr.includes(item.id)) {
      idArr.push(item.id);
      Model.create(instance, (err, result) => {
        count += 1;
        if (err) {
          console.log('ERR: duplicate title already found in collection');
        }
        if (count === data.length) {
          cb(result);
        }
      });
    } else {
      count += 1;
    }
  });
};

const find = (options, cb) => {
  const query = options.query || 'id menu.lunch';
  const name = options.name || 'quos999999';
  console.log('FIND - DB HELPERS', query, name);
  if (query === '{}') {
    Restaurant.findOne({ name }).exec((err, data) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, data);
      }
    });
  } else {
    console.log('CHECKING MONGO');
    Restaurant.findOne({ name }).select(query).exec((err, data) => {
      console.log('MONGO', err, data);
      if (err) {
        cb(err, null);
      } else {
        console.log('FOUND');
        cb(null, data);
      }
    });
  }
};

module.exports.save = save;
module.exports.find = find;
module.exports.Restaurant = Restaurant;
