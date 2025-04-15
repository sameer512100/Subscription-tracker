import mongoose from "mongoose";
import {DB_URI,NODE_ENV} from '../config/env.js';

if(!DB_URI){
    throw new Error("please define the MONGODB_URI environment variable inside .env.<development/production>local");
}

// connect to MONGODB

const connectToDatabse = async()=>{
    try {
        await mongoose.connect(DB_URI);
        console.log(`MongoDB connected successfully in ${NODE_ENV} mode`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit process with failure
    }   
}

export default connectToDatabse;