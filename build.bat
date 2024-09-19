@REM -i代表身份文件 -r代表遞迴
npm run build -- --mode production &&(
scp -i src/data/export_key -r dist/* louise@34.82.250.51:/var/www/html
)

@REM 沒用 rsync需要在linux下才能使用 
@REM npm run build &&(
@REM rsync -avz -e "ssh -i src/data/export_key" \
@REM     --delete \
@REM    @REM  避免刪除重要文件 但是聽AI說這個被刪除也沒關係
@REM    @REM  --exclude 'index.nginx-debian.html' \ 
@REM     dist/ \
@REM     louise@34.82.250.51:/var/www/html/
@REM )



@REM # 解釋：
@REM # -a: 檔案存檔模式，保留幾乎所有原始檔案屬性
@REM # -v: 詳細輸出模式，顯示更多信息
@REM # -z: 壓縮文件數據
@REM # -e: 指定要使用的遠程 shell
@REM # --delete: 刪除目標目錄中源目錄沒有的文件
@REM # dist/: 源目錄（注意結尾的斜槓，表示同步目錄內容而不是目錄本身）

