const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const mailgun = require("mailgun-js");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const hashToken = async (params) => {
  const token = await jwt.sign(
    {
      rand: params.random,
      email: params.email,
    },
    process.env.SECRET_JWT,
    {
      expiresIn: "1h",
      algorithm: "HS256",
    }
  );
  return token;
};

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const Sendsmtp = async (email, type, random) => {
  let link;
  try {
    token = await hashToken({ random, email });

    let subject = "Hello, did you forget your password?";
    if (type == "signup") {
      subject = "Please confirm your Email account";
    } else if (type == "verifycode") {
      subject = "Hello, this is your confirmation code.";
    } else if (type == "dispute") {
      subject = "you have received the dispute request.";
    } else if (type == "release") {
      subject = "Congratulation! The funds has been released.";
    } else if (type == "refund") {
      subject = "The funds has been refunded.";
    } else if (type == "create") {
      subject = `The order, ${random} , is created now.`;
    } else if (type == "iguana-admin") {
      subject = `The rare NFT minted!.`;
    } else if (type == "iguana-user") {
      subject = `Congratulations, rare NFT minted!`;
    }

    let html = ``;
    if (type == "signup") {
      html = `
      Hello,
      <br> Please Click on the link to verify your email.
      <br>
      <a href="${link}">Click here to verify</a>`;
    } else if (type == "verifycode") {
      const emailTemplateSource = fs.readFileSync(
        path.join(__dirname, "/verification.hbs"),
        "utf8"
      );
      const template = handlebars.compile(emailTemplateSource);
      const htmlToSend = template({ random: random });

      html = htmlToSend;
    } else if (type == "forgot") {
      const emailTemplateSource = fs.readFileSync(
        path.join(__dirname, "/password.hbs"),
        "utf8"
      );
      const template = handlebars.compile(emailTemplateSource);
      const htmlToSend = template({ random: random });

      html = htmlToSend;
    } else if (type == "release") {
      html = `User ${random} has released funds from escrow.`;
    } else if (type == "refund") {
      html = `User ${random} has refunded funds from escrow.`;
    } else if (type == "create") {
      html = `The order, ${random} , is created now.`;
    } else if (type == "iguana-admin") {
      const emailTemplateSource = fs.readFileSync(
        path.join(__dirname, "/iguana-admin.hbs"),
        "utf8"
      );
      const template = handlebars.compile(emailTemplateSource);
      const htmlToSend = template({
        name: random.name,
        walletAddress: random.walletAddress,
      });

      html = htmlToSend;
    } else if (type == "iguana-user") {
      const emailTemplateSource = fs.readFileSync(
        path.join(__dirname, "/iguana-user.hbs"),
        "utf8"
      );
      const template = handlebars.compile(emailTemplateSource);
      const htmlToSend = template({
        name: random.name,
        walletAddress: random.walletAddress,
      });

      html = htmlToSend;
    }

    const mailOptions = {
      to: email,
      from: "info@incomeisland.org",
      subject: subject,
      html: html,
    };

    // ### Test smtp URL
    try {
      await mg.messages().send(mailOptions);

      return {
        state: true,
        error: "",
      };
    } catch (error) {
      console.log("error", error);
      return {
        state: false,
        error: error.toString(),
      };
    }
  } catch (e) {
    console.log("e", e);
    return {
      state: false,
      error: error.toString(),
    };
  }
};
module.exports = {
  Sendsmtp,
};
