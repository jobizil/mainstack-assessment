"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const user_service_1 = require("../controller/user/user-service");
const password_util_1 = require("../../src/utils/password-util");
const prisma = new client_1.PrismaClient();
describe('User Service', () => {
    let user;
    let newUser;
    let userBy;
    beforeAll(async () => {
        user = {
            email: 'user1@proton.me',
            username: 'Proton',
            password: "",
        };
        await prisma.user.deleteMany({});
        const hashedPassword = await (0, password_util_1.hashPassword)('!QAZXSW@#E');
        user = {
            ...user,
            password: hashedPassword,
        };
    }, 10000);
    afterAll(async () => {
        await prisma.user.deleteMany({});
        await prisma.$disconnect();
    });
    it('should register a new user', async () => {
        newUser = await (0, user_service_1.registerUserService)(user);
        expect(newUser).toHaveProperty('email');
        expect(newUser).toHaveProperty('username');
        expect(newUser).not.toHaveProperty('password');
        expect(newUser).toHaveProperty('createdAt');
        expect(newUser).toHaveProperty('id');
    });
    it('should get a user by email', async () => {
        const userByEmail = await (0, user_service_1.getUserByEmailService)(user.email);
        expect(userByEmail).toHaveProperty('id');
        expect(userByEmail).toHaveProperty('email');
        expect(userByEmail).toHaveProperty('username');
        expect(userByEmail).toHaveProperty('password');
    });
    it('should get all users', async () => {
        const users = await (0, user_service_1.getAllUsersService)();
        expect(users.length).toBeGreaterThanOrEqual(1);
    });
    it('should get a user by id', async () => {
        const userBy = await (0, user_service_1.getUserByIdSevice)(String(newUser.id));
        expect(userBy).toHaveProperty('id');
        expect(userBy).toHaveProperty('email');
    });
    it('should update user data', async () => {
        const user = await (0, user_service_1.getUserByIdSevice)(String(newUser.id));
        const userId = String(user.id);
        const payload = { username: 'NewName' };
        const result = await (0, user_service_1.updateUserService)(userId, payload);
        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('username');
    });
});
//# sourceMappingURL=user.test.js.map