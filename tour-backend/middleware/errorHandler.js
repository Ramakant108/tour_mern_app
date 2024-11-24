const {constants} = require("../constants")

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    
    switch (statusCode) {
        case constants.VALIDATION_ERROR: 
            res.json({title: "validation failed",message: err.message, stackStrace: err.stack})
            break;
        
        case constants.NOT_FOUND:
            res.json({title: "not found",message: err.message, stackStrace: err.stack})
            break;

        case constants.UNAUTHORIZED:
            res.json({title: "unauthorized",message: err.message, stackStrace: err.stack})
            break;

        case constants.SERVER_ERROR:
            res.json({title: "server error",message: err.message, stackStrace: err.stack})
            break;

        case constants.FORBIEDEN:
            res.json({title: "forbidden",message: err.message, stackStrace: err.stack})
            break;
    
        default:
            console.log("no error. all goood!")
            break;
    }
}

module.exports = errorHandler