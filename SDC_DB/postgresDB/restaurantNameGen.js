const faker = require('faker');

const generateRestaurantName = () => {
  const name = faker.company.companyName();
  return `${name}\n`;
};

console.log(generateRestaurantName(2));

module.exports = generateRestaurantName;
