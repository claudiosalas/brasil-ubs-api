const fs = require('fs');
const yaml = require('js-yaml');

module.exports.swaggerJsonFromYaml = (part) => {
    return yaml.safeLoad(fs.readFileSync('./swagger/version_' + part + '.yaml'));
};
