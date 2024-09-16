# -i 的意思是指定私鑰路徑
npm run build -- --mode production && scp -i ./src/data/export_key -r dist/* louise@34.82.250.51:/var/www/html