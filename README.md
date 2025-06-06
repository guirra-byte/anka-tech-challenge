# 🧪 Anka Tech - Resolução do Case Técnico

Este repositório contém uma aplicação fullstack desenvolvida como parte do desafio técnico para a Anka. O projeto é dividido em duas partes principais: **frontend** e **backend**, organizadas dentro do mesmo monorepositório.

## 🧪 Demonstração

Abaixo, uma prévia da aplicação em funcionamento:


https://github.com/user-attachments/assets/f20d1529-53c3-4d83-a836-bcfc6d35752a



## 📁 Estrutura do Projeto
anka-tech-challenge/ <br>
├── frontend/ # Interface do usuário (Next.Js) <br>
├── backend/ # API e regras de negócio (Node.js, Fastify, Redis e MySQL) <br>
├── .gitignore <br>
└── README.md


## 🚀 Como Rodar Localmente
### ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) v22 (usando --experiment-strip-types para utilizar TypeScript nativamente)
- npm
- Docker e Docker Compose

### 🔧 Passo a passo

1. Clone o repositório:

```bash
git clone https://github.com/guirra-byte/anka-tech-challenge.git

cd anka-tech-challenge

cd anka-backend
    nvm use 22 (para usar versão 22-lts do Node.Js)
    npm --clean install
    docker compose up (subindo container Redis e MySQL)
    npm run dev

cd anka-frontend (em outro terminal)
    npm --clean install
    npm run dev
```

A aplicação estará disponível em:

Frontend: http://localhost:3000

Backend: http://localhost:3001

# 🧠 Decisões Técnicos de Interesse
### 👀 Mudança de React Query para Next.js API Routes

No desafio inicial, o uso do **React Query** foi estimulado para realizar requisições e gerenciar o estado dos dados no frontend. 

No entanto, com liberdade técnica e um olhar crítico sobre a arquitetura, optei por migrar para o uso de **Next.js API Routes**. Essa decisão técnica foi baseada nos seguintes pontos:

- **Segurança aprimorada:** mantemos a lógica e os segredos no backend, protegendo endpoints e dados sensíveis.
- **Maior controle sobre as chamadas:** centralizamos as requisições no servidor, possibilitando validações, autenticação e tratamento de erros mais robustos.
- **Melhor organização da aplicação:** a API interna do Next.js funciona como um intermediário, facilitando manutenção e escalabilidade.
- **Performance otimizada:** reduzimos chamadas diretas externas do cliente e podemos implementar caching e pré-processamento no servidor.

Essa abordagem proporcionou uma solução mais segura, flexível e alinhada às necessidades do projeto, respeitando a proposta original do desafio e aplicando melhorias técnicas relevantes.

<hr/>

### 📌 Cache no Backend

Para otimizar o tempo de resposta e reduzir processamento desnecessário, o backend utiliza um sistema de **cache por rota**, com as seguintes características:

- **Middleware e preHandler** interceptam as requisições antes da execução da lógica principal.
- O cache é gerenciado, associando **uma key única a cada rota/serviço**.
- Se uma resposta para aquela rota já foi processada anteriormente, ela é retornada imediatamente do cache — evitando processamento duplicado e diminuindo consideravelmente o tempo de resposta.
- Caso não exista cache, a requisição segue normalmente e, ao final, a resposta é armazenada para reutilizações futuras.

#### 🧼 Invalidação Automática:
Sempre que o servidor executa **operações stateful** — como criação e edição (nesse contexto), o cache relacionado à entidade modificada é **invalidado** e automaticamente **atualizado** após a nova resposta.
> Isso garante que o cache nunca entregue dados desatualizados após mutações.

#### 🤝 Integração com o Frontend

O frontend utiliza um **algoritmo de retentativa (retry logic)** para lidar com falhas temporárias de rede ou instabilidade no backend.

Quando combinados:

- 🔁 **Retentativa** garante que requisições sejam refeitas em caso de falha (5 tentativas).
- ⚡ **Cache** garante que, se já houver resposta válida, ela será retornada instantaneamente.

✅ **Resultado:** uma experiência do usuário fluida, rápida e tolerante a falhas — mesmo em ambientes de baixa conectividade.

#### 💡 Benefícios combinados:

- ⏱️ Redução de latência
- 🔒 Consistência de dados após mutações
- 📈 Performance e escalabilidade melhoradas

<hr/>

### 🧨 Importação de Dados a partir de CSV

Esta funcionalidade permite importar dados de clientes, seus ativos e valores investidos a partir de arquivos CSV de forma segura e eficiente.

Durante a importação, cada linha do arquivo é processada dentro de uma **transaction** utilizando o Prisma, garantindo a consistência e integridade dos dados.

- Para **clientes novos**, é criado um novo registro no banco de dados.
- Para **clientes já existentes**, é utilizado o método **upsert** para atualizar ou criar novos ativos vinculados ao cliente, permitindo múltiplos ativos para um mesmo usuário sem duplicações.
- O uso de **transactions** assegura que todas as operações referentes a uma linha do CSV (cliente, ativo e investimento) sejam executadas de forma atômica, evitando inconsistências em caso de falhas durante o processo.

Este processo garante que os dados financeiros importados sejam atualizados corretamente, facilitando o gerenciamento dos investimentos por cliente.

