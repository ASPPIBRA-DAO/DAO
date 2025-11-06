# Documentação do Projeto: DAO App

## 1. Visão Geral do Projeto

- **Nome do Projeto:** dao
- **Versão:** 1.0.0
- **Scheme:** dao
- **Objetivo:** Este projeto é um aplicativo universal (iOS, Android, Web) construído com base em um template Expo moderno. Ele serve como uma fundação robusta para o desenvolvimento de um aplicativo rico em funcionalidades, já vindo com uma estrutura organizada, roteamento configurado e suporte a temas (claro/escuro).

### 1.1. Tecnologias Principais

- **Linguagem:** TypeScript
- **Framework:** React Native
- **Plataforma:** Expo
- **Roteamento:** Expo Router (roteamento baseado em arquivos)
- **Estilização:** StyleSheet do React Native e suporte a temas dinâmicos.

---

## 2. Estrutura de Diretórios

A estrutura do projeto foi desenhada para ser escalável e organizada, separando as responsabilidades de forma clara.

```
/
├── app/                  # Contém as telas e a lógica de roteamento
│   ├── (tabs)/           # Define o grupo de rotas para a navegação por abas
│   │   ├── _layout.tsx   # Layout da navegação por abas (configura as abas)
│   │   ├── index.tsx     # Tela "Home" (primeira aba)
│   │   └── explore.tsx   # Tela "Explore" (segunda aba)
│   ├── _layout.tsx       # Layout raiz da aplicação. Define o provedor de tema e fontes.
│   └── modal.tsx         # Exemplo de uma tela modal
│
├── assets/               # Arquivos estáticos
│   └── images/           # Imagens, ícones, etc.
│
├── components/           # Componentes React reutilizáveis
│   ├── ui/               # Componentes de UI mais genéricos (ex: Collapsible)
│   ├── external-link.tsx # Componente para links externos
│   ├── hello-wave.tsx    # Exemplo de componente com animação
│   ├── parallax-scroll-view.tsx # Componente para efeito parallax no cabeçalho
│   ├── themed-text.tsx   # Componente de Texto que suporta temas
│   └── themed-view.tsx   # Componente de View que suporta temas
│
├── constants/            # Arquivos com valores constantes
│   └── theme.ts          # Definição de cores e fontes para os temas
│
├── hooks/                # Hooks React customizados
│   └── use-color-scheme.ts # Hook para detectar o tema (claro/escuro) do dispositivo
│
├── scripts/              # Scripts de utilidade para o projeto
│   └── reset-project.js  # Script para limpar o app de exemplo e começar do zero
│
├── .vscode/              # Configurações do VS Code
├── .idx/                 # Configurações do IDX
├── node_modules/         # Dependências do projeto
│
├── app.json              # Arquivo de configuração principal do Expo
├── package.json          # Lista de dependências e scripts do projeto
├── tsconfig.json         # Configurações do compilador TypeScript
└── DOCUMENTATION.md      # Este arquivo
```

---

## 3. Roteamento e Navegação

O projeto utiliza o **Expo Router**, que cria as rotas do aplicativo com base na estrutura de arquivos dentro do diretório `/app`.

- **Layout Raiz (`app/_layout.tsx`):** É o ponto de entrada da aplicação. Ele envolve todo o app com provedores de contexto, como o `ThemeProvider` para o tema claro/escuro.
- **Navegação por Abas (`app/(tabs)/_layout.tsx`):** Este arquivo configura a `Tabs` navigator. Cada arquivo dentro de `(tabs)/` se torna uma aba. Ícones e nomes das abas são definidos aqui.
- **Adicionando Novas Telas:** Para criar uma nova tela, simplesmente adicione um novo arquivo `.tsx` no diretório `app`. Por exemplo, criar `app/settings.tsx` irá automaticamente criar a rota `/settings`.
- **Navegação Programática:** Para navegar entre as telas, utilize o hook `useRouter` do `expo-router`. Ex: `router.push('/settings')`.

---

## 4. Arquitetura de Desenvolvimento: Nativo e Web

A principal vantagem deste projeto é a sua capacidade de ser uma **base de código única e adaptativa**. A filosofia central a ser seguida é: **"Compartilhe por padrão, especialize quando necessário."**

Isso significa que quase todo o código que você escreve deve funcionar em todas as plataformas (iOS, Android, Web) por padrão. A especialização só ocorre quando há um motivo técnico forte.

### 4.1. A Camada Compartilhada (90% do Código)

Esta é a área principal do desenvolvimento. A maioria das funcionalidades deve residir aqui.

- **`app/`**: Telas, fluxos de navegação e layouts. Telas como Login, Perfil e Feed devem ser construídas uma vez para funcionar em todas as plataformas.
- **`components/`**: Componentes de UI reutilizáveis (`Botão`, `Card`, `Input`).
- **`hooks/` & `services/`**: **TODA** a lógica de negócio, estado e comunicação com APIs. Funções de busca de dados, validações e regras de negócio são universais por natureza.

### 4.2. A Camada Específica (10% do Código)

Quando uma funcionalidade precisa de um tratamento diferente para web ou nativo, usamos as seguintes estratégias:

#### A. Extensões de Arquivo Específicas

Crie arquivos com sufixos de plataforma. O sistema escolherá o correto automaticamente no momento da compilação.

- `.native.tsx`: Apenas para iOS e Android.
- `.web.tsx`: Apenas para a Web.
- `.ios.tsx`: Apenas para iOS.
- `.android.tsx`: Apenas para Android.

**Exemplo de Uso:** Um componente `DatePicker`.
- `components/DatePicker.native.tsx` usaria o componente nativo do sistema operacional.
- `components/DatePicker.web.tsx` usaria uma biblioteca de calendário baseada em React para a web.
- No seu código, você simplesmente importaria `from '@/components/DatePicker'`.

#### B. API `Platform`

Para pequenas diferenças dentro de um mesmo componente, use o módulo `Platform` do React Native.

**Exemplo de Uso:** Um botão de "Compartilhar".
```tsx
import { Platform, Share } from 'react-native';

const ShareButton = ({ content }) => {
  const onPress = async () => {
    if (Platform.OS === 'web') {
      // Na web, copia para a área de transferência.
      await navigator.clipboard.writeText(content.url);
      alert('Link copiado!');
    } else {
      // No nativo, abre o menu de compartilhamento do sistema.
      await Share.share({ message: content.message });
    }
  };
  // ...
}
```

### 4.3. Guia de Decisão: Web vs. Nativo

| Funcionalidade | Plataforma Principal | Estratégia de Arquitetura |
| :--- | :--- | :--- |
| **Login / Perfil / Feed** | **Compartilhada** | Crie telas e componentes únicos que funcionem em todas as plataformas. |
| **Notificações Push** | **Nativo** | Use a API `Platform` para registrar o dispositivo apenas em iOS e Android. |
| **Acesso à Câmera/QR Code** | **Nativo (Prioritário)** | Crie `QRScanner.native.tsx`. A versão web pode ter uma implementação alternativa ou um placeholder. |
| **Landing Page / Blog** | **Web (Prioritário)** | Otimize para SEO. Pode-se criar um grupo de rotas exclusivo para a web, como `app/(web)/...` |
| **Painel de Admin / Dashboards**| **Web** | Crie rotas específicas com `.web.tsx` para uma melhor experiência em telas grandes. |
| **Funcionalidade Offline** | **Nativo** | Use a API `Platform` para ativar a lógica de armazenamento local apenas em iOS e Android. |

---

## 5. Componentes e Estilização

### 5.1. Componentes Reutilizáveis

- A pasta `components` é o local para todos os componentes que podem ser usados em mais de uma tela.
- **Componentes Temáticos (`ThemedView`, `ThemedText`):** Use estes componentes em vez dos `View` e `Text` padrão do React Native. Eles foram projetados para se adaptar automaticamente ao tema claro ou escuro do aplicativo, utilizando as cores definidas em `constants/theme.ts`.

### 5.2. Estilização e Tema

- **Cores e Fontes:** As cores para os modos claro e escuro, bem como as fontes, são centralizadas no arquivo `constants/theme.ts`. Modifique este arquivo para alterar a paleta de cores global.
- **Hook `useColorScheme`:** Este hook (`hooks/use-color-scheme.ts`) obtém o tema atual do dispositivo ("light" ou "dark").
- **StyleSheet:** A estilização dos componentes é feita usando `StyleSheet.create` do React Native para otimização e melhor organização do código.

---

## 6. Scripts e Comandos Úteis

Os seguintes comandos estão disponíveis no `package.json`:

- `npm start`: Inicia o servidor de desenvolvimento do Expo.
- `npm run android`: Inicia o aplicativo no emulador Android ou dispositivo conectado.
- `npm run ios`: Inicia o aplicativo no simulador iOS ou dispositivo conectado.
- `npm run web`: Inicia a versão web do aplicativo em um navegador.
- **`npm run reset-project`**: **(IMPORTANTE)** Este script executa `scripts/reset-project.js`. Ele move o conteúdo atual do diretório `/app` para `/app-example` e cria um diretório `/app` limpo com um único arquivo `index.tsx`. É perfeito para quando você terminar de explorar o template e quiser começar a construir seu próprio aplicativo.

---

## 7. Guia para Desenvolvimento Futuro

### 7.1. Adicionar uma Nova Funcionalidade (Ex: Tela de Perfil)

1.  **Criar a Tela:** Adicione um novo arquivo `profile.tsx` dentro de `app/(tabs)/` para que ele apareça como uma nova aba.
    ```tsx
    // app/(tabs)/profile.tsx
    import { ThemedText, ThemedView } from '@/components/themed-view';

    export default function ProfileScreen() {
      return (
        <ThemedView>
          <ThemedText type="title">Meu Perfil</ThemedText>
        </ThemedView>
      );
    }
    ```

2.  **Configurar a Aba:** Abra `app/(tabs)/_layout.tsx` e adicione a nova `Tabs.Screen` para o perfil.
    ```tsx
    // ...
    <Tabs.Screen
      name="profile"
      options={{
        title: 'Perfil',
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
        ),
      }}
    />
    //...
    ```

### 7.2. Onde colocar a Lógica de Negócio?

- **Hooks Customizados:** Para lógica reutilizável (ex: buscar dados de um usuário, gerenciar estado de um carrinho), crie hooks customizados na pasta `/hooks`.
- **Serviços/Utils:** Para funções que se conectam a APIs externas ou realizam cálculos complexos, você pode criar uma nova pasta `/services` ou `/utils` na raiz do projeto.

### 7.3. Integração com Back-end

1.  Crie um diretório `/services` na raiz.
2.  Dentro de `/services`, crie um arquivo como `api.ts`.
3.  Use `fetch` ou uma biblioteca como `axios` para fazer chamadas HTTP para sua API.
4.  Crie um hook customizado (ex: `useUserProfile`) que utilize este serviço para buscar os dados e gerenciá-los (estado de loading, erro, dados).
5.  Use este hook nas suas telas para exibir os dados.
