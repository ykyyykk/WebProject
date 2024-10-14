import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ path: ".env.production" });

describe("Login.vue", () => {
  // 不要在 () 裡面加上 done 因為是async
  it("呼叫 /login API 成功", async () => {
    const response = await axios.post(
      `${process.env.VITE_API_BASE_URL}/api/login`,
      {
        email: "e",
        password: "p",
      }
    );

    response.data.should.deepEqual({
      success: true,
      user: { id: 6, name: "e", phoneNumber: "p", email: "e", password: "p" },
    });
  });
});
