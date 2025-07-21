# PicPay Backend Challenge

Este projeto é uma implementação do desafio de backend do PicPay, desenvolvido utilizando NestJS como framework principal e MySQL como banco de dados.

## 📋 Sobre o Projeto

O sistema implementa uma API para transações financeiras entre carteiras digitais, incluindo validação de transações e notificações. A arquitetura segue os padrões do NestJS com separação clara de responsabilidades entre módulos.

## 🏗️ Estrutura do Projeto

```
src/
├── config/           # Arquivos de configuração
├── transaction/      # Módulo de transações
│   ├── client/       # Clientes para APIs externas (autorização e notificação)
│   ├── dto/          # Data Transfer Objects
│   ├── entity/       # Entidades do banco de dados
│   ├── exceptions/   # Exceções customizadas
│   └── ...          # Controller, Service, Module e testes
├── wallet/           # Módulo de carteiras
│   ├── dto/          # Data Transfer Objects
│   ├── entity/       # Entidades do banco de dados
│   ├── exceptions/   # Exceções customizadas
│   └── ...          # Controller, Service, Module e testes
└── main.ts          # Arquivo principal da aplicação
```

## 🚀 Tecnologias Utilizadas

### Dependências Principais

- **NestJS** - Framework Node.js progressivo
- **TypeORM** - ORM para TypeScript/JavaScript
- **MySQL2** - Driver para MySQL
- **Axios** - Cliente HTTP para requisições
- **Class Validator** - Validação de dados
- **Class Transformer** - Transformação de objetos

### Dependências de Desenvolvimento

- **Jest** - Framework de testes
- **ESLint** - Linter para JavaScript/TypeScript
- **Prettier** - Formatador de código
- **TypeScript** - Superset tipado do JavaScript

## 📦 Instalação

1. Clone o repositório:

```bash
git clone git@github.com:Natan-Barbosa/Desafio-BackEnd-PicPay-TypeScript.git
cd Desafio-BackEnd-PicPay-TypeScript
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Inicie o banco de dados com Docker:

```bash
docker-compose up -d
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Configurações do banco de dados
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=picpay_challenge

# Outras configurações necessárias
API_PORT=3000
```

### Docker

O projeto inclui configuração Docker para o banco de dados MySQL. Execute:

```bash
docker-compose up -d
```

## 🏃‍♂️ Executando a Aplicação

### Desenvolvimento

```bash
npm run start:dev
```

### Produção

```bash
npm run build
npm run start:prod
```

### Debug

```bash
npm run start:debug
```

## 🧪 Testes

### Executar todos os testes

```bash
npm run test
```

### Executar testes em modo watch

```bash
npm run test:watch
```

### Executar testes com coverage

```bash
npm run test:cov
```

### Executar testes e2e

```bash
npm run test:e2e
```

## 📝 Scripts Disponíveis

- `npm run build` - Compila o projeto
- `npm run format` - Formata o código com Prettier
- `npm run start` - Inicia a aplicação
- `npm run start:dev` - Inicia em modo desenvolvimento
- `npm run start:debug` - Inicia em modo debug
- `npm run start:prod` - Inicia em modo produção
- `npm run lint` - Executa o linter
- `npm run test` - Executa os testes
- `npm run test:watch` - Executa os testes em modo watch
- `npm run test:cov` - Executa os testes com cobertura
- `npm run test:debug` - Executa os testes em modo debug
- `npm run test:e2e` - Executa os testes end-to-end

## 🏛️ Arquitetura

### Módulos Principais

#### Transaction Module

- **Controller**: Endpoints para gerenciar transações
- **Service**: Lógica de negócio das transações
- **Entity**: Modelo da entidade Transaction
- **DTO**: Objetos de transferência de dados
- **Client**: Integrações com APIs externas de autorização e notificação

#### Wallet Module

- **Controller**: Endpoints para gerenciar carteiras
- **Service**: Lógica de negócio das carteiras
- **Entity**: Modelo da entidade Wallet
- **DTO**: Objetos de transferência de dados
- **Exceptions**: Exceções customizadas do módulo

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Natan Barbosa**

- GitHub: [https://github.com/Natan-Barbosa](https://github.com/Natan-Barbosa)
