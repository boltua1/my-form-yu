const nodemailer = require ("nodemailer");

export const sendMailForm = async (
    email: string,
    name: string,
    description: string
) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        }
    });

    const info = await transporter
        .sendMail({
            from: `"Fred Foo" <${process.env.MAIL_USER}>`,
            to: `${process.env.MAIL_USER}`,
            subject: "привет мой друг Form",
            text: "Hello word?",
            html: `
                <b>${email}</b>
                <b>${name}</b>
                <b>${description}</b>
            `
        })
        .then(() => {
            return "Good";
        })
        .catch(() => {
            return "Error";
        })

        return info;
}