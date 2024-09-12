//為了使用__dirname 和 __filename
import { fileURLToPath } from "url";
import path from "path";

// WebProject/
// │
// ├── public/         # 在src之外的東西不會被打包
// │   └── img/        # 客戶上傳的圖片
// │
// ├── src/            #
// │   └── assets/     # 其他靜態的文件
// │       └── logo/   # logo icon之類的
// │
// └── server.js       # 伺服器Code

//設定__filename 為server.目前位置 所以是D:\Desktop\Git\WebProject\src\server.js
const __filename = fileURLToPath(import.meta.url);
//設定__dirname 為目前__filename 的上一層 所以是D:\Desktop\Git\WebProject\src
export const __dirname = path.dirname(__filename);
