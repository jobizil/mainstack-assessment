import { db } from "../../utils/database-server";
import { comparePassword, hashPassword } from "../../utils/password-util";

export type User = {
    id?: string;
    email: string;
}

export interface UserInterface extends User {
    password: string;
    username: string;
}


// Exclude keys from user
function exclude<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const result = { ...obj };
    keys.forEach((key) => delete result[key]);
    return result;
}



// Register a new user
export const registerUserService = async (payload: UserInterface): Promise<User> => {

    const hashedPassword = await hashPassword(payload.password);

    const newUser = await db.user.create({
        data: {
            email: payload.email,
            password: hashedPassword,
            username: payload.username,
        }
    });

    return exclude(newUser, ["password", "updatedAt"]);

};

// Get a user by email
export const getUserByEmailService = async (email: string) => {

    const user = await db.user.findUnique({
        where: { email },
        select: {
            id: true,
            email: true,
            username: true,
            password: true,
            createdAt: false,
            updatedAt: false
        }
    });

    return user
}

// Get a user by id
export const getUserByIdSevice = async (id: string) => {
    const user = await db.user.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            username: true,
            createdAt: false,
            updatedAt: false
        }
    });

    if (!user) {
        throw new Error("Invalid user id.");
    }
    return user

}

// Login a user
export const loginUserService = async (email: string, password: string): Promise<User> => {
    const user = await getUserByEmailService(email);

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }

    return exclude(user, ["password"]) as User;
}


// Get all users
export const getAllUsersService = async (): Promise<UserInterface[]> => {
    const users = await db.user.findMany({

        select: {
            id: true,
            email: true,
            username: true,
            createdAt: false,
            updatedAt: false
        }
    });
    return users.map((user) => { return user }
    ) as UserInterface[];
};

// Update a user's details
export const updateUserService = async (id: string, payload: Partial<UserInterface>) => {

    const user = await
        db.user.update({
            where: { id },
            data: payload,
        })

    const updatedUser = exclude(user, ["password", "updatedAt"]);
    return {
        ...updatedUser,

    }
};
