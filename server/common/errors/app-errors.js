'use strict'

const CustomError = require('./custom-error')

module.exports = {
    
    errorExecutingQuery: (failedQuery) => new CustomError(JSON.stringify({
        type: "/db/problems/query-not-executed",
        title: "Problem executing Query",
        detail: `There was a problem executing the query, check if all the data was inserted correctly. The failed Query was the following ${failedQuery}`,
        status: 400 
    })),
    
    duplicateValues: new CustomError(JSON.stringify({
        type: "/db/problems/duplicate-values",
        title: "Duplicate Values",
        detail: "Value already inserted,Please choose another one",
        status: 403 
    })),

    noUsersFound: new CustomError(JSON.stringify({ 
        type: "/db/problems/no-users-found",
        title: "No users found",
        detail: "No users with these parameters are currently on the database",
        status: 404 
    })),

    dbConnection: new CustomError(JSON.stringify({
        type: '/db/problems/no-connection',
        title: 'Database Connection Error',
        detail: 'An error occurred while establishing the connection to the database',
        status: 500
    }))
}