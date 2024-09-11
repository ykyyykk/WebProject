import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/

// MPA會在這邊做page設定 有點像是router.js做的事
export default defineConfig({
  plugins: [vue()],
  // 嘗試上傳到github.pages 失敗 應該跟讀不到server 資料庫有關
  // base: "/WebProject/",
});
