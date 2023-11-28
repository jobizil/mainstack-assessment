"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_server_1 = require("../src/utils/database-server");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const adminUser = [{
        email: "admin@proton.me",
        username: "admin",
        password: bcryptjs_1.default.hashSync('!QAZXSW@#E', 10)
    }];
async function seedData() {
    for (const admin of adminUser) {
        await database_server_1.db.user.create({
            data: {
                ...admin,
            },
        });
    }
}
seedData()
    .catch((e) => {
    console.error(`Error seeding database: ${e}`);
    process.exit(1);
})
    .finally(async () => {
    console.log('Seeding finished!');
    await database_server_1.db.$disconnect();
});
//# sourceMappingURL=seed.js.map