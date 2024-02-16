"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EmailVerification_Controller_1 = __importDefault(require("../controllers/EmailVerification.Controller"));
const verificationCodeRouter = (0, express_1.Router)();
const verificationCodeController = new EmailVerification_Controller_1.default();
verificationCodeRouter
    .post('/', verificationCodeController.requestEmailVerificationCode);
exports.default = verificationCodeRouter;
