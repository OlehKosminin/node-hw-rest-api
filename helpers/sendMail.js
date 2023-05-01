const nodemailer = require("nodemailer");
require("dotenv").config();

const { EMAIL_FROM, GMAIL_PASS } = process.env;

const nodemailerConfig = {
  host: "smtp.gmail.com",
  port: "587",
  secure: false,
  auth: {
    user: EMAIL_FROM,
    pass: GMAIL_PASS,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendMail = async (data) => {
  const email = { ...data, from: EMAIL_FROM };
  await transport.sendMail(email);
  return true;
};

module.export = sendMail;
