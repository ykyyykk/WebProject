import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/

// MPA會在這邊做page設定 有點像是router.js做的事
export default defineConfig({
  plugins: [vue()],
  base: "/WebProject/", // 这相当于 vue.config.js 中的 publicPath
});
