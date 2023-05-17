import { Request, Response } from "express";
import { createUserToDB, getAdminUserFromDB, getSingleUserToDB, getUsersToDB } from "./user.service";

// Create User
export const createUser = async (req: Request, res: Response) => {
    const data = req.body;
    const user = await createUserToDB(data);
    res.status(200).json({
        status: 'success',
        data: user
    })
}

// get All Users
export const getUsers = async (req: Request, res: Response) => {
    const user = await getUsersToDB();
    res.status(200).json({
        status: 'success',
        data: user
    })
}

// Single User by Id
export const getSingleUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await getSingleUserToDB(id);
    res.status(200).json({
        status: 'success',
        data: user
    })
}

export const getAdminUsers = async (req: Request, res: Response) => {
    const admin = await getAdminUserFromDB();
    res.status(200).json({
        status: 'success',
        data: admin
    })
}

// Call Pattern
// Route => Controller => Service => Model