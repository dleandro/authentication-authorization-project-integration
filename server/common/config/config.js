'use strict'

const _ = require('lodash')

// default configuration for the api
var config = {
    dev: 'development',
    test: 'testing',
    prod: 'production'
}

// check if node_env was set, if not, set it to dev
process.env.NODE_ENV = process.env.NODE_ENV || config.prod

// envconfig will require the file that corresponds to the config file that represents the app's state
// if it fails to do so then we equal it to an empty object
var envConfig

try {
    envConfig = require(`./${process.env.NODE_ENV}`)

    envConfig = envConfig || {}
} catch (error) {
    envConfig = {}
}

// set config.env to be equal to node_env
config.env = process.env.NODE_ENV

// merge the default config with the present envConfig file and export it
module.exports = _.merge(config, envConfig)