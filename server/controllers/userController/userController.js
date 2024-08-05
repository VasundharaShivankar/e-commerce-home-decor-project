
import User from "../../models/User.js";
import { hashPassword } from "../../../helpers/userHelper.js";

export const registerController= async(req,res)=>
{
    try{
        const {name,email,password,dob,phone,address}=req.body;

        //validation
        if(!name || !email || !dob || !password || !phone || !address){
            return res.status(400).json({msg:"Please fill in all fields"})
        }

        //existing user
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).send({
                success:true,
                message:"Email already exists, please login"
            })
        }
        //register user
        const hashedPassword=await hashPassword(password)

        //save user
        const user=new User({
            name, 
            email,
            dob,
            phone,
            address,
            password:hashedPassword
        }).save();

        res.status(201).json({
            success:true,
            message:"User created successfully",
            user
    });
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Registration",
            error:error.message
        })
    }
}