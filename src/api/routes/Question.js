import express from "express";
import { transporter } from "../../config/email.js";

const router = express.Router();

router.post("/sendquestion", async (request, response, next) => {
  //檢查是否重複註冊
  const { name, email, question } = request.body;

  try {
    const mailOption = {
      from: email,
      to: "louise87276@gmail.com",
      subject: `${name} 問題`,
      text: `我是${name} 問題: ${question}`,
    };
    await transporter.sendMail(mailOption);
  } catch (error) {
    console.error(`傳送搵替錯誤: ${error}`);
    next(error);
  }
});

export default router;
