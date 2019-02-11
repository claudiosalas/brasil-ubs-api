const content = require('../repository/ubs').content()
const search = require('./search')

const byCity = (city, criteria) => {
  return content.filter((value) => search.city(value, city) && search.applyCriteria(value, criteria))
}

const byNearBy = (cities, criteria) => {
  const data = []
  cities.forEach(city => {
    const result = content.filter(value => value.cod_cnes === city.i && search.applyCriteria(value, criteria))
    if (result.length === 0) return
    data.push(result)
  })
  return data
}

module.exports = {
  byCity,
  byNearBy
}
