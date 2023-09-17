require("dotenv").config();

const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
    },
});

function sendEmail(message) {
    message["from"] = process.env.USER_EMAIL;
    return transport.sendMail(message);
}

module.exports = sendEmail;