# SDR AI WhatsApp

API em Node.js + TypeScript para atendimento e qualificacao de leads via WhatsApp, usando Twilio, OpenAI, Prisma e PostgreSQL.

## Stack

- Node.js
- TypeScript
- Express
- OpenAI API
- Twilio WhatsApp Sandbox / API
- Prisma
- PostgreSQL
- Docker

## O que este projeto faz

- recebe mensagens do WhatsApp via webhook
- cria ou atualiza leads no banco
- qualifica o lead de forma inicial
- envia a mensagem para a OpenAI
- responde o usuario pelo WhatsApp via Twilio

## Endpoints

- `GET /health`
- `POST /webhook/whatsapp`

## Variaveis de ambiente

Use o arquivo `.env.example` como base.

Exemplo:

```env
NODE_ENV=development
PORT=3001
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
DATABASE_URL=postgresql://user:password@localhost:5433/sdr_ai
```

## Rodando localmente

### 1. Instale as dependencias

```bash
npm install
```

### 2. Suba o banco local

```bash
docker compose up -d db
```

No setup local atual:

- Postgres no host: `localhost:5433`
- API local: `localhost:3001`
- API no Docker: `localhost:3018`

### 3. Gere o Prisma Client

```bash
npm run prisma:generate
```

### 4. Aplique as migracoes

```bash
npm run prisma:deploy
```

### 5. Rode a API

```bash
npm run dev
```

### 6. Teste o health check

```bash
curl.exe -i http://localhost:3001/health
```

## Testando o webhook localmente

```bash
curl.exe -i -X POST http://localhost:3001/webhook/whatsapp -H "Content-Type: application/x-www-form-urlencoded" -d "Body=Oi, quero automatizar meu atendimento&From=whatsapp:+5511999999999"
```

Se a rota existir, voce nao deve mais receber `404`.

Se receber `500`, normalmente o erro sera um destes:

- `OPENAI_API_KEY` invalida
- credenciais do Twilio invalidas
- banco nao migrado

## Twilio Sandbox + ngrok

### 1. Rode a API local

```bash
npm run dev
```

### 2. Abra um tunel com ngrok

```bash
ngrok http 3001
```

### 3. Copie a URL HTTPS gerada

Exemplo:

```text
https://abc123.ngrok-free.app
```

### 4. Configure no Twilio Sandbox

No campo `When a message comes in`, use:

```text
https://abc123.ngrok-free.app/webhook/whatsapp
```

### 5. Entre no sandbox

No WhatsApp, envie o codigo `join ...` que o Twilio mostrar para o numero do sandbox.

### 6. Teste a conversa

Envie uma mensagem real no WhatsApp, por exemplo:

```text
Oi, quero automatizar meu atendimento
```

## Rodando com Docker

### Build

```bash
docker compose build app
```

### Subir a API e o banco

```bash
docker compose up -d
```

### Testar a API no Docker

```bash
curl.exe -i http://localhost:3018/health
```

## Deploy no Render

### 1. Envie o projeto para o GitHub

Nao suba o `.env`.

### 2. Crie um banco PostgreSQL no Render

Copie o `External Database URL`.

### 3. Crie um Web Service no Render

- Runtime: `Docker`
- Root Directory: deixe vazio se o projeto estiver na raiz do repo
- Health Check Path: `/health`

### 4. Configure as variaveis de ambiente

```env
NODE_ENV=production
PORT=3001
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
DATABASE_URL=postgresql://...
```

### 5. Rode as migracoes em producao

```bash
npm run prisma:deploy
```

### 6. Teste a URL publica

```text
https://seu-servico.onrender.com/health
```

### 7. Aponte o webhook do Twilio para producao

```text
https://seu-servico.onrender.com/webhook/whatsapp
```

## Scripts uteis

```bash
npm run dev
npm run build
npm run start
npm run prisma:generate
npm run prisma:migrate
npm run prisma:deploy
npm run prisma:dev
```

## Estado atual

O projeto ja possui:

- endpoint de health check
- webhook de WhatsApp
- persistencia inicial de leads com Prisma
- container Docker funcional para a API
- deploy funcional no Render

## Autor

Lucas Borges
