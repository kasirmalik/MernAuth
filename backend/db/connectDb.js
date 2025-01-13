import mongoose from "mongoose";


export const connectDb = async () => {
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI);
       console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch(error) {
        console.log("ERRor connection to MongoDb", error.message)
        process.exit(1) 
    }
}