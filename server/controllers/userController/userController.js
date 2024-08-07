
import User from "../../models/User.js";
import { hashPassword, comparePassword } from "../../../helpers/userHelper.js";
import JWT from "jsonwebtoken";

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

//POST LOGIN
export const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
      //validation
      if (!email || !password) {
        return res.status(404).send({
          success: false,
          message: "Invalid email or password",
        });
      }
      //check user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Email is not registerd",
        });
      }
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid Password",
        });
      }
      //token
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({
        success: true,
        message: "login successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          adddress: user.address,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in login",
        error,
      });
    }
  };
  
  //test controller
  export const testController = (req, res) => {
    try {
      res.send("Protected Routes");
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  };
  