import { getUserByIdSevice } from "../controller/user/user-service";

// Deserialize user
export const validateRole = async (id: string) => {
    const user = await getUserByIdSevice(id);

    if (!user) return {
        success: false,
        message: "Invalid user id"
    }

    return {
        success: true,
        message: "Valid user id"
    }

};
