'use strict'


module.exports =  function(dalUtils, errors) {
    
    return {

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
            
            
        }
    }
    
}
