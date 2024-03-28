const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/UserModel");


exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    const userExists = await UserModel.findOne({ email });

    if(userExists){
        return res.json({Error:"User Already Exists"});
    }

    
    const hashedPassword = await bcrypt.hash(password,10);

    
    const user = await UserModel.create({
        username,
        email,
        password: hashedPassword
    })

    if(user){
        res.json('Registered')
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({username});

    
    if(!user){
       return res.json("User Doesn't Exist");
    }

    const isValidPassword = bcrypt.compare(password, user.password);

    if(!isValidPassword){
        return res.json({Error:"Username or Password Doesn't Match"});
    }
    
    const token = jwt.sign({ username: user.username, email: user.email }, 'secretkey');
    res.status(200).json({ token });
};
