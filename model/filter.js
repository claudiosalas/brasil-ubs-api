const content = require('../repository/ubs').content()
const search = require('./search')

const byCity = (city) => {
  return content.filter((value) => search.city(value, city))
}

const byNearBy = (cities) => {
  const data = []
  cities.forEach(city => {
    data.push(content.filter(value => value.cod_cnes === city.i))
  })
  return data
}

module.exports = {
  byCity,
  byNearBy
}
