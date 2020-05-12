'use strict'


const dalUtils = require('../common/util/dal-utils')
module.exports = {
        
        create: async (role) => {
            
            const query = {
                statement: `INSERT INTO Roles(role) VALUES (?);`,
                description: "adding role",
                params: [role]
            }

            try {
                return await dalUtils.executeQuery(query)          
        
            } catch (error) {
                throw error
            }
            
            
        },

        getSpecificById: async function getRoleById(roleId) {

            const query = {
                statement: `Select * from Roles where id= ?`,
                description: "getting role by id",
                params: [roleId]
            }
        
            try {
        
                let result=await dalUtils.executeQuery(query)
                return result.length==0?null:{
                    id:result[0].id,
                    role:result[0].role,
                    parent_role:result[0].parent_role
                }
        
            } catch (error) {
                throw error
            }
        },
        
        delete: async (roleId)=> {
            
            const query = {
                statement: `DELETE FROM Roles WHERE id = ?`,
                description: "deleting role",
                params: [roleId]
            }

            try {
        
                return await dalUtils.executeQuery(query)
        
            } catch (err) {
           
                throw err
           
            }
        },

        getAll: async () => {

            const query = {
                statement: `Select * from Roles`,
                description: "getting all roles",
                params: []
            }
            
            try {
        
                return await dalUtils.executeQuery(query)
        
            } catch (err) {
           
                throw err
           
            }
        }
    }
