import { PrismaClient } from '@prisma/client';
import { registerUserService, getUserByEmailService, UserInterface, getAllUsersService, updateUserService, getUserByIdSevice } from '../controller/user/user-service';
import { hashPassword } from '../../src/utils/password-util';

const prisma: PrismaClient = new PrismaClient();
type UserById = {
    id: string,
    email: string,
    username: string
}

describe('User Service', () => {
    let user: UserInterface;
    let newUser: UserInterface;
    let userBy: UserById;

    // Create a user and initialize the database in a transaction
    beforeAll(async () => {
        user = {
            email: 'user1@proton.me',
            username: 'Proton',
            password: "",
        };

        // Start a Prisma transaction to clear the database
        await prisma.user.deleteMany({})

        // Creates a user with hashed password and and does the percentage calculation
        const hashedPassword = await hashPassword('!QAZXSW@#E');

        user = {
            ...user,
            password: hashedPassword,
        };
    }, 10000);

    // Clears the database and disconnect from Prisma after all tests are done
    afterAll(async () => {
        await prisma.user.deleteMany({});
        await prisma.$disconnect();
    });

    // Register a new user
    it('should register a new user', async () => {
        newUser = await registerUserService(user) as UserInterface;
        expect(newUser).toHaveProperty('email');
        expect(newUser).toHaveProperty('username');
        expect(newUser).not.toHaveProperty('password');
        expect(newUser).toHaveProperty('createdAt');
        expect(newUser).toHaveProperty('id');
    });

    // Get a user by email
    it('should get a user by email', async () => {
        const userByEmail = await getUserByEmailService(user.email);
        expect(userByEmail).toHaveProperty('id');
        expect(userByEmail).toHaveProperty('email');
        expect(userByEmail).toHaveProperty('username');
        expect(userByEmail).toHaveProperty('password');
    });

    // Get all users
    it('should get all users', async () => {
        const users = await getAllUsersService();
        expect(users.length).toBeGreaterThanOrEqual(1);
    });

    // Get a user by id
    it('should get a user by id', async () => {
        const userBy = await getUserByIdSevice(String(newUser.id));
        expect(userBy).toHaveProperty('id');
        expect(userBy).toHaveProperty('email');
    });

    // Update a user
    it('should update user data', async () => {
        const user = await getUserByIdSevice(String(newUser.id));
        const userId = String(user.id);

        const payload = { username: 'NewName' };

        const result = await updateUserService(userId, payload);

        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('username');
    });
},);
