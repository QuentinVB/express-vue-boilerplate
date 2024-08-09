const nodemailer = require("nodemailer");
const Handlebars = require("handlebars");
const path = require("path");
const fs = require("fs/promises");

const isDev = process.env.NODE_ENV === "development";

const transporter = nodemailer.createTransport({
  host: "127.0.0.1", // The hostname of the SMTP server
  port: 25, // The port of the SMTP server (commonly 587 for secure, 25 for insecure)
  secure: false, // Defines if the connection should use SSL/TLS. If true, the port should be 465
  auth: {
    type: "login",
    user: "test", // SMTP username
    pass: "test", // SMTP password
  },
  tls: {
    rejectUnauthorized: false,
  },
  debug: true,
});

//TODO : make it async, and stripe HTML
function sendEmail(to, subject, html) {
  const mailOptions = {
    from: "dev.test@localhost",
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
  let domain = "";
  if (isDev) {
    //TODO : store devdomain elsewhere
    domain = "http://localhost";
  }
  url = `${domain}:${process.env.PORTSERVER}/auth/confirm?id=${encodeURI(userid)}&key=${encodeURI(key)}`;
  const html = template({ url });
  sendEmail(to, "Confirmation de l'adresse email", html);
}

module.exports = { sendEmailConfirm };
