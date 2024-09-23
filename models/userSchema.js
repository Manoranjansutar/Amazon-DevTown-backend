import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required: true,
        enum:['admin','user']
    },
    cartData:{
        type:Object,
        default:{}
    },

},
{minimize:false},

{
    timestamps:true
})

const userModel =  mongoose.model('User',userSchema) || mongoose.model('User')

export default userModel