# Documentação da API

## Introdução

Bem-vindo à documentação da API do projeto XYZ. Esta API é desenvolvida em Node.js com TypeScript, usando Prisma para acesso ao banco de dados, Jest para testes e autenticação JWT.

## Autenticação

A API utiliza autenticação JWT. Para acessar as rotas protegidas, você deve incluir um token JWT válido no cabeçalho da solicitação.

### Rota de Login

#### `POST /api/login`

Autentica um usuário e gera um token JWT.

### Usuários

#### `POST /api/user/create`

Cria um novo usuário.

#### `GET /api/users`

Retorna a lista de todos os usuários.

#### `GET /api/user/:id`

Retorna as informações do usuário pelo ID.

#### `PUT /api/user/update/:id`

Atualiza as informações do usuário pelo ID.

#### `DELETE /api/user/delete/:id`

Exclui o usuário pelo ID.

## Testes

A API utiliza Jest para testes automatizados. Execute os testes usando o comando:

```bash
npx jest
