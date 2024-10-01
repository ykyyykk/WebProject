import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "/", // 基礎路徑，告訴應用它在根目錄下運行
  plugins: [vue()],
});
