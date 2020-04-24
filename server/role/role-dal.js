'use strict'

module.exports =  function(dalUtils, errors) {
    
    return {
        
        addRole: async (role) => {
            
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

        getRoleById: async function getRoleById(roleId) {

            const query = {
                statement: `Select * from Roles where id= ?`,
                description: "getting role by id",
                params: [roleId]
            }
        
            try {
        
                return await dalUtils.executeQuery(query)
        
            } catch (error) {
                throw error
            }
        },
        
        deleteRole: async (roleId)=> {
            
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
        getRoles: async () => {

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
}
