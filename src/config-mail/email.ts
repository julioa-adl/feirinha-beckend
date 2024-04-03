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
            <div style="display: flex; justify-content: center; align-items: center; height: 100%; padding: 20px; background-color: #e1e1ef;">
                <div style="max-width: 500px; margin: auto; background-color: #ffffff; padding: 25px; border-radius: 10px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
                    <h2>Opa, cheguei!</h2>
                    <p style="font-size: 16px;">Seja bem-vindo ao Feirinha da Gente, é um grande prazer ter você por aqui 💛.
                    Para prosseguir com seu cadastro, por favor, utilize o seguinte código de cofirmação:</p>
                   <strong style="font-size: 24px;">${verificationCode}</strong>
                    <p style="font-size: 16px;">Por favor, insira este código no campo apropriado no nosso site para continuar o processo de cadastro de sua conta. Este código é válido por 10 minutos e deve ser usado imediatamente para garantir a segurança da sua conta.</p>
                    <p style="font-size: 16px;">Se você não solicitou este código, ignore este e-mail. Nenhuma conta será feita em sua nome. Para qualquer dúvida ou necessidade de assistência adicional, entre em contato conosco pelo e-mail feirinhadagente00@gmail.com.</p>
                    <p style="font-size: 16px;">Um abraço,<br>
                     Equipe Feirinha 💛.</p>
                    </p>
                </div>
            </div>
        `
    });
}