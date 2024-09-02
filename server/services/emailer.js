require("dotenv").config();
const nodemailer = require("nodemailer");
const Handlebars = require("handlebars");
const path = require("path");
const fs = require("fs/promises");

const isDev = process.env.NODE_ENV === "development";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, 
  port: process.env.SMTP_PORT*1,  //(commonly 587 for secure, 25 for insecure)
  secure: process.env.SMTP_TLS == "true", 
  auth: {
    type: "login",
    user: process.env.SMTP_USR, // SMTP username
    pass: process.env.SMTP_PWD, // SMTP password
  },
  tls: {
    //ciphers:'SSLv3',
    rejectUnauthorized: false,
  },
  debug: isDev,
});

//TODO : make it async, and stripe HTML
function sendEmail(to, subject, html) {
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: to,
    subject: subject,
    html: html,
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

async function sendEmailConfirm(to, userid, key) {
  const file = await fs.readFile(
    path.join(__dirname, "../templates/email-confirm.hbs"),
    "utf-8"
  );
  const template = Handlebars.compile(file);
  url = `http://${process.env.APP_DOMAIN}:${process.env.PORTSERVER}/auth/confirm?id=${encodeURI(userid)}&key=${encodeURI(key)}`;
  const html = template({ url });
  sendEmail(to, "Confirmation de l'adresse email", html);
}

async function sendEmailReset(to, userid, key) {
  const file = await fs.readFile(
    path.join(__dirname, "../templates/email-reset.hbs"),
    "utf-8"
  );
  const template = Handlebars.compile(file);
  url = `http://${process.env.APP_DOMAIN}:${process.env.PORTSERVER}/auth/resetpassword?id=${encodeURI(userid)}&key=${encodeURI(key)}`;
  const html = template({ url });
  sendEmail(to, "Réinitialisation du mot de passe", html);
}

module.exports = { sendEmailConfirm,sendEmailReset };
