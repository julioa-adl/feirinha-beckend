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
                <div style="margin: auto; background-color: #ffffff; padding: 25px; border-radius: 10px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
                    <h2>Opa, cheguei!</h2>
                    <p style="font-size: 16px;">Seja bem-vindo ao Feirinha da Gente <3,<br>
                    é um grande prazer ter você por aqui.<br>
                    Para prosseguir com seu cadastro, por favor,<br>
                    utilize o seguinte código de cofirmação: </p>
                   <strong style="font-size: 24px;">${verificationCode}</strong><br>
                    Por favor, insira este código no campo apropriado<br>
                     no nosso site para continuar o processo de cadastro<br>
                     de sua conta. Este código é válido por 10 minutos e deve ser<br>
                     usado imediatamente para garantir a segurança da sua conta.
                     <br>
                     <br>
                     Se você não solicitou este código, ignore este e-mail.<br>
                     Nenhuma conta será feita em sua nome. Para qualquer dúvida<br>
                     ou necessidade de assistência adicional, entre em contato conosco<br>
                     pelo e-mail feirinhadagente00@gmail.com.
                     <br>
                     <br>
                     Um abraço,<br>
                     Equipe Feirinha.
                    </p>
                </div>
            </div>
        `
    });
}