const models = require('./models');
const router = require('express').Router();

router.get('/:name/menu/:meal', models.menuType);

router.get('/:name/menu/:meal/:tag', models.filterBy);

module.exports = router;
