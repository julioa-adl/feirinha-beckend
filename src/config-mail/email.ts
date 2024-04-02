import { createTransport } from "nodemailer";

const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "feirinhadagente00@gmail.com",
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function sendVerificationCode(toEmail: string, verificationCode: string) {
    await transporter.sendMail({
        from: "Feirinha da Gente <noreply@feirinhadagente.com>",
        to: toEmail,
        subject: "Your verification code",
        html: `
        <div style="margin: 0; padding: 0; background-color: #e1e1ef; height: 100vh;">
            <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
                    <h2>Olá! Seja bem-vindo ao Feirinha da Gente <3</h2>
                    <p>Este é seu código de verificação de Email <br>
                    copie e cole na página de cadastro para realizar a validação! <br>
                    Este código irá expirar em 10 min!</p>
                    <strong>${verificationCode}</strong>
                    <p>Em caso de dúvidas, basta responder este Email.
                    Obrigado!</p>
                </div>
            </div>
        </div>
        `
    });
}