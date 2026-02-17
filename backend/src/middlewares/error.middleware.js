import ApiError from "../utils/ApiError.js";

const errorHandler = (err , req , res , next)=>{
    let error = err;

    if(!(error instanceof ApiError)){
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal server error";

        error = new ApiError(statusCode , message , [] , err.stack)
    }

    res.status(error.statusCode).json({
        success : false,
        message: error.message,
        errors: error.errors,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    })
}

export default errorHandler;