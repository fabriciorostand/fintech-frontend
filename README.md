# Fintech Frontend

Sistema de gerenciamento financeiro desenvolvido como projeto da FIAP.

## 📋 Descrição

Aplicação web para gestão financeira pessoal, permitindo controle de contas bancárias, transações, investimentos e análise de despesas. Desenvolvido com React, TypeScript e Vite.

## 🚀 Tecnologias Utilizadas

- **React** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool e dev server de alta performance
- **TypeScript** - Superset JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utility-first
- **React Router DOM** - Roteamento para aplicações React
- **TanStack Query (React Query)** - Gerenciamento de estado assíncrono e cache
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

## 👤 Dados de Autenticação - Usuário de Teste

Para facilitar os testes da aplicação, você pode utilizar as seguintes credenciais:

**Email:** `teste@email.com`  
**Senha:** `12345678`

> **Nota:** Também é possível criar uma nova conta através da página de cadastro.

## 📁 Estrutura do Projeto

```
fintech-frontend/
├── public/            # Arquivos estáticos públicos
├── src/
│   ├── assets/        # Imagens e recursos
│   ├── components/    # Componentes React reutilizáveis
│   │   ├── ui/        # Componentes de interface
│   ├── contexts/      # Context API para gerenciamento de estado
│   ├── hooks/         # React Hooks customizados
│   ├── pages/         # Páginas da aplicação
│   ├── services/      # Serviços e lógica de API
│   │   ├── types/        # TypeScript tipos e interfaces
│   ├── app.tsx        # Componente principal da aplicação
│   ├── main.tsx       # Ponto de entrada da aplicação
│   └── index.css      # Estilos globais
├── index.html         # Template HTML
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