const express = require('express');
const connectDB = require('./config/db');
const app=express();
const dotenv = require('dotenv');
const dns = require('dns');
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/authRoutes');

dns.setServers(['1.1.1.1', '8.8.8.8']);
dotenv.config();
app.use(express.json())
app.use('/api/auth',authRoutes)
app.use("/api/courses",courseRoutes)

app.get("/welcome",(req,res)=>{
    res.send("Welcome to the server!");
});


connectDB()

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});