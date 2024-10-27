import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified:{
        type:Boolean,
        default: false


    },
    resetPasswordToken:String,
    resetPasswordExpiresAt:Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date

    
},{timestamps:true});

export const User =mongoose.model('User',userSchema)