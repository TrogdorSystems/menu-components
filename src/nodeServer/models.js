const fs = require('fs');
const etag = require('etag');
const path = require('path');
const redisClient = require('./redisClient');
const dbHelpers = require('../../db/dbHelpers');

module.exports = {
  serveHtml: (request, response) => {
    const htmlStream = fs.createReadStream(path.join(__dirname, '../client/index.html'));
    response.writeHead(200, { 'Content-Type': 'text/html' });
    htmlStream.pipe(response);
  },
  serveBundle: (request, response, fileName) => {
    const bundleStream = fs.createReadStream(path.join(__dirname, `../public/${fileName}`));
    let data = '';
    bundleStream.on('data', (chunk) => {
      data += chunk;
    }).on('end', () => {
      response.setHeader('etag', etag(data));
      response.writeHead(200, { 'Content-Type': 'text/javascript' });
      response.end(data);
    });
  },
  menuType: (request, response, itemInfo) => {
    // keeping just incase of ACAO issues
    // will remove if the proxy works without them God willing
    // res.set({ 'Access-Control-Allow-Origin': '*' });
    const [name, meal] = itemInfo;
    const redisKey = `${name}${meal}`;
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
    // keeping just incase of ACAO issues
    // will remove if the proxy works without them
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
