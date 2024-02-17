import express from 'express';
import mongoose from 'mongoose';
import MdataRoute from './routes/MdataRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());

//MIDDLEWARE FOR HANDLING CORS POLICY
//1. Allow All Origins
app.use(cors());

//2. Allow Specific origin

// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type']
// }))
app.get("/",(request,response) => {
    console.log(request);
    return response.status(234).send("Welcome to MERN Stack");
  })
  
  
app.use('/marketdata',MdataRoute) 

mongoose
.connect("mongodb+srv://rachita31:Micro1234@mernapp.r9yo94d.mongodb.net/marketdata?retryWrites=true&w=majority")
.then(()=>{
    console.log("App is connected to database");
    app.listen(5555,()=>{
        console.log("App is listening to port");
    })
})
.catch((error) => {
    console.log(error);
})