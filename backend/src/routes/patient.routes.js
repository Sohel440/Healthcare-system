import express from "express";
import {
  roleBasedAccess,
  verifyUser,
} from "../middlewares/verifyUser.middleware.js";
import {
  bookAppointment,
  cancelAppointment,
  getAvailableDates,
  getAvailableSlots,
  getDoctors,
  getMyAppointments,
} from "../controllers/patient.controller.js";

const patientRouter = express.Router();

patientRouter.route("/all").get(getDoctors);
patientRouter.route("/:id/available-dates").get(getAvailableDates);
patientRouter.route("/:id/available-slots").get(getAvailableSlots);

patientRouter
  .route("/book")
  .post(verifyUser, roleBasedAccess("patient"), bookAppointment);

patientRouter
  .route("/appointments")
  .get(verifyUser, roleBasedAccess("patient"), getMyAppointments);

patientRouter
  .route("/appointments/:id/cancel")
  .patch(verifyUser, roleBasedAccess("patient"), cancelAppointment);


export default patientRouter;
