# Fintech Frontend

Sistema de gerenciamento financeiro desenvolvido como projeto da FIAP.

## 📋 Descrição

Aplicação web para gestão financeira pessoal, permitindo controle de contas bancárias, transações, investimentos e análise de despesas. Desenvolvido com React, TypeScript e Vite.

## 🚀 Tecnologias Utilizadas

- **React 19** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e dev server de alta performance
- **React Router DOM** - Roteamento para aplicações React
- **TanStack Query (React Query)** - Gerenciamento de estado assíncrono e cache
- **Tailwind CSS v4** - Framework CSS utility-first
- **React Icons** - Biblioteca de ícones
- **ESLint** - Linter para identificação de problemas no código

## 📦 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 18 ou superior)
- **npm** (geralmente vem com Node.js) ou **yarn** ou **pnpm**
- **Git** (para clonar o repositório)

## 🔧 Instruções de Inicialização

### 1. Clone o repositório

```bash
git clone https://github.com/fabriciorostand/fintech-frontend.git
cd fintech-frontend
```

### 2. Instale as dependências

Usando npm:
```bash
npm install
```

Ou usando yarn:
```bash
yarn install
```

Ou usando pnpm:
```bash
pnpm install
```

### 3. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:5173`

### 4. Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera build de produção otimizado |
| `npm run lint` | Executa o ESLint para verificar problemas no código |
| `npm run preview` | Preview da build de produção localmente |

## 📁 Estrutura do Projeto

```
fintech-frontend/
├── public/              # Arquivos estáticos públicos
├── src/
│   ├── assets/         # Imagens e recursos
│   ├── components/     # Componentes React reutilizáveis
│   │   ├── ui/        # Componentes de interface (buttons, forms, modals)
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── ...
│   ├── hooks/         # Custom React Hooks
│   ├── pages/         # Páginas da aplicação
│   │   ├── index.tsx
│   │   ├── dashboard.tsx
│   │   ├── transactions.tsx
│   │   ├── bank-accounts.tsx
│   │   ├── investments.tsx
│   │   └── ...
│   ├── services/      # Serviços e lógica de API
│   │   ├── types/    # TypeScript tipos e interfaces
│   │   └── ...
│   ├── app.tsx       # Componente principal da aplicação
│   ├── main.tsx      # Ponto de entrada da aplicação
│   └── index.css     # Estilos globais
├── index.html         # Template HTML
├── package.json       # Dependências e scripts
├── tsconfig.json      # Configuração TypeScript
├── vite.config.ts     # Configuração Vite
└── eslint.config.js   # Configuração ESLint
```

## 🎯 Funcionalidades

- ✅ Autenticação de usuários (Login/Cadastro)
- ✅ Dashboard com visão geral financeira
- ✅ Gerenciamento de contas bancárias
- ✅ Registro e controle de transações
- ✅ Categorização de despesas e receitas
- ✅ Gestão de investimentos
- ✅ Modo escuro/claro
- ✅ Interface responsiva

## 🛠️ Build para Produção

Para gerar uma versão otimizada para produção:

```bash
npm run build
```

Os arquivos otimizados serão gerados no diretório `dist/`.

Para testar a build localmente:

```bash
npm run preview
```

## 🐛 Desenvolvimento

### Verificação de Código

Execute o linter para identificar problemas:

```bash
npm run lint
```

### Configuração do Editor

Recomendamos usar **Visual Studio Code** com as seguintes extensões:

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)

## 📄 Licença

Este projeto está sob a licença especificada no arquivo [LICENSE](LICENSE).