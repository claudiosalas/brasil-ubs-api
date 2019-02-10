const ubs = require('../repository/ubs')

const city = (actual, expected) => {
  return actual.dsc_cidade && actual.dsc_cidade.toLowerCase() === expected.toLowerCase();
}

const nearBy = (lat, long, radius = 30000) => {
  return ubs.geo().nearBy(lat, long, [250, radius])
}

module.exports = {
  city,
  nearBy
}
