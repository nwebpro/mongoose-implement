import { IUser } from "./user.interface";
import User from "./user.model";

// Careate User to Database
export const createUserToDB = async (payload: IUser): Promise<IUser> => {
    const user = new User(payload) // User -> Class User -> Instance
    await user.save() // [.save()] -> Mongoose Method -> aitay holo instance er method
    // user.fullName() // Custom instance methods
    return user
}
// All User Get from Database
export const getUsersToDB =async (): Promise<IUser[]> => {
    const users = await User.find()
    return users
}


// Get Single User by ID by Database
export const getSingleUserToDB = async (payload: string): Promise<IUser | null> => {
    const user = await User.findOne({ id: payload })
    return user
}

export const getAdminUserFromDB = async () => {
    const admins = await User.getAdminUsers()
    return admins
}


// All Student User Get from Database
// export const getStudentUsersFromDB = async (payload: string): Promise<IUser | null> => {
    
// }

// Call Pattern
// Route => Controller => Service => Model

// get largest number in array with foreach loop
