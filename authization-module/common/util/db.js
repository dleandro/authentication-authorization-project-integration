'use strict'

const
  config = require("../config/config")


module.exports = {

  /**
   *
   * @returns {Promise<PoolConnection>}
   */
  connect: config.sgbd == "mysql" ? async () => {
    const mariadb = require('mariadb')
    let connection

  
    try {
     connection = await mariadb.createConnection(config.database_opts)
      return connection

    } catch (err) {

      console.log('unable to connect')

      throw err;
    }
   
  } : async () => {

    const { Pool } = require('pg')

    var pool

    try {

      pool = new Pool(config.database_opts)
      return pool
    } catch (err) {

      console.log('unable to connect')

      throw err;
    }

  }


}
