const Geo = require('geo-nearby');
const ubs = require('../resources/ubs.json')
const address = require('../resources/ogc.json')
let ubsData = []
let geoData = []
let addresses = {}
let geoContent = null

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

  ubs.forEach(element => {
    const cep = getCEPBasedOnCNES(element.cod_cnes)
    element.co_cep = cep
    ubsData.push(element)
    geoData.push([Number(element.vlr_latitude), Number(element.vlr_longitude), element.cod_cnes])
  });

  let geoDataSet = Geo.createCompactSet(geoData);
  geoContent = new Geo(geoDataSet, { sorted: true });
}

const content = () => ubsData

const geo = () => geoContent

module.exports = {
  geo,
  content,
  load
}
