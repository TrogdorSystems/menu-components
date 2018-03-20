const faker = require('faker');

const generateRestaurantName = () => {
  const name = faker.name.findName();
  return `${name}\n`;
};

module.exports = generateRestaurantName;
