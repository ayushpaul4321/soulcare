// utils/sendEmail.js
const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Replace with your email service
    auth: {
      user: "ayushpaul1805@gmail.com", // Your email
      pass: "", // Your email password or app password
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail; // Export the function
