const express = require('express');
var cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerUtil = require('./swagger/swaggerUtil');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const router = express.Router()
const app = express();
const db = require('./repository/ubs')
db.load()

const routes = require('./routes')

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));


router.use('/csvtojson', routes.csvtojson)
router.use('/ubs', routes.ubs)

// Swagger UI
// Change the swaggerJsonFromYaml paramater to (1, 2 or 3), this is the api doc version number
app.use('/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerUtil.swaggerJsonFromYaml(2), true, { validatorUrl: null })
); 

// add api to all routes
app.use('/api', router)

module.exports = app;
