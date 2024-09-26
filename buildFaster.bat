npm run build -- --mode production &&(
scp -i src/data/export_key dist/index.html louise@34.82.250.51:/var/www/html
scp -i src/data/export_key -r dist/assets louise@34.82.250.51:/var/www/html
)
