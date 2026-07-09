import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

import {sendVerificationEmail} from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect();
  try {
    const { username, email, password } = await request.json(); 
    const existingUserVerifiedByUsername = await UserModel.findOne({
        username: username,
        isVerified: true,
      });
      if(existingUserVerifiedByUsername){
        return Response.json({ success: false, message: 'Username already exists' }), {
          status: 400,
          message: 'Username already exists',
        };
      }

      const existingUserByEmail = await UserModel.findOne({email});
      const verifyCode = Math.floor(100000 + Math.random() * 900000).toString(); // generate a 6-digit OTP
      if(existingUserByEmail){
        if(existingUserByEmail.isVerified){
          return Response.json({ success: false, message: "User with this email already exists" }), {
            status: 400,
            message: 'Email already exists',
          };
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            existingUserByEmail.password = hashedPassword;
            existingUserByEmail.verifyCode = verifyCode;
            existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000); 
            await existingUserByEmail.save();
        }
       
      }
      else{
        const hasedPassword = await bcrypt.hash(password, 10);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1); // Set expiry time to 1 hour from now 

       const newUser =  new UserModel({
             username,
              email,
              password: hasedPassword,
              verifyCode: verifyCode,
              verifyCodeExpiry: expiryDate,
              isVerified: false,
              isAcceptingMessages: true,
              message:[]
        })
        await newUser.save();
      }

      // Send verification email
      const emailResponse = await sendVerificationEmail(email, username, verifyCode);

      if(!emailResponse.success){
        return Response.json({ success: false, message: emailResponse.message }), {
          status: 500,
          message: 'Failed to send verification email',
        };
      }

      return Response.json({ success: true, message: "User registered successfully. Please verify your email"}), {
          status: 200,
          message: 'Verification email sent successfully',
        };

      } catch (error) {
    console.error('Error registering user:', error);
    return  Response.json({ success: false, message: 'Failed to register user' }), {
      status: 500,
      message: 'Failed to register user',
    };
  }
}