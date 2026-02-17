import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.DB);
        console.log('MongoDb connected!')
    } catch (error) {
       console.log("MongoDb error : ", error) 
    }
}

export default connectDB;
