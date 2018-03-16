const adjectives = [
  'homespun',
  'organic',
  'free-range',
  'winter',
  'late-summer',
  'fermented',
  'invigorated',
  'homemade',
  'cruelty-free',
  'aerated',
  'expanded',
  'distressed',
  'rubbed',
  'activated',
  'pan-seared',
  'stubbed',
  'palmed',
  'miniature',
  'natural',
  'frightened',
  'bludgeoned',
  'charcoal-rubbed',
  'farm-to-table',
  'sheltered',
  'lifted',
  'rounded',
  'beer-braised',
  'country',
  'rustic',
  'massaged',
  'burnt',
  'pressed',
  'japanese',
  'expanded',
  'french',
  'seasonal',
  'blistered',
  'quickened',
  'crafted',
  'artisinal',
  'turned',
  'naive',
];

const nouns = [
  'seaweed',
  'artichoke',
  'anchovy',
  'fennel',
  'millet',
  'acorn',
  'watermelon',
  'monkfish',
  'pork-saddle',
  'mountain oysters',
  'sunflower',
  'pork belly',
  'lamb',
  'sardines',
  'kale',
  'fig',
  'toast',
  'ham',
  'marrow',
  'watercress',
  'chorizo',
  'water',
  'eggplant',
  'bluefish',
  'blood sausage',
  'rice',
  'brussel sprouts',
  'broccolini',
  'asparagus',
  'scallops',
  'cremini mushrooms',
  'bacon',
  'prosciutto',
  'avocado',
  'avocado on toast',
];

const type = [
  'jam',
  'mousse',
  'puree',
  'spread',
  'toss',
  'souffle',
  'platter',
  'booze',
  'pate',
  'discs',
  'crust',
  'crumble',
  'pepper',
  'jus',
  'drippings',
  'confit',
];

const joiner = [
  '&',
  'with',
  'coated in',
  'wrapped in',
  'drizzled in',
  'on a bed of',
];

const tags = [
  'gluten-free',
  'vegan',
  'vegetarian',
];

const desserts = [
  'deconstructed cornbread puree',
  'late-summer berry creme brulee',
  'damson plum clafoutis',
  'roaster pears with espresso mascarpone cream',
  'poppyseed cake with passion-fruit curd',
  'cannoli',
  'strawberry mint souffle',
  'deconstructed lave cake',
  'frozen cookie dough',
  'salted caramel bundt cake',
  'lemon paste curd tart',
  'blackout cake',
  'flourless vanilla chocolate brownie',
  'bear claw',
  'bedfordshire clanger',
  'cherry pie & burnt ginger flakes',
  'brandy snaps',
  'girl guide cookies',
  'black mango and blood orange truffles',
];

const getIndex = array => Math.floor(Math.random() * array.length);

const entreeMenuGen = () => {
  let count = 20;
  const result = [];
  const usedNouns = new Set([]);
  const usedAdj = new Set([]);
  while (count > 0) {
    const adj1 = getIndex(adjectives);
    const adj2 = getIndex(adjectives);
    const noun = getIndex(nouns);
    const price = Math.floor((Math.random() * (40 - 10)) + 10);
    if (!usedNouns.has(noun) && !usedAdj.has(adj1)) {
      usedNouns.add(noun);
      usedAdj.add(adj1);
      if (adj1 > 24 && adj1 !== adj2) {
        count -= 1;
        result.push({
          foodItem: `${adjectives[adj1]} ${nouns[noun]} ${joiner[getIndex(joiner)]} ${adjectives[adj2]} ${nouns[getIndex(nouns)]} ${type[getIndex(type)]}`,
          cost: price,
          tags: tags[getIndex(tags)],
        });
      } else {
        count -= 1;
        result.push({
          foodItem: `${adjectives[adj1]} ${nouns[noun]}`,
          cost: price,
          tags: tags[getIndex(tags)],
        });
      }
    }
  }
  return result;
};

const dessertMenuGen = () => {
  let count = 8;
  const result = [];
  while (count > 0) {
    const index = getIndex(desserts);
    const price = Math.floor((Math.random() * (40 - 10)) + 10);
    if (!result.includes(desserts[index])) {
      count -= 1;
      result.push({
        foodItem: desserts[index],
        cost: price,
        tags: tags[getIndex(tags)],
      });
    }
  }
  return result;
};

module.exports.entreeMenuGen = entreeMenuGen;
module.exports.dessertMenuGen = dessertMenuGen;
