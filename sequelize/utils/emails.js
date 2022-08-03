const path = require('path');
const dotenv = require("dotenv").config({ path: path.resolve("../../", ".env")});
const nodemailer = require('nodemailer');

async function sendEmail(destination, subject, message) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
          user: process.env.EMAIL_USER, 
          pass: process.env.EMAIL_PASS 
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: destination,
    subject: subject,
    html: message,
  }
  
  return await transporter.sendMail(mailOptions);
}

function sendResetEmail(destination, code){
  return sendEmail(destination, 'Please, reset your password', 
      `We have generated a verification code for your password reset.
      <br/>Please use this code in the recovery screen: ${code}`);
}

function sendVerificationEmail(destination, code) {
  return sendEmail(destination, 'Please, verify your account', 
      `We have generated a verification code for your account creation.
      <br/>Please use this code in the verification screen: ${code}`);
}

function sendApprovalEmail(userEmail, veteranId, veteranName, userName) {
  return sendEmail(process.env.CURATOR_EMAIL, 'Veteran profile requires approval', 
      userName != null ?
      `Dear ${process.env.CURATOR_FIRSTNAME + ' ' + process.env.CURATOR_LASTNAME},<br/>${userName} just submitted a Veteran Profile for ${veteranName}.
      <br/>Please review and approve <a href=${process.env.APPROVAL_URL + veteranId}>this profile</a>` :
      `Dear ${process.env.CURATOR_FIRSTNAME + ' ' + process.env.CURATOR_LASTNAME},<br/>${userEmail} just submitted a Veteran Profile for ${veteranName}.
      <br/>Please review and approve <a href=${process.env.APPROVAL_URL + veteranId}>this profile</a>`);
}

module.exports = { sendVerificationEmail, sendResetEmail, sendApprovalEmail }