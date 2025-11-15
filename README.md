# Web App Sistema de governaça descentralizada ASPPIBRA-DAO

## 1. Visão Geral e Conceito Central

### 1.1. Propósito do Aplicativo

Este  Web App, é um aplicativo web "cliente leve" (light-client).

O Painel Web funciona como uma interface de visualização segura e de facilitando interações de um aplicativo móvel nativo. O "Mobile App" é a única fonte de verdade para chaves privadas e lógica de assinatura.

### 1.2. Restrição de Segurança Mandatória

A arquitetura é projetada com uma restrição de segurança primária, que é inegociável:

**O cliente web NUNCA deve, sob NENHUMA circunstância, lidar com chaves privadas, mnemônicas (frases-semente) ou qualquer lógica de assinatura de transação.**

Todo o fluxo de autenticação e execução de ações sensíveis é "assistido", exigindo que o usuário aprove as ações explicitamente no Mobile App.

## 2. Stack de Tecnologia

A implementação técnica utilizará as seguintes tecnologias:

### Frontend (Cliente Leve)

- **Linguagem Frontend**: TypeScript
- **Framework Principal**: Next.js (Usando o App Router)
- **Roteamento**: Next.js App Router (roteamento baseado em sistema de arquivos)
- **Estilização**: Tailwind CSS
- **Comunicação API**: axios
- **Geração de QR Code**: qrcode.react

### Backend (Servidor e Banco de Dados)

- **Plataforma de Hospedagem**: Cloudflare Pages (Hospedagem de site estático + Funções de back-end)
- **Lógica de API (Backend)**: Cloudflare Workers (executados via rotas /api/)
- **Linguagem Backend**: TypeScript (para os Workers)
- **Banco de Dados**:
  - **Cloudflare KV**: (Uso principal) Ideal para armazenar os "desafios" de autenticação (tokens de QR Code), que são temporários e de alta leitura.
  - **Cloudflare D1**: (Opcional) Para armazenamento de dados de usuário mais complexos ou relacionais, se necessário.

## 3. Arquitetura de Software e Lógica

### 3.1. Gerenciamento de Estado Global (A "Cola")

### 3.2. Lógica de Autenticação Web (O "Ponto de Entrada")

### 3.3. API Backend (Lógica dos Cloudflare Workers)

Esta é a lógica que deve ser implementada no back-end (Cloudflare Workers) para suportar o fluxo de autenticação.

**Endpoint**: `GET /api/auth/challenge`

- **Propósito**: Gerar um desafio único para o QR Code.
- **Lógica do Worker**:
  1. Gerar uma string de desafio única e segura (ex: `crypto.randomUUID()`).
  2. Criar um registro no Cloudflare KV com o `challenge` como chave.
  3. O valor do registro deve ser: `{ status: "pending", timestamp: Date.now() }`.
  4. Definir um tempo de expiração (TTL) no registro do KV (ex: 5 minutos).
  5. Retornar (200 OK) com `{ challenge: "string_unica_gerada" }`.

**Endpoint**: `POST /api/auth/scan` (Para o App Nativo)

- **Propósito**: (A SER CHAMADO PELO "COFRE") Validar o desafio escaneado.
- **Lógica do Worker**:
  1. Receber `{ challenge: "...", signedData: "...", userPublicKey: "..." }`.
  2. Verificar a assinatura `signedData` usando a `userPublicKey`.
  3. Se a assinatura for válida:
     - Buscar o registro do `challenge` no KV.
     - Se existir e estiver "pending":
       - Atualizar o registro no KV para: `{ status: "completed", user: { ...dados do usuário... } }`.
       - Manter o TTL original (ou definir um novo TTL curto).
       - Retornar (200 OK) ao app nativo.
     - Se não existir ou não estiver "pending", retornar (404 Not Found) ou (410 Gone).
  4. Se a assinatura for inválida, retornar (401 Unauthorized).

**Endpoint**: `POST /api/auth/status` (Para o Painel Web)

- **Propósito**: (A SER CHAMADO PELO PAINEL WEB) Verificar o status do desafio.
- **Lógica do Worker**:
  1. Receber `{ challenge: "..." }` no corpo.
  2. Buscar o registro do `challenge` no KV.
  3. Se não existir: Retornar (200 OK) com `{ status: "expired" }`.
  4. Se existir:
     - `status: "pending"`: Retornar (200 OK) com `{ status: "pending" }`.
     - `status: "completed"`:
       - Gerar um Token de Sessão (JWT) para o usuário (armazenado no KV em `{ user: ... }`).
       - Opcional: Limpar o registro do KV.
       - Retornar (200 OK) com `{ status: "completed", token: "jwt_gerado", user: { ...dados do usuário... } }`.

### 3.4. Trava de Segurança da Carteira (O "Guarda")

### 3.5. Stubs de Serviço (Paridade de Plataforma)

## 4. Roteamento e Estrutura de UI (Next.js)

### 4.1. Layout Raiz (Provedor de Contexto)

### 4.2. Guarda de Rota (Proteção de Páginas)

### 4.3. Tela de Login (Exibição do QR Code)

### 4.4. Telas Protegidas (Exemplo: Dashboard)

