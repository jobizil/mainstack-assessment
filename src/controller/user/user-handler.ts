import { Request, Response } from "express";
import { generateToken } from "../../utils/jwt-utils";
import { UserInterface, getUserByEmailService, getUserByIdSevice, loginUserService, registerUserService, updateUserService } from "./user-service";


// Register a new user
export const registerUserController = async (req: Request, res: Response) => {

    try {
        const { email, password, username } = req.body as UserInterface

        const userExist = await getUserByEmailService(email);

        if (userExist) return res.status(400).json({
            success: false,
            message: "Sorry, this email has already been taken."
        });



        const newUser = await registerUserService({
            email,
            password,
            username
        });


        // Generate token
        const token = generateToken({ id: newUser.id });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                ...newUser,
                token
            }
        });
    } catch (error: any) {

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }

}

// Login a user
export const loginUserController = async (req: Request, res: Response) => {

    try {

        const { email, password } = req.body;

        const user = await loginUserService(email, password);

        if (!user) return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        });

        // Generate token
        const token = generateToken({ id: user.id });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                ...user,
                token
            }
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}


// Update user details
export const updateUserController = async (req: Request, res: Response) => {

    try {
        const id = res.locals.user.id;
        const data = req.body as UserInterface

        const user = await getUserByIdSevice(id);

        if (!user) return res.status(404).json({
            success: false,
            message: "Invalid user id"
        });

        const payload = { username: data.username || user.username }


        const updatedUser = await updateUserService(id, payload);


        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}