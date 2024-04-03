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
            <div style="display: flex; justify-content: center; align-items: center; height: 100%; padding: 20px; background-color: #e1e1ef;">
                <div style="margin: auto; background-color: #ffffff; padding: 16px 8px; border-radius: 10px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
                    <h1>E aí!</h1>
                    <p>Seja bem-vindo ao Feirinha da Gente <3,<br> é um grande prazer ter você por aqui.</p>
                    <br>
                    <p>Para prosseguir com seu cadastro, por favor, <br>
                    utilize o seguinte código de cofirmação: </p>
                    <h1><strong>${verificationCode}</strong></h1>
                    <p>Por favor, insira este código no campo apropriado<br>
                     no nosso site para continuar o processo de cadastro<br>
                     de sua conta. Este código é válido por 2 dias e deve ser<br>
                     usado imediatamente para garantir a segurança da sua conta.
                     <br>
                     Se você não solicitou este código, ignore este e-mail.<br>
                     Nenhuma conta será feita em sua nome. Para qualquer dúvida<br>
                     ou necessidade de assistência adicional, entre em contato conosco<br>
                     pelo e-mail feirinhadagente00@gmail.com.
                     <br>
                     Um abraço,<br>
                     Equipe Feirinha da Gente.
                     </p>
                </div>
            </div>
        `
    });
}
exports.sendVerificationCode = sendVerificationCode;
