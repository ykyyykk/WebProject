<template>
  <p>首先在伺服器中安裝certbot</p>
  <CopyCodeComponent :content="'apt install certbot'" />

  <p>檢查80port有沒有被佔用</p>

  <CopyCodeComponent :content="'netstat -tulpn | grep LISTEN'" />

  <p>如果有被佔用則停掉它</p>
  <p>舉例來說 systemctl stop nginx這樣就好</p>
  <p>tcp 0 0 0.0.0.0:80 0.0.0.0:* LISTEN 175831/nginx: maste</p>

  <CopyCodeComponent :content="'systemctl stop 佔用的服務名稱'" />

  <p>
    執行certbot 需要轉換的網址大概長這樣 主機別名.DomainName 例如: www.aaa.tw
  </p>
  <CopyCodeComponent
    :content="'sudo certbot certonly --standalone --preferred-challenges http -d 需要轉換的網址'"
  />

  <p>回到資料夾最上層</p>
  <CopyCodeComponent :content="'cd /'" />

  <p>前往nginx的配置文件</p>
  <CopyCodeComponent :content="'cd etc/nginx/sites-available'" />

  <p>修改nginx的配置文件</p>
  <CopyCodeComponent :content="'vim default'" />

  <p>直接將這個資料覆蓋掉server</p>
  <CopyCodeComponent
    :content="`server {
    listen 80;
    listen 443 ssl;
    server_name 你的網址;
    
    index index.html index.htm index.nginx-debian.html;

    ssl_certificate /etc/letsencrypt/live/你的網址/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/你的網址/privkey.pem;

    location / {
        try_files $uri $uri/ /index.html;
        root /var/www/html;
        index index.html;
    }
}`"
  />

  <p>按下esc後保存文件</p>
  <CopyCodeComponent :content="':wq'" />
  <p>檢查文件是否正確</p>
  <CopyCodeComponent :content="'sudo nginx -t'" />

  <p>
    如果都正確就差不多結束了 因為剛剛是nginx佔用80port 所以要把nginx重新打開
  </p>

  <CopyCodeComponent :content="'systemctl restart nginx'" />

  <p>轉換成https後 program.cs 也要跟著更改</p>

  <CopyCodeComponent
    :content="`using System.Security.Authentication;

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    // 取得appsettings.json
    var config = builder.Configuration;
    // 取得appsettings.json Kestrel的部分
    serverOptions.Configure(config.GetSection('Kestrel'));
    serverOptions.ConfigureHttpsDefaults(listenOptions =>
    {
        listenOptions.SslProtocols = SslProtocols.Tls12 | SslProtocols.Tls13;
    });
});

app.Run();`"
  />

  <p>進入伺服器後到憑證存放的位置</p>

  <CopyCodeComponent :content="`cd /etc/letsencrypt/live/申請好的網址/`" />

  <p>執行以下命令來創建 PFX 文件</p>
  <CopyCodeComponent
    :content="`sudo openssl pkcs12 -export -out certificate.pfx -inkey privkey.pem -in cert.pem -certfile chain.pem`"
  />

  <p>他會提示你輸入密碼 記好等等會用上</p>

  <p>
    執行以下命令更改憑證的權限 這會將 certificate.pfx 文件的所有者更改為
    www-data通常是運行 web 服務器的用戶
  </p>

  <CopyCodeComponent
    :content="`sudo chown www-data:www-data /etc/letsencrypt/live/申請好的網址/certificate.pfx`"
  />
  <CopyCodeComponent
    :content="`sudo chmod 400 /etc/letsencrypt/live/申請好的網址/certificate.pfx`"
  />

  <p>port 改在 appsettings.json設定 server使用https localhost使用http</p>

  <CopyCodeComponent
    :content="`{
  'Logging': {
    'LogLevel': {
      'Default': 'Information',
      'Microsoft': 'Warning',
      'Microsoft.Hosting.Lifetime': 'Information'
    }
  },
  'AllowedHosts': '*',
  'ConnectionStrings': {
    'DefaultConnection': 'Server=伺服器ip;Database=資料庫名稱;Uid=資料庫使用者名稱;Password=資料庫密碼;'
  },
  'Kestrel': {
    'Endpoints': {
      'Https': {
        'Url': 'https://*:改成你要的port',
        'Certificates': {
          'Default': {
            'Path': '/etc/letsencrypt/live/申請好的網址/certificate.pfx',
            'Password': '剛剛輸入的密碼'
          }
        }
      }
    }
  }
}
`"
  />
</template>

<script>
import CopyCodeComponent from "../../components/CopyCodeComponent.vue";

export default {
  components: { CopyCodeComponent },
};
</script>
