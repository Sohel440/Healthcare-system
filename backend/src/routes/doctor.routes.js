import express from 'express';
import {roleBasedAccess, verifyUser} from '../middlewares/verifyUser.middleware.js'
import {  getDoctorAppointments, markAvailability, updateAppointmentStatus } from '../controllers/doctor.controller.js';
const doctorRouter = express.Router();


doctorRouter.route('/available').post( verifyUser,roleBasedAccess('doctor'),markAvailability);
doctorRouter.route('/appointments').get( verifyUser,roleBasedAccess('doctor'),getDoctorAppointments);
doctorRouter.route('/appointments/:id').patch( verifyUser,roleBasedAccess('doctor'),updateAppointmentStatus);



export default doctorRouter;