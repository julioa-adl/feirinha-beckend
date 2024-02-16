"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AbstractODM_1 = __importDefault(require("./AbstractODM"));
class EmailVerificationModel extends AbstractODM_1.default {
    constructor() {
        const schema = new mongoose_1.Schema({
            email: { type: String, required: true },
            verificationCode: { type: String, required: true },
            createdAt: { type: Date, default: Date.now, expires: "10m" },
        });
        super(schema, 'EmailVerification');
    }
}
exports.default = EmailVerificationModel;
