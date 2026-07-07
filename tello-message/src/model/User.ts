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



