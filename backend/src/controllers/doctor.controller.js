import { User } from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {DoctorAvailability} from '../models/doctorAvailable.model.js'
import {Appointment} from '../models/appointment.model.js'
import ApiError from "../utils/ApiError.js";


export const markAvailability = asyncHandler(async (req , res , next)=>{
    const doctorId = req.user._id;
    const { date, isAvailable } = req.body;
    const formattedDate = new Date(date);
    formattedDate.setUTCHours(0, 0, 0, 0);

    const availability = await DoctorAvailability.findOneAndUpdate(
      { doctor: doctorId, date: formattedDate },
      { isAvailable },
      { upsert: true, new: true },
    );

    return res.status(201).json(new ApiResponse(201, availability , "Date created"))
});

export const getDoctorAppointments = asyncHandler(async (req , res , next)=>{
    const appointments = await Appointment.find({
      doctor: req.user.id,
    }).populate("patient", "name email");

    return res.status(200).json(new ApiResponse(200 , appointments));
})


export const updateAppointmentStatus = asyncHandler(async (req , res , next)=>{
     const { status } = req.body;
     const appointment = await Appointment.findById(req.params.id);

     if (!appointment) throw new ApiError(404 ,"Appointment not found" );

    appointment.status = status;
    await appointment.save();

    return res.status(200).json(new ApiResponse(200, appointment , "Successfully updated"));
})
