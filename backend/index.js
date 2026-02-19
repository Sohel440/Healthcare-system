import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import errorHandler from './src/middlewares/error.middleware.js';
import connectDB from './src/config/db.js';
import userRouter from './src/routes/user.routes.js';
import cookieParser from 'cookie-parser';
import doctorRouter from './src/routes/doctor.routes.js';
import patientRouter from './src/routes/patient.routes.js';
import adminRouter from './src/routes/admin.routes.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);


const PORT = process.env.PORT|| 3000;


connectDB();

app.use('/api/v1/user', userRouter);
app.use('/api/v1/doctor', doctorRouter);
app.use('/api/v1/patient', patientRouter);
app.use('/api/v1/admin', adminRouter);


app.use(errorHandler); // add global middleware for error handler
app.listen(PORT , ()=>{
    console.log(`Server listen at ${PORT}`);
    
})