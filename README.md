# FarmaWeb API

API backend de um **e-commerce de farmácia**, desenvolvida em **Node.js com Express.js**, responsável por autenticação, autorização e gerenciamento das regras de negócio do sistema.

Este projeto foi desenvolvido durante uma **residência técnica**, simulando um ambiente real de produção, com foco em **boas práticas de backend**, segurança, organização de código e padrões utilizados no mercado.

---

## Visão Geral

A **FarmaWeb API** fornece toda a base backend necessária para o funcionamento de um sistema de e-commerce farmacêutico, incluindo:

- Autenticação e autorização de usuários
- Controle de acesso com JWT (Access Token e Refresh Token)
- Organização em camadas
- Separação clara de responsabilidades
- Estrutura preparada para evolução e escalabilidade

---

## Arquitetura do Projeto

O projeto segue uma **arquitetura em camadas**, amplamente utilizada em aplicações backend corporativas, facilitando manutenção, testes e evolução do sistema.

```text
src/
├── auth/           # Autenticação, geração e validação de tokens
├── config/         # Configurações da aplicação
├── controllers/    # Controllers (camada de entrada HTTP)
├── routes/         # Definição das rotas da API
├── services/       # Regras de negócio e lógica da aplicação
└── server.js       # Ponto de entrada da aplicação
````

### Controllers

Responsáveis por:

* Receber e tratar requisições HTTP
* Validar dados de entrada
* Delegar a lógica de negócio para a camada de services

### Services

Responsáveis por:

* Implementar as regras de negócio
* Centralizar a lógica do domínio
* Evitar acoplamento com a camada HTTP

### Routes

Responsáveis por:

* Definir os endpoints da API
* Aplicar middlewares (autenticação, validações, etc.)

---

## Autenticação e Segurança

A API utiliza **JWT (JSON Web Token)** com **Access Token e Refresh Token**, seguindo padrões modernos de autenticação utilizados no mercado.

### Fluxo de Autenticação

1. O usuário realiza login
2. A API retorna:

   * Access Token (curta duração)
   * Refresh Token (longa duração)
3. O Access Token é utilizado para acessar rotas protegidas
4. Quando o Access Token expira:

   * O cliente envia o Refresh Token
   * A API valida e gera um novo Access Token
5. Caso o Refresh Token seja inválido ou expirado, o usuário deve autenticar novamente

### Funcionalidades de Segurança

* Autenticação baseada em JWT
* Uso de Access Token de curta duração
* Uso de Refresh Token para renovação segura de sessão
* Middleware para validação de token
* Proteção de rotas privadas
* Separação clara entre autenticação e regras de negócio

---

## Tecnologias Utilizadas

* Node.js
* Express.js
* JavaScript
* JWT (jsonwebtoken)
* REST API
* Arquitetura em camadas

---

## Instalação e Execução

### Pré-requisitos

* Node.js (versão 16 ou superior)
* npm ou yarn

### Passos para executar o projeto

```bash
# Clonar o repositório
git clone <url-do-repositorio>

# Acessar o diretório do projeto
cd farmaweb-api

# Instalar dependências
npm install

# Iniciar a aplicação
npm run dev 
```

A API ficará disponível em:

```
http://localhost:3000
```

(ou a porta configurada no projeto)

---

## Boas Práticas Adotadas

* Separação clara de responsabilidades
* Código modular e organizado
* Uso de middlewares para autenticação
* Estrutura alinhada com padrões de backend corporativo
* Implementação de autenticação segura com refresh token
* Projeto desenvolvido em contexto real de residência técnica

---

## Diferenciais do Projeto

* Backend completo de um e-commerce farmacêutico
* Autenticação com Access Token e Refresh Token
* Arquitetura em camadas bem definida
* Código organizado e de fácil manutenção
* Estrutura preparada para evolução do sistema
* Projeto alinhado com exigências do mercado de trabalho



