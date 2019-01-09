const express = require('express');
const router = express.Router();

/* GET users listing. */
router
  .get('/', function (req, res, next) {
    res.send('GET users listing.');
  });

module.exports = router;
