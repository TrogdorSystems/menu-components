const fs = require('fs');
const redisClient = require('./redisClient');
const dbHelpers = require('../../db/dbHelpers');

module.exports = {
  serveHtml: (request, response) => {
    const htmlStream = fs.createReadStream('../client/index.html');
    response.writeHead(200, { 'Content-Type': 'text/html' });
    htmlStream.pipe(response);
  },
  serveBundle: (request, response) => {
    const bundleStream = fs.createReadStream('../public/bundle.js');
    response.writeHead(200, { 'Content-Type': 'text/javascript' });
    bundleStream.pipe(response);
  },
  menuType: (request, response, itemInfo) => {
    // res.set({ 'Access-Control-Allow-Origin': '*' });
    const [name, meal] = itemInfo;
    const redisKey = `${name}${meal}`;
    const queryObj = {
      name,
      query: `menu.${meal}`,
    };
    console.log(queryObj);
    redisClient.get(redisKey, (error, data) => {
      if (data !== null) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(data);
      } else {
        dbHelpers.find(queryObj, (err, result) => {
          if (err) {
            response.writeHead(500);
            response.end();
          }
          const menu = JSON.stringify(result.menu[meal]);
          redisClient.setex(redisKey, 5, menu);
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.end(menu);
        });
      }
    });
  },
  filterBy: (request, response, itemInfo) => {
    // res.set({ 'Access-Control-Allow-Origin': '*' });
    const [name, meal, tag] = itemInfo;
    const redisKey = `${name}${meal}${tag}`;
    const queryObj = {
      name,
      query: `menu.${meal}`,
    };

    redisClient.get(redisKey, (error, data) => {
      if (data !== null) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(data);
      } else {
        dbHelpers.find(queryObj, (err, result) => {
          const menu = result.menu[meal];
          const filteredMenu = JSON.stringify(menu.filter(item => item.tags === tag));
          redisClient.setex(redisKey, 5, filteredMenu);
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.end(filteredMenu);
        });
      }
    });
  },
};
