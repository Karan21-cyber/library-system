"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    /**
     * Constructor for creating a new instance of the class.
     *
     * @param {string} message - the message for the instance
     * @param {number} statusCode - the status code for the instance
     * @return {void}
     */
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.default = HttpException;
