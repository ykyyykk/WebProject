import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",

  // pass不能更改 後面那一串是 應用程式密碼
  auth: {
    user: "louise87276@gmail.com",
    pass: "hssp gwtv aftv otkb",
  },
});
