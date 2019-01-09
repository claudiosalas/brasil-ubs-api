const express = require('express');
const router = express.Router();
const csvToJson = require('convert-csv-to-json');
const csvFile = 'resources/ubs.csv';
const jsonFile = 'resources/ubs.json'

router.get('/convert', function (req, res, next) {
  csvToJson.fieldDelimiter(',')
  csvToJson.generateJsonFileFromCsv(csvFile, jsonFile);
  res.status(201).send(`File ${jsonFile} created!`);
});

module.exports = router;
