const {
  adjectives,
  nouns,
  types,
  joiner,
  desserts,
} = require('./menuGenData');

const getIndex = array => Math.floor(Math.random() * array.length);

const generateMenuType = () => {
  const menus = ['LUNCH', 'DINNER', 'DESSERT'];
  const index = Math.floor(Math.random() * menus.length);
  return menus[index];
};

const willHaveTag = () => {
  const chance = Math.floor(Math.random() * 100);
  return chance < 20;
};

const generateMenuName = () => {
  const adj1 = adjectives[getIndex(adjectives)];
  const adj2 = adjectives[getIndex(adjectives)];
  const noun1 = nouns[getIndex(nouns)];
  const noun2 = nouns[getIndex(nouns)];
  const join = joiner[getIndex(joiner)];
  const type = types[getIndex(types)];
  return `${adj1} ${noun1} ${join} ${adj2} ${noun2} ${type}`;
};

const generateDessert = () => {
  const index = Math.floor(Math.random() * desserts.length);
  return desserts[index];
};

const generateMenuItem = () => {
  let name;
  const menu = generateMenuType();
  if (menu === 'DESSERT') {
    name = generateDessert();
  } else {
    name = generateMenuName();
  }
  const price = Math.floor((Math.random() * (40 - 10)) + 10);
  const glutenFree = willHaveTag();
  const vegetarian = willHaveTag();
  const vegan = willHaveTag();
  return `${name},${menu},${price},${glutenFree},${vegetarian},${vegan}\n`;
};

console.log(generateMenuItem(3));

module.exports = generateMenuItem;
