const ErrorrResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) =>{
let error = {...err};
error.message = err.message;

if(err.name === "CastError"){
    const message = `Ressource not found ${err.value}`;
    error = new ErrorrResponse(message, 404);
}

//mongoose duplicate values
if(err.code === 11000){
    const message = "Duplicate field value entered";
    error = new ErrorrResponse(message, 400);
}

//mongoose validation error
if(err.name === "validationError"){
    const message =Object.values(err.errors).map(val => ' '* val.message);
    error = new ErrorrResponse(message, 400);
}

res.status(error.codeStatus || 500).json({
    sucesss: false,
    error: error.message || "server error"
})
}

module.exports = errorHandler;