class UserRepository {
    constructor({ dcConnection }) {
        this.dcConnection = dcConnection;
    }

    async find(query) {
        return this.dcConnection.find(query);
    }
}

module.exports = UserRepository;