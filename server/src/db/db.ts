import mongoose from "mongoose";
import { DB_NAME } from "./constant";

const connectDB = async (): Promise<void> => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`MongoDB connected Successfully || host :- ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(`MongoDB connection failed due to ${error}`)
        return;
    }
}

export { connectDB }