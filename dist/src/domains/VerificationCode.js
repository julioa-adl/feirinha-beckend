"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VerificationCode {
    constructor(verificationCode) {
        this.id = verificationCode.id;
        this.email = verificationCode.email;
        this.verificationCode = verificationCode.verificationCode;
        this.createdAt = verificationCode.createdAt;
    }
}
exports.default = VerificationCode;
