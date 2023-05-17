import { getAdminUsers } from './user.controller';
import { HydratedDocument, Model } from "mongoose";

// User Interface
export interface IUser {
    id: string;
    role: 'student';
    password: string;
    name: {
        firstName: string;
        middleName?: string;
        lastName: string;
    };
    dateOfBirth?: string;
    gender: 'male'| 'female';
    email?: string;
    mobileNumber: string;
    emergencyContact?: string;
    address: {
        present: string;
        permanent: string;
    };
}


// Custom Methods Interface
export interface IUserMethods {
    fullName(): string;
}

export interface UserModel extends Model<IUser, {}, IUserMethods> {
    getAdminUsers(): Promise<HydratedDocument<IUser, IUserMethods>>;
}