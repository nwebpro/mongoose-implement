import { Model, Schema, model } from "mongoose"
import { IUser, IUserMethods, UserModel } from "./user.interface"

// Custom Methods Create
// type UserModel = Model<IUser, {}, IUserMethods>

// Schema
const userSchema = new Schema<IUser, UserModel, IUserMethods>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        firstName: {
            type: String,
            required: true,
        },
        middleName: {
            type: String,
            required: false,
        },
        lastName: {
            type: String,
            required: true,
        }
    },
    dateOfBirth: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    emergencyContact: {
        type: String,
        required: false,
    },
    address: {
        present: {
            type: String,
            required: true,
        },
        permanent: {
            type: String,
            required: true,
        }
    }
})

// Custom Methods Schema
userSchema.method('fullName', function fullName() {
    return this.name.firstName + ' ' + this.name.lastName;
})

userSchema.static('getAdminUsers', async function getAdminUsers() {
    const admins = await this.find({ role: 'admin' })
    return admins
})

// Model
const User = model<IUser, UserModel>('User', userSchema)

export default User

// Call Pattern
// Route => Controller => Service => Model