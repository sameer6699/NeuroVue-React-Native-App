import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  jobRole: string;
  experienceLevel: string;
  interviewFocus: string[];
  profileImage?: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
    },
    jobRole: {
      type: String,
      default: 'Not Specified',
      trim: true,
    },
    experienceLevel: {
      type: String,
      default: 'Fresher',
      trim: true,
    },
    interviewFocus: {
      type: [String],
      default: ['General'],
    },
    profileImage: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', UserSchema); 