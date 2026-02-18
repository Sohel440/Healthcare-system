import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js'
import {User} from '../models/user.model.js'

/*********************** verify user middleware ******************************* */
export const verifyUser = asyncHandler(async(req, res , next)=>{

    const {token} = req.cookies;
    if(!token){
        throw new ApiError(400 , "User not authenticated");
    }
    const decode = await jwt.verify(token , process.env.JWT_SECRET);
    if(!decode){
        throw new ApiError(400 , "User not authenticated");
    }

    const {id} = decode;

    req.user = await User.findById(id);
    next();

});

export const roleBasedAccess = (...role)=>{
    return (req  , res , next)=>{
        if (!role.includes(req.user.role)) {
          throw new ApiError(400, "User not authorized");
        }
        next();
    }
}