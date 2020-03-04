var express = require('express');
var path = require('path');
var router = express.Router();

var mysql_dbc = require('../model/db/db_conn')();
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);

router.get('/', function (req, res, next) {
  console.log('work');
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
  console.log("1e232323");
});
// __dirname = 디렉토리의 절대경로

module.exports = router;
