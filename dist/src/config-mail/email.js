"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationCode = void 0;
const nodemailer_1 = require("nodemailer");
const transporter = (0, nodemailer_1.createTransport)({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "feirinhadagente00@gmail.com",
        pass: process.env.SMTP_PASSWORD,
    },
});
async function sendVerificationCode(toEmail, verificationCode) {
    await transporter.sendMail({
        from: "Feirinha da Gente <noreply@feirinhadagente.com>",
        to: toEmail,
        subject: "Your verification code",
        html: `<p>This is your verification code. It will expire in 10 minutes.</p><strong>${verificationCode}</strong>`
    });
}
exports.sendVerificationCode = sendVerificationCode;
