import mongoose, { Document, Schema } from 'mongoose';

export interface Message extends Document {
  content: string;
  timestamp: Date;
}

