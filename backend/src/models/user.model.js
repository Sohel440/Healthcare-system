import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "doctor", "patient"],
      required: true,
    },

    // Only for doctors
    specialization: {
      type: String,
    },
    fees:String,
    avatar:{
        type: String,
        default: 'https://img.freepik.com/premium-vector/avatar-guest-vector-icon-illustration_1304166-97.jpg'
    },
    phone: String,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
