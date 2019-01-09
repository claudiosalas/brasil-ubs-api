const express = require('express');
const router = express.Router();
const content = require('../resources/ubs.json')
const baseUrl = '/api/ubs'
const pagePath = 'page'
const filterPagePath = 'filter/city/page'
const limit = 20;

const parse = (page, records, path) => {
  const maxNumberOfPages = Math.ceil(records.length / limit);
  if (page > maxNumberOfPages) {
    throw new Error(`Max number of pages is ${maxNumberOfPages}!`)
  }
  const startIndex = page === 1 ? 0 : page * limit - (limit + 1);
  const endIndex = page === 1 ? limit : (page * limit - 1) > records.length ? records.length - 1 : page * limit - 1;
  const values = records.slice(startIndex, endIndex)
  return {
    '_metadata': {
      'page': `${page} of ${maxNumberOfPages}`,
      'page_count': values.length,
      'start_index': page === 1 ? 1 : startIndex + 2,
      'end_index': page === 1 ? limit : endIndex + 1,
      'total_count': records.length,
      'previous_page': `${baseUrl}/${path}/${page === 1 ? page : page - 1}`,
      'next_page': `${baseUrl}/${path}/${page + 1}`
    },
    'records': values
  }
}

const searchCity = (value, city) => {
  return value.dsc_cidade && value.dsc_cidade.toLowerCase() === city.toLowerCase();
}

const filterByCity = (page, city) => {
  const records = content.filter((value) => searchCity(value, city))
  return parse(page, records, filterPagePath)
}

router
  .get('/', function (req, res, next) {
    res.send(parse(1, content, pagePath));
  })
  .get('/page/:index', function (req, res, next) {
    const page = parseInt(req.params.index);
    if (!isNaN(page)) {
      res.send(parse(page, content, pagePath));
    }
  })
  .post('/filter/city', function (req, res, next) {
    try {
      const page = parseInt(req.body.page);
      if (!isNaN(page)) {
        res.send(filterByCity(page, req.body.city));
      }
    } catch (error) {
      res.status(500).send({
        message: error.message
      })
    }
  });

module.exports = router;
