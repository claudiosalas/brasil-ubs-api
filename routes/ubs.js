const express = require('express')
const router = express.Router()
// const filterPath = basePath + 'filter/city'

const ubsModel = require('../model/ubs')

router
  .get('/', ubsModel.list)
  .get('/:index', ubsModel.listByPage)
  .post('/city', ubsModel.listByCity);

module.exports = router;
