const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId:{type:String},
    name:{type:String},
    email:{type:String,required:true},
    image:{type:String},
    password:{type:Number}
},{timestamps:true})

const UserModel = mongoose.model("user",userSchema)



module.exports = UserModel