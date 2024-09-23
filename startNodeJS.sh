# 不要將 & 改成 && 會只執行後端 不知道為什麼 deploy_remote.sh 反而需要 &&
#開啟 後端 和 前端
nodemon src/server.js & npm run dev -- --mode test-nodejs
