import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

console.log(process.env.MONGODB_URI); // Should print the MongoDB URI