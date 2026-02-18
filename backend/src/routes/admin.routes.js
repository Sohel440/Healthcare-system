import express from 'express';
import { roleBasedAccess, verifyUser } from '../middlewares/verifyUser.middleware.js';
import { getAllAppointments, getAllUsers } from '../controllers/admin.controller.js';

const adminRouter = express.Router();

adminRouter.route('/users').get(verifyUser, roleBasedAccess('admin'), getAllUsers);
adminRouter.route('/appointments').get(verifyUser, roleBasedAccess('admin'), getAllAppointments);

export default adminRouter;
