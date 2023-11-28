
import { PrismaClient } from '@prisma/client';
import { UserInterface, getUserByIdSevice } from '../controller/user/user-service';
import { validateRole } from '../middleware/validate-user';
import { hashPassword } from '../utils/password-util';


const prisma: PrismaClient = new PrismaClient()

// Mock the getUserByIdSevice
jest.mock('../controller/user/user-service', () => ({
    getUserByIdSevice: jest.fn(),
}));

describe('validateRole', () => {
    let user = {
        id: "6563e96c2a9522fcb9870679",
        email: 'user1@proton.me',
        username: 'Proton',
    } as UserInterface;

    // Create a user and initialize the database in a transaction
    beforeAll(async () => {

        await prisma.user.deleteMany({})


        // Create a user with hashed password
        const hashedPassword = await hashPassword('!QAZXSW@#E');
        user = {
            ...user,
            password: hashedPassword
        }
    });


    // Clear the database and disconnect from Prisma after each test
    afterAll(async () => { await prisma.user.deleteMany({}) });



    it('should handle an invalid user id', async () => {
        // Mock the getUserByIdSevice to return null, indicating an invalid user id
        (getUserByIdSevice as jest.Mock).mockResolvedValue(null);

        const result = await validateRole('invalidUserId');

        expect(result).toEqual({
            success: false,
            message: 'Invalid user id',
        });
    });

    it('should handle a user with a non-ADMIN role', async () => {
        // Create a user with a non-ADMIN role
        const nonAdminUser = await prisma.user.create({
            data: {
                email: 'user@proton.me',
                password: 'hashedPassword',
                username: 'Proton'
            },
        });

        // Mock the getUserByIdSevice to return the non-ADMIN user
        (getUserByIdSevice as jest.Mock).mockResolvedValue(nonAdminUser);

        const result = await validateRole(nonAdminUser.id);

        expect(result).toEqual({
            success: false,
            message: 'You are not authorized to perform this action',
        });
    });

    it('should validate a user with the ADMIN role', async () => {
        (getUserByIdSevice as jest.Mock).mockResolvedValue(user);
        const result = await validateRole(user.id as string);
        expect(result).toEqual({
            success: true,
            message: 'Valid role',
        });
    })


    // Disconnect from Prisma after all tests are done
    afterAll(async () => {
        await prisma.$disconnect();
    });
});