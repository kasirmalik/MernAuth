import mongoose from "mongoose";

export const connectDb = async () => {
  if (!process.env.MONGODB_URI || typeof process.env.MONGODB_URI !== 'string') {
    throw new Error('MONGODB_URI environment variable is not set or is not a string');
  }

  try {
    console.log("mongo_uri", process.env.MONGODB_URI)
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("ERRor connection to MongoDb", error.message)
    process.exit(1)
  }
}