const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const router = express.Router()
const app = express();

const routes = require('./routes')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

router.use('/csvtojson', routes.csvtojson)
router.use('/ubs', routes.ubs)
router.use('/users', routes.users)

// add api to all routes
app.use('/api', router)

module.exports = app;
