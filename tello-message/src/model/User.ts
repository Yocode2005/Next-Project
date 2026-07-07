import mongoose, { Document, Schema } from "mongoose";

export interface Message extends Document {
  // schema for the message
  content: string;
  createdAt: Date;
  timestamp: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  timestamp: { type: Date, default: Date.now },
});

export interface User extends Document {
  // schema for the user
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isAcceptingMessages: boolean;
  message: Message[]; // for the messages sent to the user
}

const UserSchema: Schema<User> = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verifyCode: { type: String },
  verifyCodeExpiry: { type: Date },
  isAcceptingMessages: { type: Boolean, default: true },
  message: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});
