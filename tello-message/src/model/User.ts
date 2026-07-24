import mongoose, { Document, Schema } from "mongoose";

export interface Message extends Document {// schema for the message
  content: string;
  createdAt: Date;
  timestamp: Date;
}

const MessageSchema: Schema<Message> = new Schema({  // it gives the typesafe for the message schema
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  timestamp: { type: Date, default: Date.now },
});

export interface User extends Document {// schema for the user
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  message: Message[]; // for the messages sent to the user
}

const UserSchema: Schema<User> = new Schema({
  username: { type: String, required: [true, "Username is required"], trim: true, unique: true },
  email: { type: String, required: [true, "Email is required"], unique: true, match: [/\S+@\S+\.\S+/, "Please enter a valid email address"]},
  password: { type: String, required: [true, "Password is required"]},
  verifyCode: { type: String, required: [true, "Verification code is required"] },
  verifyCodeExpiry: { type: Date, required: [true, "Verification code expiry is required"] },
  isVerified: { type: Boolean, default: false },
  isAcceptingMessages: { type: Boolean, default: true },
  message: [MessageSchema], // for the messages sent to the user
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema); // check if the model already exists, if not create a new one

export default UserModel;
