const Database = require("../util/database");
const UserRepository = require("../repository/userRepository");
const UserService = require("../service/userservice");

class UserFactory {
    static async createInstance() {
        const db = new Database({ connectionString: 'mongodb://localhost' });
        const dcConnection = await db.connect();
        const userRepository = new UserRepository({ dcConnection });
        const userService = new UserService({ userRepository });

        return userService;

    }
}

module.exports = UserFactory;