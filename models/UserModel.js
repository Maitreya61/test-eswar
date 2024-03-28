const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    }
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;