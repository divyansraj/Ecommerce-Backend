const nodemailer = require("nodemailer");

const mailHelper = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // using mailtrap
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const message = {
    from: "demo@gmail.com", // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.text, // plain text body
    // html: "<b>Hello world?</b>", // html body
  };

  try {
    let info = await transporter.sendMail(message);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};

module.exports = mailHelper;
