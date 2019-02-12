const pagination = require('./pagination')
const filter = require('./filter')
const search = require('./search')
const content = require('../repository/ubs').content()

const list = (req, res) => {
  return res.send(pagination.parse(1, content))
}

const listByPage = (req, res) => {
  const page = parseInt(req.params.index)
  if (!isNaN(page)) {
    res.send(pagination.parse(page, content))
  }
}

const listByCity = (req, res) => {
  try {
    const page = parseInt(req.body.page) || 1
    const city = req.body && req.body.city
    const criteria = req.body.criteria
    if (!isNaN(page) && city) {
      const filteredContent = filter.byCity(city, criteria)
      if (filteredContent.length === 0) {
        res.status(500).send({
          "_metadata": {
              "page": "0 / 0",
              "page_count": 0,
              "start_index": 0,
              "end_index": 0,
              "total_count": 0,
              "current_page": "0",
              "next_page": "0"
          },
          "records": []})
      } else {
        res.send(pagination.parse(page, filteredContent))
      }
    }
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}

const listNearBy = (req, res) => {
  const lat = req.body.lat
  const long = req.body.long
  const radius = req.body.radius
  const criteria = req.body.criteria

  if (!lat || !long) {
    res.status(500).send({
      message: 'Missing information, lat or long information!'
    })
  }

  const filteredContent = search.nearBy(lat, long, radius)
  return res.status(200).send({
    records: filter.byNearBy(filteredContent, criteria).map(item => item[0])
  })
}

module.exports = {
  list,
  listByPage,
  listByCity,
  listNearBy
}
