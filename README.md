# Especificação Técnica Completa - Painel Web

## 1. Visão Geral e Conceito Central

### 1.1. Propósito do Aplicativo

Este documento detalha a arquitetura e implementação técnica do Painel Web, um aplicativo web "cliente leve" (light-client).

O Painel Web funciona como uma interface de visualização segura e de "apenas leitura" para um aplicativo móvel nativo (o "Cofre"). O "Cofre" é a única fonte de verdade para chaves privadas e lógica de assinatura.

### 1.2. Restrição de Segurança Mandatória

A arquitetura é projetada com uma restrição de segurança primária, que é inegociável:

**O cliente web NUNCA deve, sob NENHUMA circunstância, lidar com chaves privadas, mnemônicas (frases-semente) ou qualquer lógica de assinatura de transação.**

Todo o fluxo de autenticação e execução de ações sensíveis é "assistido", exigindo que o usuário aprove as ações explicitamente no "Cofre" móvel.

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

A lógica do aplicativo é dividida em serviços (lógica de negócios), contexto (estado global) e a API de back-end.

### 3.1. Gerenciamento de Estado Global (A "Cola")

O `AuthContext` é o componente "cliente" que gerencia o estado de login no navegador. Ele armazena o token de sessão no `sessionStorage` para garantir que a sessão termine quando o navegador for fechado.

**Arquivo**: `contexts/AuthContext.tsx`

'''tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

// --- Tipos ---
interface AuthState {
  token: string | null;
  user: any | null; // Tipar o 'user' adequadamente
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  loginWithToken: (token: string, userData: any) => void;
  logout: () => void;
}

// --- Constantes ---
const TOKEN_KEY = "app-session-token";
const USER_KEY = "app-session-user";

// --- Contexto ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Provedor ---
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    user: null,
    isAuthenticated: false,
    isLoading: true, // Começa carregando para verificar a sessão
  });
  const router = useRouter();

  // Efeito para verificar a sessão no carregamento inicial
  useEffect(() => {
    try {
      const storedToken = sessionStorage.getItem(TOKEN_KEY);
      const storedUser = sessionStorage.getItem(USER_KEY);

      if (storedToken && storedUser) {
        setAuthState({
          token: storedToken,
          user: JSON.parse(storedUser),
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        setAuthState((s) => ({ ...s, isLoading: false }));
      }
    } catch (error) {
      console.error("Falha ao carregar sessão:", error);
      setAuthState({
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  // Função de Login
  const loginWithToken = (token: string, userData: any) => {
    try {
      sessionStorage.setItem(TOKEN_KEY, token);
      sessionStorage.setItem(USER_KEY, JSON.stringify(userData));

      setAuthState({
        token: token,
        user: userData,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Falha ao salvar sessão:", error);
      logout();
    }
  };

  // Função de Logout
  const logout = () => {
    try {
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error("Falha ao limpar sessão:", error);
    } finally {
      setAuthState({
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      // Redireciona para o login ao sair
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, loginWithToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- Hook ---
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
'''

### 3.2. Lógica de Autenticação Web (O "Ponto de Entrada")

Este serviço de frontend orquestra o fluxo de login. Ele solicita o desafio ao back-end e inicia o "polling" (verificação periódica) para ver se o "Cofre" aprovou o login.

**Arquivo**: `services/AuthService.ts`

'''ts
import axios from "axios";

// URL base da API (pode vir de variáveis de ambiente)
const API_URL = "/api/auth";

// Tipos para as callbacks
type LoginSuccessCallback = (token: string, userData: any) => void;
type LoginFailCallback = (errorMessage: string) => void;

/**
 * Solicita um novo desafio de QR Code ao back-end.
 */
export const getChallenge = async (): Promise<string> => {
  try {
    const response = await axios.get(`${API_URL}/challenge`);
    // O backend retorna { challenge: "..." }
    return response.data.challenge;
  } catch (error) {
    console.error("Erro ao obter desafio:", error);
    throw new Error("Não foi possível conectar ao servidor.");
  }
};

/**
 * Inicia o fluxo de autenticação web (QR Code Polling).
 * @param challenge O desafio único gerado para este QR Code.
 * @param onLoginSuccess Callback do AuthContext para salvar o token.
 * @param onLoginFail Callback para caso de erro ou expiração.
 */
export const startLoginPolling = (
  challenge: string,
  onLoginSuccess: LoginSuccessCallback,
  onLoginFail: LoginFailCallback
) => {
  const pollInterval = 2500; // 2.5 segundos
  let isPolling = true;

  const poll = async () => {
    if (!isPolling) return; // Para o polling se stopPolling() for chamado

    try {
      const response = await axios.post(`${API_URL}/status`, { challenge });

      switch (response.data.status) {
        case "completed":
          // SUCESSO! O back-end retornou o JWT e os dados do usuário.
          isPolling = false;
          const { token, user } = response.data;
          onLoginSuccess(token, user);
          break;

        case "pending":
          // O usuário ainda não escaneou. Continua o polling.
          setTimeout(poll, pollInterval);
          break;

        case "expired":
        case "failed":
          // O desafio expirou ou falhou.
          isPolling = false;
          onLoginFail("QR Code expirado ou inválido.");
          break;
      }
    } catch (error) {
      // Erro de rede, continua tentando...
      console.warn("Erro no polling, tentando novamente:", error);
      if (isPolling) {
        setTimeout(poll, pollInterval);
      }
    }
  };

  // Inicia o primeiro polling
  poll();

  // Retorna uma função para parar o polling (ex: se o usuário sair da página)
  return () => {
    isPolling = false;
  };
};
'''

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

Este arquivo é a implementação única do `WalletService` no projeto Next.js. Sua única função é impedir que qualquer lógica de carteira seja executada.

**Arquivo**: `services/WalletService.ts`

'''ts
/**
 * Este arquivo atua como uma trava de segurança.
 * Ele define a interface do serviço de carteira, mas dispara
 * um erro em CADA função para impedir a execução na web.
 */

const throwWebError = (operation: string): never => {
  const message = `Operação de carteira (${operation}) não é permitida no cliente web.`;
  console.error(`VIOLAÇÃO DE SEGURANÇA: ${message}`);
  throw new Error(message);
};

// --- Funções da Interface ---

export const signTransaction = async (tx: any): Promise<any> => {
  return throwWebError("signTransaction");
};

export const getPrivateKey = async (): Promise<string> => {
  return throwWebError("getPrivateKey");
};

export const getPublicKey = async (): Promise<string> => {
  return throwWebError("getPublicKey");
};

export const createWallet = async (): Promise<any> => {
  return throwWebError("createWallet");
};

export const restoreWallet = async (mnemonic: string): Promise<any> => {
  return throwWebError("restoreWallet");
};

// ... adicione qualquer outra função da interface do "Cofre" aqui
'''

### 3.5. Stubs de Serviço (Paridade de Plataforma)

Um arquivo "stub" para serviços que existem no nativo mas não no web.

**Arquivo**: `services/NotificationService.ts`

'''ts
/**
 * Implementação "Stub" do Serviço de Notificação para a web.
 * Não faz nada, apenas loga avisos.
 */

export const registerForPushNotifications = async () => {
  console.warn("Push Notifications não são suportadas nesta plataforma web.");
  return null;
};

export const handleNotification = (notification: any) => {
  console.warn("handleNotification (web stub) chamado.", notification);
};
'''

## 4. Roteamento e Estrutura de UI (Next.js)

### 4.1. Layout Raiz (Provedor de Contexto)

Configura o `AuthProvider` em torno de toda a aplicação.

**Arquivo**: `app/layout.tsx`

'''tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Assumindo Tailwind
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Painel Web",
  description: "Painel de Leitura Seguro",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
'''

### 4.2. Guarda de Rota (Proteção de Páginas)

Este componente cliente usa o `AuthContext` para proteger rotas. Ele redireciona usuários não autenticados para `/login` e usuários autenticados para `/dashboard`.

**Arquivo**: `components/AuthGuard.tsx`

'''tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

// Seu componente de Spinner/Loading
const FullScreenLoader = () => (
  <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
    <div className="text-2xl font-semibold">Carregando...</div>
  </div>
);

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return; // Espera o AuthContext terminar de carregar

    const isAuthPage = pathname === "/login";

    // Se não está autenticado e NÃO está na página de login, redireciona para /login
    if (!isAuthenticated && !isAuthPage) {
      router.push("/login");
    }

    // Se está autenticado e tentando acessar o login, redireciona para o dashboard
    if (isAuthenticated && isAuthPage) {
      router.push("/dashboard"); // Rota principal
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  // Mostra um spinner enquanto verifica a sessão
  if (isLoading) {
    return <FullScreenLoader />;
  }

  // Permite acesso se autenticado, ou se for a própria página de login (e não está autenticado)
  if ((isAuthenticated && pathname !== "/login") || (!isAuthenticated && pathname === "/login")) {
    return <>{children}</>;
  }

  // Bloqueia a renderização e espera o redirecionamento
  return <FullScreenLoader />;
}
'''

### 4.3. Tela de Login (Exibição do QR Code)

Esta página usa o `AuthGuard` (para redirecionar se já logado) e implementa a lógica de exibição do QR Code.

**Arquivo**: `app/login/page.tsx`

'''tsx
"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getChallenge, startLoginPolling } from "@/services/AuthService";
import { QRCode } from "react-qrcode-logo"; // Uma alternativa popular a 'qrcode.react'
import AuthGuard from "@/components/AuthGuard";

function LoginPageContent() {
  const { loginWithToken } = useAuth();
  const [challenge, setChallenge] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Efeito para buscar o desafio e iniciar o polling
  useEffect(() => {
    let stopPolling: (() => void) | undefined;

    const initLoginFlow = async () => {
      setError(null);
      setChallenge(null);
      try {
        const newChallenge = await getChallenge();
        setChallenge(newChallenge);

        // Inicia o polling
        stopPolling = startLoginPolling(
          newChallenge,
          loginWithToken, // Callback de sucesso
          (errorMsg) => setError(errorMsg) // Callback de falha/expiração
        );
      } catch (err) {
        setError("Não foi possível carregar o QR Code. Verifique sua conexão.");
      }
    };

    initLoginFlow();

    // Limpa o polling se o componente for desmontado
    return () => {
      if (stopPolling) {
        stopPolling();
      }
    };
  }, [loginWithToken]); // Executa apenas uma vez

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <p className="text-gray-600 mb-6">
          Escaneie este QR Code com o app "Cofre" para fazer login.
        </p>
        
        <div className="h-64 w-64 mx-auto flex items-center justify-center">
          {error && (
            <div className="text-red-500 p-4 border border-red-300 rounded-lg">
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()} // Simples "re-tentativa"
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Tentar Novamente
              </button>
            </div>
          )}
          {!challenge && !error && (
            <div className="text-gray-500">Gerando QR Code...</div>
          )}
          {challenge && !error && (
            <QRCode value={challenge} size={256} />
          )}
        </div>
      </div>
    </div>
  );
}

// Envolve a página com o AuthGuard
export default function LoginPage() {
  return (
    <AuthGuard>
      <LoginPageContent />
    </AuthGuard>
  );
}
'''

### 4.4. Telas Protegidas (Exemplo: Dashboard)

As telas protegidas usam o `AuthGuard` em seu layout.

**Arquivo**: `app/dashboard/layout.tsx`

'''tsx
import AuthGuard from "@/components/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // O AuthGuard garante que apenas usuários logados cheguem aqui
  return <AuthGuard>{children}</AuthGuard>;
}
'''

**Arquivo**: `app/dashboard/page.tsx`

'''tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user, token, logout } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Exemplo de carregamento de dados protegidos
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        setLoading(true);
        // Esta rota '/api/dashboard-data' deve ser protegida (Cloudflare Worker)
        // O Worker deve verificar o Bearer Token (JWT)
        const response = await axios.get("/api/dashboard-data", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          // Token inválido ou expirado
          logout();
        } else {
          console.error("Erro ao buscar dados:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, logout]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra de Navegação Simples */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Painel</h1>
        <div>
          <span className="text-gray-700 mr-4">
            Olá, {user?.name || "Usuário"}
          </span>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Sair
          </button>
        </div>
      </nav>

      {/* Conteúdo da Página */}
      <main className="p-8">
        <h2 className="text-2xl font-semibold mb-6">Seus Dados</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {loading && <p>Carregando dados...</p>}
          {!loading && data && (
            <pre className="overflow-x-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
          {!loading && !data && (
            <p>Não foi possível carregar os dados.</p>
          )}
        </div>
      </main>
    </div>
  );
}
'''
