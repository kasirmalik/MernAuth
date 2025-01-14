import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './db/connectDb.js';

dotenv.config();
const app = express();

app.get('/', async (req,res)=>{
    res.send("hello world123")
})



connectDb()
app.listen(3000,()=>{
    
    console.log(`server is running on port 3000`);
})

// uzx2MLoQ7nTcvtLZ