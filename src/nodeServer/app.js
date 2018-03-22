const http = require('http');
const {
  serveHtml,
  serveBundle,
  menuType,
  filterBy,
} = require('./models');

const app = http.createServer((request, response) => {
  const { method, url } = request;

  if (method === 'GET') {
    const paths = url.slice(1).split('/');
    if (paths[0] === '') {
      serveHtml(request, response);
    } else if (paths[0] === 'bundle.js' || paths[0] === 'app-server.js') {
      serveBundle(request, response, paths[0]);
    } else if (paths[0] === 'restaurants' && paths[2] === 'menu') {
      if (paths.length === 4) {
        const itemInfo = [paths[1], paths[3]];
        menuType(request, response, itemInfo);
      } else if (paths.length === 5) {
        const itemInfo = [paths[1], paths[3], paths[4]];
        filterBy(request, response, itemInfo);
      } else {
        response.writeHead(404);
        response.end();
      }
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
