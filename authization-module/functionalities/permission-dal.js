'use strict'


const dalUtils = require('../common/util/dal-utils')
module.exports = {
        addPermission: async (method, path, description) => {
            
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
        
        deletePermission: async (method, path) => {
            
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
        
        getPermissions :async () => {
            
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
        getPermissionById :async (method,path) => {
            
            const query = {
                statement: `Select * from Permission where id=?`,
                description: "get permission by id",
                params: [method,path]
            }
            
            try {
                return await dalUtils.executeQuery(query)             
                
            } catch (error) {
                throw error
            }
        },
        
        
    }