'use strict'

const moment = require('moment')


module.exports = function(dalUtils, errors) {

    const userHistoryDal = require('../user-history/user-history-dal') (dalUtils, errors)

    return {
        
        // TODO: add userhistory
        addList: async (user, list, start_date, end_date, updater) => {
            
            var result 
            
            const query = {
                statement: `INSERT INTO Lists(user_id,list,start_date,end_date,updater) VALUES (?,?,?,?,?);`,
                description: "adding list",
                params: [user, list, start_date, end_date, updater]
            }
            
            try {
                
                result = await dalUtils.executeQuery(query)             
                
            } catch (error) {
                throw error
            }
            
            return result
            
        },
        
        // TODO: add userhistory
        deleteList: async (listId) => {
            
            const query = {
                statement: `DELETE FROM Lists WHERE id=?`,
                description: "deleting list",
                params: [listId]
            }

            var result 
            
            try {
                
                result = await dalUtils.executeQuery(query)             
                
            } catch (error) {
                throw error
            }

            return result
            
        },
        
        getLists: async () => {
            
            const query = {
                statement: `Select * from List`,
                description: "getting all lists",
                params: [user,list,start_date,end_date,updater]
            }
            
            try {
                return await dalUtils.executeQuery(query)             
                
            } catch (error) {
                throw error
            }
            
            
        },
        getActiveLists: async () => {
            
            const query = {
                statement: `Select * from List where active=1 AND end_date<${moment().format()}`,
                description: "getting active lists",
                params: []
            }
            
            try {
                return await dalUtils.executeQuery(query)             
                
            } catch (error) {
                throw error
            }
            
            
        },
        getUserActiveList: async (userId) => {
            
            const query = {
                statement: `Select * from List where user_id=? AND active=1 AND end_date<${moment().format()}`,
                description: "getting user's active lists",
                params: [userId]
            }
            
            try {
                return await dalUtils.executeQuery(query)             
                
            } catch (error) {
                throw error
            }
            
            
        }
    }
    
}