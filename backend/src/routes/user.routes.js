import express from 'express';
import { userProfile, updateUser, userLogin, userRegister, logout } from '../controllers/user.controller.js';
import {roleBasedAccess, verifyUser} from '../middlewares/verifyUser.middleware.js'
const userRouter = express.Router();

userRouter.route('/register').post(userRegister);
userRouter.route('/login').post(userLogin);
userRouter.route('/update').put(verifyUser, roleBasedAccess('doctor'),  updateUser);
userRouter.route('/profile').get(verifyUser,  userProfile);
userRouter.route('/logout').get(logout);

export default userRouter;