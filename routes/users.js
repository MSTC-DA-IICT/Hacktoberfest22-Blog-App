var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('index', {foo: 'FOO', delimiter: '?'});
});

module.exports = router;
