const faker = require('faker');

const generateRestaurantName = (id) => {
  const name = faker.company.companyName();
  return `${id},${name}`;
};

console.log(generateRestaurantName(2));

module.exports = generateRestaurantName;
