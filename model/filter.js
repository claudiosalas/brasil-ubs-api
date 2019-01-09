const content = require('../repository/ubs').content()
const search = require('./search')

const byCity = (city) => {
  return content.filter((value) => search.city(value, city))
}

module.exports = {
  byCity
}
