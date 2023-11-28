"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const user_service_1 = require("../controller/user/user-service");
const validate_user_1 = require("../middleware/validate-user");
const password_util_1 = require("../utils/password-util");
const prisma = new client_1.PrismaClient();
jest.mock('../controller/user/user-service', () => ({
    getUserByIdSevice: jest.fn(),
}));
describe('validateRole', () => {
    let user = {
        id: "6563e96c2a9522fcb9870679",
        email: 'user1@proton.me',
        username: 'Proton',
    };
    beforeAll(async () => {
        await prisma.user.deleteMany({});
        const hashedPassword = await (0, password_util_1.hashPassword)('!QAZXSW@#E');
        user = {
            ...user,
            password: hashedPassword
        };
    });
    afterAll(async () => { await prisma.user.deleteMany({}); });
    it('should handle an invalid user id', async () => {
        user_service_1.getUserByIdSevice.mockResolvedValue(null);
        const result = await (0, validate_user_1.validateRole)('invalidUserId');
        expect(result).toEqual({
            success: false,
            message: 'Invalid user id',
        });
    });
    it('should handle a user with a non-ADMIN role', async () => {
        const nonAdminUser = await prisma.user.create({
            data: {
                email: 'user@proton.me',
                password: 'hashedPassword',
                username: 'Proton'
            },
        });
        user_service_1.getUserByIdSevice.mockResolvedValue(nonAdminUser);
        const result = await (0, validate_user_1.validateRole)(nonAdminUser.id);
        expect(result).toEqual({
            success: false,
            message: 'You are not authorized to perform this action',
        });
    });
    it('should validate a user with the ADMIN role', async () => {
        user_service_1.getUserByIdSevice.mockResolvedValue(user);
        const result = await (0, validate_user_1.validateRole)(user.id);
        expect(result).toEqual({
            success: true,
            message: 'Valid role',
        });
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });
});
//# sourceMappingURL=role.js.map