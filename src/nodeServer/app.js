const http = require('http');
const {
  serveHtml,
  serveBundle,
  menuType,
  filterBy,
} = require('./models');

const tags = ['vegan', 'vegetarian', 'gluten-free'];
const app = http.createServer((request, response) => {
  const { method, url } = request;
  const paths = url.slice(1).split('/');

  const [base, restuarantName, menu, meal, tag] = paths;

  if (method === 'GET') {
    if (base === '') {
      serveHtml(request, response);
    } else if (base === 'bundle.js' || base === 'bundle-server.js') {
      serveBundle(request, response, base);
    } else if (base === 'restaurants' && menu === 'menu' && !tag) {
      const itemInfo = [restuarantName, meal];
      menuType(request, response, itemInfo);
    } else if (tags.includes(tag)) {
      const itemInfo = [restuarantName, meal, tag];
      filterBy(request, response, itemInfo);
    } else {
      response.writeHead(404);
      response.end();
    }
  } else {
    response.writeHead(404);
    response.end();
  }
});

module.exports = app;
