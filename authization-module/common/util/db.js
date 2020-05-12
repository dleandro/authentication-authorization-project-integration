'use strict'

const
  mariadb = require('mariadb'),
  config = require("../config/config")

const pool = mariadb.createPool(config.database_opts)
/**
 *
 * @type {{connect: connect}}
 */
module.exports = {

  /**
   *
   * @returns {Promise<PoolConnection>}
   */
  connect: async function connect() {

    let connection
    try {
      connection = await pool.getConnection();
      return connection

    } catch (err) {

      console.log('unable to connect')

      throw err;
    }
  }

}