import express from 'express';
import { connectDb } from './db/connectDb';


const app = express();

app.get('/', async (req,res)=>{
    res.send("hello world123")
})


app.listen(3000,()=>{
    connectDb()
    console.log(`server is running on port 3000`);
})

// uzx2MLoQ7nTcvtLZ