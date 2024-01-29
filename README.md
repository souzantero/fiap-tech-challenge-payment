# FIAP TECH CHALLENGE PAYMENT

## Primeiros Passos

Estas instruções irão ajudá-lo a obter uma cópia do projeto em sua máquina local para fins de desenvolvimento e testes.

### Pré-requisitos

O que você precisa instalar na sua máquina local.

- Node.js (v20.11)
- Docker

### Instalação

Como configurar o ambiente de desenvolvimento.

```bash
# Clone o repositório
git clone https://github.com/souzantero/fiap-tech-challenge-payment.git

# Acesse o diretório
cd fiap-tech-challenge-payment/

# Instale as dependências
npm install
```

## Iniciando o servidor

Como iniciar o servidor em modo de desenvolvimento.

Crie um arquivo `.env` na raiz do diretório e cole o seguinte conteúdo.

```
DATABASE_URL=mongodb://root:mongopass@localhost:27017/paymentdb?authSource=admin
```

Execute o serviço Docker Compose para iniciar o PostgreSQL.

```bash
docker-compose up -d database
```

Inicie a aplicação.

```bash
npm run start:dev
```

Para iniciar em modo de produção.

```bash
npm run build
npm run start
```

Como iniciar o servidor com o Docker Compose

Execute o serviço Docker Compose para iniciar o servidor Node.js.

```bash
docker-compose up -d server
```

## Open API

Para acessar o painel Open API e visualizar os endpoints disponíveis na API. 

`http://localhost:{port}/api/docs`

## Construído com

- [Node.js](http://www.nodejs.org/) - A estrutura do servidor em tempo de execução.
- [TypeScript](https://www.typescriptlang.org/) - Usado para tipagem estática no JavaScript.
- [Express.js](https://expressjs.com/) - Estrutura de aplicativo da web Node.js.
- [Mongoose](https://mongoosejs.com/) - Mongodb object modeling para node.js

## Autores

- **Felipe Antero** - _Trabalho inicial_ - [souzantero](https://github.com/souzantero)

## Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE.md](LICENSE.md) para obter detalhes.
