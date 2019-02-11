const ubs = require('../repository/ubs')

const city = (actual, expected) => {
  return actual.dsc_cidade && actual.dsc_cidade.toLowerCase() === expected.toLowerCase();
}

const nearBy = (lat, long, radius = 30000) => {
  return ubs.geo().nearBy(lat, long, [250, radius])
}

const applyCriteria = (item, criteria) => { 
  if(criteria == undefined)
    return true

  const parse = (value) => {
    switch(value) {
      case 'very_good':
        return 'muito'
      case 'good':
        return 'ho acima'
      case 'fair_and_poor':
        return 'mediano'
      default:
        return ''
    }
  }
  return item.dsc_estrut_fisic_ambiencia.includes(parse(criteria.ambience)) && 
    item.dsc_adap_defic_fisic_idosos.includes(parse(criteria.elderly)) && 
    item.dsc_equipamentos.includes(parse(criteria.equipments)) &&
    item.dsc_medicamentos.includes(parse(criteria.medicines))
}

module.exports = {
  city,
  nearBy,
  applyCriteria
}
