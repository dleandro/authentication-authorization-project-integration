'use strict'

module.exports = {
        
    // set a basic response if request was executed succesfully
    setResponse: (res, answer, statusCode) => {
        res.status(statusCode)
        res.statusMessage = 'OK'
        res.headers = {
            'Content-type': 'application/json'
        }
        res.send(answer)
    }

}