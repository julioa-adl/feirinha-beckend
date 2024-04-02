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
        html: `
        <div style="padding:20px 0px; background-color: #e1e1ef; display: flex; justify-content: center; align-items: center; height: 100%; width: 100%;">
            <div style="background-color: #ffffff; padding:8px; border-radius: 10px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
                <h2>Olá! Seja bem vindo ao Feirinha da Gente <3</h2>
                <p>Este é seu código de verificação de Email <br/>
                copie e cole na página de cadastro para realizar a validação! <br/>
                Este código irá expirar em 10 min!</p>
                <strong>${verificationCode}</strong>
                <p>Em caso de dúvidas, basta responder este Email.
                Obrigado!</p>
            </div>
        </div>
        `
    });
}
exports.sendVerificationCode = sendVerificationCode;
