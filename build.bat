@REM -i代表身份文件 -r代表遞迴
npm run build -- --mode production &&(
scp -i src/data/export_key -r dist/* louise@34.82.250.51:/var/www/html
)