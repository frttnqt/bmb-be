import { Schema, Document } from "mongoose";
import * as mongoose from "mongoose";

export interface IAdmin {
  userName: string;
  password: string;
}

export interface AdminModel extends IAdmin, Document {
}

const AdminSchema: Schema = new Schema({
  userName: { type: String, required: true, unique: true, lowercase: true },
  password: {
    type: String,
    required: true
  }
});

export const Admin = mongoose.model<AdminModel>('Admin', AdminSchema);
