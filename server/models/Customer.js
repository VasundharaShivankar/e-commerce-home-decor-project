import mongoose, { Schema, model } from 'mongoose'

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date,
        required: true,
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
},
    {
        timestamps: true,

    });

const Customer = mongoose.model('users', userSchema);

export default Customer;