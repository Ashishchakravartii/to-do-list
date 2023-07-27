var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/list1', function(req, res, next) {
  res.render('list1');
});
router.get('/list2', function(req, res, next) {
  res.render('list2');
});

module.exports = router;
