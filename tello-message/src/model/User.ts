import mongoose, { Document, Schema } from 'mongoose';

export interface Message extends Document { // schema for the message model
  content: string;
createdAt: Date;
  timestamp: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, required: true , default: Date.now },
  timestamp: { type: Date, default: Date.now },
});

export interface User extends Document { // schema for the user model
  email: string;
  password: string;
}

const UserSchema: Schema<User> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
