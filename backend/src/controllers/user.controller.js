import asyncHandler from "../utils/asyncHandler.js";
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import bcrypt from 'bcryptjs';
import {User} from '../models/user.model.js'
import jwt from 'jsonwebtoken';

//***user register */
export const userRegister = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const existingUser = await User.findOne({ email });
  console.log(name, email, password, role );

  if (existingUser) {
     throw new ApiError(400,'User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    return res.status(201).json( new ApiResponse(201, user, 'Registration successful'));

});


/***user login*/
export const userLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, "Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(401, "Invalid email or password");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );


  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false, 
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Login successful"));
});


/*update user*/
export const updateUser = asyncHandler(async (req , res , next)=>{
    const {description, fees , specialization} = req.body;
    let special = specialization.toLowerCase();
    const user = await User.findByIdAndUpdate(req.user._id , {description, fees , specialization:special},{new: true});
    return res.status(200).json(new ApiResponse(200 , user , 'User updated'));
})

/* user profile */
export const userProfile = asyncHandler(async (req , res , next)=>{
    const user = req.user;
    return res.status(200).json(new ApiResponse(200 , user , 'User updated'));
})

/* logout */
export const logout = asyncHandler (async (req, res, next) => {
  try {
    return res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json( new ApiResponse(200 , {}, "Logout successful"));
  } catch (error) {
    next(error);
  }
});
