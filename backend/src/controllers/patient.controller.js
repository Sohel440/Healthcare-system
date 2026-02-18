import { User } from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {DoctorAvailability} from '../models/doctorAvailable.model.js'
import {Appointment} from '../models/appointment.model.js'
import ApiError from "../utils/ApiError.js";

export const getDoctors = asyncHandler(async (req, res, next) => {
  const { special, search } = req.query;

  let filter = { role: "doctor" };

  if (special) {
    filter.specialization = special;
  }

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  const doctors = await User.find(filter);

  return res
    .status(200)
    .json(new ApiResponse(200, doctors, "Doctors fetched successfully"));
});

export const getAvailableDates = asyncHandler(async(req , res , next)=>{
    const doctorId = req.params.id;

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const dates = await DoctorAvailability.find({
      doctor: doctorId,
      isAvailable: true,
      date: { $gte: today },
    }).select("date");

    return res.status(200).json(new ApiResponse(200 , dates));

})

export const getAvailableSlots = asyncHandler(async (req, res, next) => {
    const doctorId = req.params.id;
    const { date } = req.query;

    const formattedDate = new Date(date);
    formattedDate.setUTCHours(0, 0, 0, 0);

    const availability = await DoctorAvailability.findOne({
      doctor: doctorId,
      date: formattedDate,
      isAvailable: true,
    });

    if (!availability)
      return res.json({ success: true, availableSlots: [] });

    const allSlots = [
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
      "4:00 PM",
      "5:00 PM",
    ];

    const booked = await Appointment.find({
      doctor: doctorId,
      date: formattedDate,
      status: { $in: ["Pending", "Approved"] },
    });

    const bookedSlots = booked.map((a) => a.timeSlot);

    const availableSlots = allSlots.filter(
      (slot) => !bookedSlots.includes(slot)
    );

    res.status(200).json( new ApiResponse(200, availableSlots));
 
});

export const bookAppointment = asyncHandler(async(req, res ,next)=>{
    
    const {doctorId, date, timeSlot } = req.body;

    const formattedDate = new Date(date);
    formattedDate.setUTCHours(0, 0, 0, 0);

    const existing = await Appointment.findOne({
      doctor: doctorId,
      date: formattedDate,
      timeSlot,
      status: { $in: ["Pending", "Approved"] },
    });

    if (existing) throw new ApiError(400 ,  "Slot already booked");
    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      date: formattedDate,
      timeSlot,
    });

    return res.status(201).json(new ApiResponse(201 , appointment , "Appointment created" ));

})

export const getMyAppointments = asyncHandler(async (req, res, next) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user.id,
    }).populate("doctor", "name specialization");

    return res.status(200).json(new ApiResponse(200 , appointments));
  } catch (error) {
    next(error);
  }
});

export const cancelAppointment = asyncHandler(async (req, res, next) => {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) throw new ApiError(404 ,  "Not found");

    if (appointment.status !== "Pending") throw new ApiError(404 ,  "Cannot cancel");
    appointment.status = "Cancelled";
    await appointment.save();
    return res.status(200).json(new ApiResponse(200 , appointment, "appointment cancel"));
      //return res.status(400).json({ message: "Cannot cancel" });
    //   return res.status(404).json({ message: "Not found" });
})