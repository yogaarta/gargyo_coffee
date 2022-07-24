const nodemailer = require("nodemailer");

const sendConfirmationEmail = async (name, email, confirmationCode) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });
    let mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: "Activate your Account",
      html: `<h2>Gargyo Coffee Email Confirmation</h2>
      <div>
      <h3>Hi, ${name}</h3>
      <h3>Thank you for register. Please confirm your email by clicking on the following link :</h3>
      <a href=${process.env.CLIENT_URL}/auth/confirm/${confirmationCode}> Click here to verify </a>
      </div>`,
    };
    await transport.sendMail(mailOptions);
  } catch (error) {
    console.log(error.message);
  }
};

const sendPasswordConfirmation = async (email, confirmCode) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });
    let html = `<h2>Gargyo Coffee Forgot Password Confirmation</h2>
    <div>
    <h3>Hi!</h3>
    <h3>Here is your account details:</h3>
    <ul>
    <li>Email: <h3>${email}</h3></li>
  </ul>
  YOUR RESET PASSWORD CONFIRMATION CODE: <h1>${confirmCode}</h1> <br>
  This code only available for 15 minutes !
    </div>`;

    let mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: "Forgot Password",
      html,
    };

    await transport.sendMail(mailOptions);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  sendConfirmationEmail,
  sendPasswordConfirmation,
};