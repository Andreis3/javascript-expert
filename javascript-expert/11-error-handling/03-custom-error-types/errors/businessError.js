import BaseError from "./base/baseError.js";

export default class BusinessError extends BaseError {
  constructor({ errorMessages }) {
    super({ message: errorMessages, name: "BusinessError" });
  }
}