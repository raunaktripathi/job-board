const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

//check is user authenticated 
exports.isAuthenticated = async (req, res, next) => {
    const {token} = req.cookies;

    //make sure token exists 

    if (!token) {
        return next(new ErrorResponse('Not authorized to access this route', 401));

    }

    try{
        //verify token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
req.User = await User.findById(decoded.id);

next();

    }catch(error) {
        return next(new ErrorResponse('Not authorized to access this route', 401));

    }
}