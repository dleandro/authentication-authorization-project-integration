'use strict'

const dalUtils = require('../common/util/dal-utils')
module.exports = {



    addUserHistory: async (userId, date, description) => {

        const query = {
            statement: 'INSERT INTO Users_History(user_id,date,description) VALUES (?,?,?);',
            description: "user history registration",
            params: [userId, date, description]
        }

        try {
            return await dalUtils.executeQuery(query)

        } catch (error) {
            throw error
        }

    },

    getAllHistories: async () => {

        const query = {
            statement: "SELECT * FROM Users_History",
            description: "get all user histories",
            params: []
        }

        try {

            return await dalUtils.executeQuery(query)

        } catch (error) {
            throw error
        }

    },

    getAllHistoriesFromSpecificUser: async (userId) => {

        const query = {
            statement: "SELECT * FROM Users_History WHERE id = ?",
            description: "get all histories from specific user",
            params: [userId]
        }

        try {

            return await dalUtils.executeQuery(query)

        } catch (error) {
            throw error
        }

    }


}
