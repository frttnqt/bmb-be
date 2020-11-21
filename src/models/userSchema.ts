import mongoose, { Schema, Document } from 'mongoose';

export interface IUser {
	address: string;
	name: string;
	vacancy: string;
	additionalInfo: string;
}

export interface IUserWithCoordinates extends IUser {
	location: {
		type: string;
		coordinates: number[];
	};
}

export interface UserModel extends IUser, Document {
	location: {
		type: string;
		coordinates: number[];
	};
}

const UserSchema: Schema = new Schema({
	address: { type: String, required: true },
	name: { type: String, required: true },
	vacancy: { type: String, required: true },
	location: {
		type: {
			type: String,
			enum: ['Point'],
			required: true
		},
		coordinates: {
			type: [Number],
			required: true
		}
	},
	additionalInfo: { type: String }
});

export const User = mongoose.model<UserModel>('User', UserSchema);
