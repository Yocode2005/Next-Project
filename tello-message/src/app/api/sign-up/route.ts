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

      const existingUserVerifiedByEmail = await UserModel.findOne({
        email: email,
        isVerified: true,
      });
      if(existingUserVerifiedByEmail){
       
      }
      else{
        const hasedPassword = await bcrypt.hash(password, 10);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1); // Set expiry time to 1 hour from now
      }

      } catch (error) {
    console.error('Error registering user:', error);
    return  Response.json({ success: false, message: 'Failed to register user' }), {
      status: 500,
      message: 'Failed to register user',
    };
  }
}