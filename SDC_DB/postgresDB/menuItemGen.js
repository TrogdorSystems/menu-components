const {
  adjectives,
  nouns,
  types,
  joiner,
  desserts,
} = require('./menuGenData');

const getIndex = array => Math.floor(Math.random() * array.length);

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

const generateMenuItem = (menuType, resId) => {
  let name;
  const menu = menuType;
  if (menu === 'DESSERT') {
    name = generateDessert();
  } else {
    name = generateMenuName();
  }
  const price = Math.floor((Math.random() * (40 - 10)) + 10);
  return `${name},${menu},${price},${resId}`;
};

module.exports = {
  generateMenuItem,
  generateDessert,
};
