const $ = require('jquery');

const ajaxGet = (restName, menuType, tag, cb) => {
  const BASE_URL = process.env.BASE_URL || '';
  const temp = `${BASE_URL}/restaurants/${restName}/menu/${menuType}`;
  const URL = tag === 'none' ? temp : `${temp}/${tag}`;
  $.ajax({
    type: 'GET',
    url: URL,
    contentType: 'application/json',
    success: (result) => {
      // cb(JSON.parse(result));
      cb(result);
    },
  });
};

export default ajaxGet;
