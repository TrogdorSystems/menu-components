const willHaveTag = () => {
  const chance = Math.floor(Math.random() * 100);
  return chance < 20;
};

const generateTag = (itemId) => {
  const glutenFree = willHaveTag();
  const vegetarian = willHaveTag();
  const vegan = willHaveTag();
  return `${glutenFree},${vegetarian},${vegan},${itemId}\n`;
};

module.exports = generateTag;
