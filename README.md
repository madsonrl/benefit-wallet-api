# Benefit Wallet API

## Descrição do Projeto

A **Benefit Wallet API** é uma solução desenvolvida para processar transações com cartão de crédito de maneira eficiente e confiável. Este projeto implementa um autorizador de transações baseado em regras específicas, como mapeamento de códigos MCC, priorização de comerciantes e fallback para saldos disponíveis. Ele segue os princípios de **Clean Architecture** para manter o código organizado, testável e escalável.

---

## Tecnologias Utilizadas

- **Node.js** com **TypeScript** e **Express**: para desenvolvimento do servidor.
- **PostgreSQL** com **TypeORM**: como banco de dados relacional.
- **Docker** e **Docker Compose**: para facilitar a execução e configuração do ambiente.
- **Swagger**: para documentação dos endpoints.

---

## Configuração do Ambiente

### Pré-requisitos

Certifique-se de ter instalado no seu ambiente:

- **Node.js** (v16 ou superior)
- **Yarn** ou **npm**
- **Docker** e **Docker Compose**

### Instalação e Configuração

1. **Clone o repositório**:
   ```
   git clone <url-do-repositorio>
   cd <nome-do-repositorio>
2. **Instale as dependências**:
   Usando Yarn ou NPM:
   ```
   yarn or npm install
3. **Execute o ambiente com Docker Compose**:
   ```
   docker-compose up -d
4. **Execute as migrations**:
   ```
   yarn typeorm migration:run
            ou
   npm run typeorm migration:run
5. **Acesse a documentação da API**:
   Disponível em: http://localhost:9000/api-docs

---

## Endpoints
A API oferece os seguintes recursos principais:

- **Accounts**: Criar, listar, atualizar e deletar contas.
- **Merchants**: Gerenciar comerciantes e MCCs.
- **Transactions**: Autorizar e processar transações com base nas regras de MCC e fallback.
Para mais detalhes sobre os endpoints, acesse a - **documentação Swagger**: http://localhost:9000/api-docs.

---

#### Uso

Consultando o Swagger

- Crie uma conta
- Crie um comerciante
- Realize transações

Exemplo de Payload para Transação

```
{
  "account": "123",
  "totalAmount": 100.00,
  "mcc": "5811",
  "merchant": "PADARIA DO ZE               SAO PAULO BR"
}
```

#### Respostas da API

- { "code": "00" }: Transação aprovada.
- { "code": "51" }: Saldo insuficiente.
- { "code": "07" }: Erro na transação.

---

#### Testes
Execute os testes automatizados para validar a aplicação:

```
yarn test
```
ou 
```
npm run test
```

Use a coleção de requisição feitas no POSTMAN para facilitar testes presentes na pasta:
```
benefit-wallet-api/postaman
```

---

#### Desafios Resolvidos

L1. **Autorizador simples**: Processa transações com base no MCC e categorias de saldo.

L2. **Autorizador com fallback**: Realiza fallback para o saldo em CASH quando necessário.

L3. **Dependência de comerciantes**: Prioriza o nome do comerciante sobre o MCC.

L4. **Questão Aberta**: Transações Simultâneas

   Para evitar conflitos em transações simultâneas, a solução ideal seria:

   - **Bloqueios otimizados**: Usar boqueadores no nível do banco de dados para garantir exclusividade por conta.
   - **Implementacao de filas de transações**: Processar transações com regras de prioridade utilizando ferramentas como RabbitMQ ou Kafka.
   - **Cache distribuído**: Implementar sistemas de cache transacional para validações rápidas.

---

#### Contato

- **Autor**: Madson Lemos
- **Email**: madsonlemos.es@gmail.com