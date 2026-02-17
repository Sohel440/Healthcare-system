import express from 'express';
import dotenv from 'dotenv';
import errorHandler from './src/middlewares/error.middleware.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const PORT = process.env.PORT|| 3000;



app.use(errorHandler); // add global middleware for error handler
app.listen(PORT , ()=>{
    console.log(`Server listen at ${PORT}`);
    
})