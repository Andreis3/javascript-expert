import NotImplementedException from "../notImplementatedException.mjs";

export default class ViewFactory {
    createTable() {
        throw new NotImplementedException(this.createTable.name);
    }
}