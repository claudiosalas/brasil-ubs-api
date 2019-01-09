
const city = (actual, expected) => {
  return actual.dsc_cidade && actual.dsc_cidade.toLowerCase() === expected.toLowerCase();
}

module.exports = {
  city
}
