# Deploy no WordPress Hostgator - Instruções Completas

## Pré-requisitos
- Acesso ao cPanel da Hostgator
- Projeto buildado (`npm run build`)
- Arquivos da pasta `dist/` + arquivo `.htaccess`

## Passo a Passo:

### 1. Acesse o cPanel da Hostgator
- Faça login em sua conta Hostgator
- Acesse o cPanel (painel de controle)

### 2. Localize o Gerenciador de Arquivos
- No cPanel, procure por "Gerenciador de Arquivos" ou "File Manager"
- Clique para abrir

### 3. Navegue até a pasta correta
Para um domínio principal:
- Vá para a pasta `public_html/`

Para um subdomínio:
- Vá para a pasta `public_html/seusubdominio/`

### 4. Limpe a pasta de destino
- Selecione todos os arquivos existentes na pasta
- Delete arquivos desnecessários (mantenha apenas .htaccess se já existir)

### 5. Upload dos arquivos do build
- Clique em "Upload" no Gerenciador de Arquivos
- Selecione TODOS os arquivos da pasta `dist/` do seu projeto
- Faça upload também do arquivo `.htaccess` da pasta `public/deploy/`

### 6. Estrutura final no servidor:
```
public_html/ (ou public_html/seusubdominio/)
├── index.html
├── .htaccess
├── assets/
│   ├── index-[hash].css
│   ├── index-[hash].js
│   └── outras imagens/
└── outros arquivos gerados pelo build
```

### 7. Configurações importantes no .htaccess

O arquivo `.htaccess` já está configurado corretamente para:
- Redirecionamento de rotas SPA
- Headers de segurança
- Cache de arquivos estáticos
- Compressão GZIP

### 8. Verificação
Após o upload, teste:
1. **Acesse seu domínio** - deve carregar a página inicial
2. **Teste navegação** - as rotas devem funcionar sem recarregar
3. **Verifique console** - não deve haver erros 404

### 9. Configurações opcionais no cPanel

#### SSL/HTTPS (Recomendado):
- No cPanel, procure "SSL/TLS"
- Ative o certificado gratuito Let's Encrypt
- Force redirecionamento HTTPS

#### Cache:
- Se disponível, ative o cache do servidor
- Configure TTL para arquivos estáticos

## Troubleshooting Hostgator

### Erro 500 - Internal Server Error:
- Verifique se o arquivo `.htaccess` está correto
- Teste renomeando temporariamente o `.htaccess` para `.htaccess-backup`

### 404 em rotas:
- Confirme que o `.htaccess` foi enviado corretamente
- Verifique se mod_rewrite está ativo (geralmente está na Hostgator)

### Arquivos não carregam:
- Verifique se TODOS os arquivos da pasta `dist/` foram enviados
- Confirme que a estrutura de pastas está correta

### Site não atualiza:
- Limpe cache do navegador
- Force refresh com Ctrl+F5 (Windows) ou Cmd+Shift+R (Mac)

## Comandos para build antes do upload:

```bash
# No seu projeto local
npm run build

# Após o build, envie:
# 1. Todo conteúdo da pasta dist/
# 2. O arquivo .htaccess da pasta public/deploy/
```

## Suporte Hostgator
Se tiver problemas técnicos com o servidor:
- Entre em contato com o suporte da Hostgator
- Mencione que é uma Single Page Application (SPA) React
- Peça para verificar se mod_rewrite está ativo

## Domínios e Subdomínios

### Para domínio principal (exemplo.com):
- Upload na pasta: `public_html/`

### Para subdomínio (azzure.exemplo.com):
- Crie o subdomínio no cPanel primeiro
- Upload na pasta: `public_html/azzure/`

### Para pasta específica (exemplo.com/azzure):
- Crie pasta: `public_html/azzure/`
- Upload nesta pasta
- Acesse via: `seudominio.com/azzure`