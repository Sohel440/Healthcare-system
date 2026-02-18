import { Appointment } from "../models/appointment.model.js";
import { User } from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAllUsers = asyncHandler(async (req , res , next)=>{
     const users = await User.find({role : {$ne : 'admin'}});
     return res.status(200).json(new ApiResponse(200, users));
});

export const getAllAppointments = asyncHandler(async(req , res , next)=>{
    const appointments = await Appointment.find()
      .populate("doctor", "name")
      .populate("patient", "name");

    return res.status(200).json(new ApiResponse(200 , appointments));
});
