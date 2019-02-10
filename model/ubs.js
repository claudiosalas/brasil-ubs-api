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
    if (!isNaN(page) && city) {
      const filteredContent = filter.byCity(city)
      if (filteredContent.length === 0) {
        res.status(500).send({
          message: `City: ${city} not found!`
        })
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

  if (!lat || !long) {
    res.status(500).send({
      message: 'Missing information, lat or long information!'
    })
  }

  const filteredContent = search.nearBy(lat, long, radius)
  return res.status(200).send(filter.byNearBy(filteredContent))
}

module.exports = {
  list,
  listByPage,
  listByCity,
  listNearBy
}
