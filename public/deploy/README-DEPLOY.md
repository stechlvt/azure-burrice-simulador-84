# Deploy Instructions for Apache

## Arquivos incluídos:
- `.htaccess` - Configuração do Apache para SPA (Single Page Application)

## Como fazer o deploy:

### 1. Build do projeto
```bash
npm run build
```

### 2. Upload dos arquivos
Faça upload de todos os arquivos da pasta `dist/` para o diretório raiz do seu servidor Apache.

### 3. Configurações necessárias no Apache

#### Módulos necessários:
Certifique-se que os seguintes módulos estão habilitados no Apache:
- `mod_rewrite` (para URL rewriting)
- `mod_expires` (para cache)
- `mod_deflate` (para compressão)
- `mod_headers` (para security headers)

#### Para habilitar módulos no Ubuntu/Debian:
```bash
sudo a2enmod rewrite
sudo a2enmod expires
sudo a2enmod deflate
sudo a2enmod headers
sudo systemctl restart apache2
```

#### Para habilitar no CentOS/RHEL:
Edite `/etc/httpd/conf/httpd.conf` e descomente as linhas dos módulos.

### 4. Configuração de Virtual Host (Opcional)
Se você quiser configurar um virtual host específico:

```apache
<VirtualHost *:80>
    ServerName azzure.com
    DocumentRoot /var/www/html/azzure
    
    <Directory "/var/www/html/azzure">
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/azzure-error.log
    CustomLog ${APACHE_LOG_DIR}/azzure-access.log combined
</VirtualHost>
```

### 5. Permissões
Certifique-se que o Apache tem permissão para ler os arquivos:
```bash
sudo chown -R www-data:www-data /caminho/para/pasta/dist
sudo chmod -R 755 /caminho/para/pasta/dist
```

### 6. SSL (Recomendado)
Para produção, configure SSL com Let's Encrypt:
```bash
sudo certbot --apache -d seudominio.com
```

## Estrutura final no servidor:
```
/var/www/html/
├── index.html
├── .htaccess
├── assets/
│   ├── *.css
│   ├── *.js
│   └── images/
└── outros arquivos...
```

## Verificação
Após o deploy, verifique:
1. Se a página inicial carrega
2. Se as rotas funcionam (navegação sem recarregar)
3. Se os assets estão sendo servidos corretamente
4. Se os headers de segurança estão ativos

## Troubleshooting
- **404 em rotas**: Verifique se mod_rewrite está ativo
- **Arquivos não carregam**: Verifique permissões
- **Performance lenta**: Verifique se mod_deflate está ativo