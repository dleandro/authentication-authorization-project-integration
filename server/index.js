'use strict'

/*
    This file is the entry point for our server, it requires our application and starts listenning on the desired port.
    This port must be configured on the config file
*/

const
config = require('./common/config/config'),
app = require('./server')

app.listen(config.port, () => console.log(`Listening on Port: ${config.port}`))