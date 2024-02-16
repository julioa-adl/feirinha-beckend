"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VerificationCode_1 = __importDefault(require("../domains/VerificationCode"));
const EmailVerification_Model_1 = __importDefault(require("../models/EmailVerification.Model"));
const email_1 = require("../config-mail/email");
const crypto_1 = __importDefault(require("crypto"));
class EmailVerificationService {
    constructor() {
        this.model = new EmailVerification_Model_1.default();
    }
    createVerificationCodeDomain(verificationCode) {
        if (verificationCode) {
            return new VerificationCode_1.default(verificationCode);
        }
        return null;
    }
    async findOne(email, verificationCode) {
        const emailVerification = await this.model.findOne({ email, verificationCode });
        return emailVerification;
    }
    async requestEmailVerificationCode(email) {
        const verificationCode = crypto_1.default.randomInt(100000, 999999).toString();
        await this.model.create({ email, verificationCode });
        await (0, email_1.sendVerificationCode)(email, verificationCode);
        return { type: null, payload: null };
    }
    async deleteOne(email, verificationCode) {
        const emailVerification = await this.model.deleteOne({ email, verificationCode });
        return { type: null, payload: null };
    }
}
exports.default = EmailVerificationService;
