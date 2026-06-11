# 🎵 Music Prisma Backend

API backend para gerenciamento de músicas, desenvolvida com **Node.js**, **Express** e **Prisma ORM**.

O projeto foi criado para praticar conceitos de desenvolvimento backend, como criação de APIs REST, organização de rotas, integração com banco de dados, uso de ORM e separação entre frontend simples e camada backend.

![Node.js](https://img.shields.io/badge/Node.js-green?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-black?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-yellow?style=for-the-badge&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-blue?style=for-the-badge)
![Projeto](https://img.shields.io/badge/tipo-backend%20api-purple?style=for-the-badge)

---

## 🎯 Objetivo

Construir uma aplicação backend para cadastro e gerenciamento de músicas, utilizando uma API REST conectada a um banco de dados por meio do Prisma.

Este projeto faz parte da minha evolução como desenvolvedor backend, com foco em:

- Criação de APIs com Node.js e Express
- Integração com banco de dados usando Prisma
- Organização de estrutura backend
- Manipulação de dados via requisições HTTP
- Separação entre backend e frontend
- Uso de variáveis de ambiente
- Boas práticas com Git e GitHub

---

## 📌 Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| Cadastro de músicas | Permite registrar músicas no sistema |
| Listagem de músicas | Retorna as músicas cadastradas |
| Atualização de registros | Permite alterar informações de músicas |
| Remoção de registros | Permite excluir músicas cadastradas |
| Integração com banco de dados | Utiliza Prisma ORM para comunicação com o banco |
| Frontend simples | Interface básica para consumir a API |

> As funcionalidades podem variar conforme a versão atual do projeto.

---

## 🛠️ Tecnologias utilizadas

- **Node.js**
- **Express.js**
- **Prisma ORM**
- **JavaScript**
- **HTML5**
- **CSS3**
- **Banco de dados relacional**
- **Git e GitHub**

---

## 🗂️ Estrutura do projeto

```text
music-prisma-backend/
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
├── prisma/
│   └── schema.prisma
│
├── server.js
├── package.json
├── package-lock.json
├── prisma.config.ts
├── .env.example
├── .gitignore
├── README.md
└── LICENSE
```

---

## ⚠️ Arquivos que não devem ser enviados ao GitHub

Antes de subir o projeto, confirme que estes arquivos e pastas **não** estão sendo enviados:

```text
node_modules/
.env
```

O arquivo `.env` pode conter dados sensíveis, como URL do banco de dados, senhas ou tokens. Por isso, ele deve ficar apenas no seu computador.

No GitHub, envie somente o arquivo `.env.example`, que serve como modelo para outras pessoas configurarem o projeto.

---

## 🔐 Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`.

Exemplo:

```env
DATABASE_URL="sua_url_do_banco_aqui"
PORT=3000
```

---

## ▶️ Como executar o projeto

Clone o repositório:

```bash
git clone https://github.com/luancabral1/music-prisma-backend.git
```

Acesse a pasta do projeto:

```bash
cd music-prisma-backend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` com base no `.env.example`:

```bash
cp .env.example .env
```

Gere o Prisma Client:

```bash
npx prisma generate
```

Execute as migrações do banco de dados, se o projeto utilizar migrations:

```bash
npx prisma migrate dev
```

Inicie o servidor:

```bash
npm run dev
```

Caso o projeto não tenha script `dev`, execute:

```bash
node server.js
```

---

## 🌐 Frontend

O projeto possui uma interface simples localizada na pasta `frontend/`.

Após iniciar o backend, abra o arquivo abaixo no navegador:

```text
frontend/index.html
```

A interface pode ser usada para testar o consumo da API localmente.

---

## 🧪 Testando a API

Você pode testar as rotas da API usando:

- Navegador
- Insomnia
- Postman
- Thunder Client
- Frontend do próprio projeto

Exemplo de URL local:

```text
http://localhost:3000
```

> Ajuste a porta conforme a configuração utilizada no projeto.

---

## 🧠 O que aprendi

Durante o desenvolvimento deste projeto, pratiquei conceitos importantes de backend:

- Criação de servidor com Express
- Definição de rotas HTTP
- Manipulação de requisições e respostas
- Integração com banco de dados usando Prisma
- Criação e organização do `schema.prisma`
- Uso de variáveis de ambiente
- Separação entre backend e frontend
- Organização de projeto para publicação no GitHub

---

## 🚀 Próximos passos

Algumas melhorias que podem ser adicionadas futuramente:

- Melhorar a organização do backend em pastas como `routes`, `controllers` e `services`
- Adicionar validação de dados nas requisições
- Criar tratamento de erros mais completo
- Documentar endpoints com Swagger
- Adicionar testes automatizados
- Implementar paginação e filtros
- Criar deploy da API
- Conectar o frontend a uma versão publicada do backend

---

## 🧾 Status do projeto

Projeto em desenvolvimento e aberto para melhorias.

---

## 👤 Autor

Desenvolvido por **Luan Cabral**.

- GitHub: [@luancabral1](https://github.com/luancabral1)
- LinkedIn: [Luan Cabral](https://www.linkedin.com/in/luan-cabral-307784378/)

---

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
