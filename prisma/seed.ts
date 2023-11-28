import { db } from "../src/utils/database-server";

import bcrypt from 'bcryptjs';

const adminUser = [{
    email: "admin@proton.me",
    username: "admin",
    password: bcrypt.hashSync('!QAZXSW@#E', 10)
}]

// Create a function that seeds the database
async function seedData() {
    for (const admin of adminUser) {
        await db.user.create({
            data: {
                ...admin,
            },
        });

    }

}


// Execute the `seedData` function

seedData()
    .catch((e) => {
        console.error(`Error seeding database: ${e}`);
        process.exit(1);
    })
    .finally(async () => {
        console.log('Seeding finished!');
        await db.$disconnect();
    });