const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt =require("jsonwebtoken")
async function login(req, res) {
    
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            "message": "Invalid input data"
        });
    }
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
        return res.status(400).json({
            "message": "email is not registered please register first"
        });
    }
    const checkPassword = await bcrypt.compare(password, existingUser.password);
    if (!checkPassword) {
        return res.status(400).json({  
            "message": "Invalid password"
        });
    }
    const token = jwt.sign({id:existingUser._id},process.env.SECRET_KEY)
    res.status(200).json({
        "message": "User logged in successfully",
        "Token" : token
    });
}
async function register(req, res) {
    
    const {name,email,password,role}=req.body;
    if(!name || !email || !password || !role){
        return res.status(400).json({
            "message": "Invalid input data"
        })
    }
    const existingUser=await User.findOne({email:email});
    if(existingUser){
        return res.status(400).json({
            "message": "email already exists"
        })
    }
    const encryptedPassword= await bcrypt.hash(password,4);
    const newUser=  await User.create({
        name:name,
        email:email,
        password:encryptedPassword,
        role:role
    })
    res.status(200).json({
        "message": "User registered successfully"
        
    })
}
module.exports = {
    login,
    register
};