'use strict'


const dalUtils = require('../common/util/dal-utils')

module.exports = {

    create: async (method, path, description) => {

        const query = {
            statement: `INSERT INTO Permission(method,path,description) VALUES (?,?,?);`,
            description: "adding permission",
            params: [method, path, description]
        }

        try {
            return await dalUtils.executeQuery(query)

        } catch (error) {
            throw error
        }
    },

    delete: async (method, path) => {

        const query = {
            statement: `DELETE FROM Permission WHERE id=?`,
            description: "deleting permission",
            params: [method, path]
        }

        try {

            return await dalUtils.executeQuery(query)

        } catch (error) {
            throw error
        }

    },

    getAll: async () => {

        const query = {
            statement: `Select * from Permission`,
            description: "getting all permissions",
            params: []
        }

        try {
            return await dalUtils.executeQuery(query)

        } catch (error) {
            throw error
        }
    },

    getSpecificById: async (id) => {

        const query = {
            statement: `Select * from Permission where id=?`,
            description: "get permission by id",
            params: [id]
        }

        try {
            return await dalUtils.executeQuery(query)

        } catch (error) {
            throw error
        }
    },

    getSpecific: async (method, path) => {

        const query = {
            statement: `Select * from Permission where method=? and path=?`,
            description: "get permission by id",
            params: [method, path]
        }

        try {
            let result = await dalUtils.executeQuery(query)
            return result.length == 0 ? null : {
                id: result[0].id,
                method: result[0].method,
                path: result[0].path
            }

        } catch (error) {
            throw error
        }
    },



}