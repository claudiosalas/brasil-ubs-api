const quality = require('../resources/ubs.json')
const address = require('../resources/ogc.json')
let data = []
let addresses = {}

const getCEPBasedOnCNES = (cnes) => {
  return (addresses && addresses[cnes]) || '00000000'
}

const load = () => {
  address.features.forEach(element => {
    const optCEP = element.properties.find(property => property.co_cep)
    const optCNES = element.properties.find(property => property.co_cnes)
    if (optCNES && optCEP && optCNES.hasOwnProperty('co_cnes') && optCEP.hasOwnProperty('co_cep')) {
      addresses[optCNES.co_cnes] = optCEP.co_cep
    }
  });
  return content()
}

const content = () => {
  if (data.length) {
    return data
  }
  quality.forEach(element => {
    const cep = getCEPBasedOnCNES(element.cod_cnes)
    element.co_cep = cep
    data.push(element)
  });
  return data
}

module.exports = {
  content,
  load
}
