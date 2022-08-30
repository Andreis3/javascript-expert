export default class NotImplementedException extends Error {
    constructor(message) {
        super(`the "${message}" method is not implemented`);
        this.name = this.constructor.name;
    }
}