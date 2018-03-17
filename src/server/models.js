const dbHelpers = require('../../db/dbHelpers');

module.exports = {
  menuType: (req, res) => {
    // res.set({ 'Access-Control-Allow-Origin': '*' });
    const { meal, name } = req.params;
    const queryObj = {
      name,
      query: `menu.${meal}`,
    };
    dbHelpers.find(queryObj, (err, result) => {
      console.log('MENU TYPE', result);
      const resultObj = result[0].toObject();
      res.send(resultObj.menu[meal]);
    });
  },
  filterBy: (req, res) => {
    // res.set({ 'Access-Control-Allow-Origin': '*' });
    const { meal, tag, name } = req.params;
    const queryObj = {
      name,
      query: `menu.${meal}`,
    };
    dbHelpers.find(queryObj, (err, result) => {
      console.log('FILTER', result);
      const resultObj = result[0].toObject();
      const menu = resultObj.menu[meal];
      const filteredMenu = menu.filter(item => item.tags === tag);
      res.send(filteredMenu);
    });
  },
};
