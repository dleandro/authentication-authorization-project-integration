'use strict'

const
express = require('express'),
app = express()

// Setup app's middleware
require('./common/middleware/app-middleware')(app)

// routes and their behaviour
require("./web-api")(app)

// export the app for testing
module.exports = app