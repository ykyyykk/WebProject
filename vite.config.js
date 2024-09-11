import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/

// MPA會在這邊做page設定 有點像是router.js做的事
export default defineConfig({
  plugins: [vue()],
  publicPath: "/WebProject/",
});

// module.exports = {
//   publicPath: "/WebProject/",
// };
