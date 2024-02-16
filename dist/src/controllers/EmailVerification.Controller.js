"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmailVerification_Service_1 = __importDefault(require("../services/EmailVerification.Service"));
const User_Service_1 = __importDefault(require("../services/User.Service"));
class EmailVerificationController {
    constructor() {
        this.service = new EmailVerification_Service_1.default();
        this.userService = new User_Service_1.default();
        this.requestEmailVerificationCode = this.requestEmailVerificationCode.bind(this);
    }
    async requestEmailVerificationCode(req, res) {
        const { email } = req.body;
        try {
            const existingEmail = await this.userService.getByEmail(email);
            if (existingEmail) {
                return res.status(409).json({ message: 'User already registered' });
            }
            const sendVerification = await this.service.requestEmailVerificationCode(email);
            return res.status(200).json({ message: 'code has been sent' });
        }
        catch (err) {
            return res.status(500).json({
                message: 'Erro ao gerar código', error: String(err),
            });
        }
    }
}
exports.default = EmailVerificationController;
