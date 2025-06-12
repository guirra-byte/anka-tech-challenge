# 🧪 Anka Tech - Resolução do Case Técnico

Este repositório contém uma aplicação fullstack desenvolvida como parte do desafio técnico para a Anka. O projeto é dividido em duas partes principais: **frontend** e **backend**, organizadas dentro do mesmo monorepositório.

## Demonstração

Abaixo, uma prévia da aplicação em funcionamento:
- <a href="https://drive.google.com/file/d/1HUmXKe6b5-a0Qc77NeW5LpyQNfaaOyvh/view?usp=sharing">Vídeo de Demonstração </a>


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

# 🧠 Decisões Técnicas de Interesse
### 👀 Mudança de React Query para Next.js API Routes

Apesar da sugestão inicial de usar React Query, optei por centralizar as requisições usando Next.js API Routes. Essa decisão foi baseada na busca por simplicidade e controle, algo mais adequado para um projeto menor e com requisitos bem específicos.
- Com as API Routes, consigo proteger melhor dados sensíveis, validar entradas no backend e organizar a lógica de forma mais clara.
- Caso a aplicação evoluísse em complexidade, o uso do React Query voltaria a ser considerado para melhorar o gerenciamento de estado e sincronização de dados no frontend.

<hr/>

### 📌 Cache no Backend — Cache-Aside Strategy

![image](https://github.com/user-attachments/assets/075b5af5-d23a-4932-bc75-e87d6a8f9f05)

Para garantir performance e escalabilidade, esta aplicação adota a estratégia Cache-Aside, uma técnica eficiente onde o cache e a fonte de verdade (banco de dados) são desacoplados, mas sincronizados de forma inteligente.

- **Middleware e preHandler** interceptam as requisições antes da execução da lógica principal.
- O cache é gerenciado, associando **uma key única a cada rota/serviço**.
- Se uma resposta para aquela rota já foi processada anteriormente, ela é retornada imediatamente do cache — evitando processamento duplicado e diminuindo consideravelmente o tempo de resposta.
- Caso não exista cache, a requisição segue normalmente e, ao final, a resposta é armazenada para reutilizações futuras.

#### 🧼 Invalidação Automática:
Sempre que o servidor executa **operações** como criação e edição (nesse contexto), o cache relacionado à entidade modificada é **invalidado** e automaticamente **atualizado** após a nova resposta.
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

#### 📡 Comunicação Assíncrona orientada à eventos com SSE (Server-Sent Events)
- Para melhorar a experiência do usuário, foi implementado um canal de comunicação com o frontend usando SSE (Server-Sent Events):
- Assim que o processamento do arquivo é finalizado no backend, um evento SSE é disparado.
- Este evento notifica o frontend em tempo real, que então pode reconsultar a API para exibir os dados atualizados, sem a necessidade de polling ou refresh manual.
- Isso torna o fluxo mais fluido e moderno, proporcionando feedback instantâneo para o usuário e mantendo a interface sempre sincronizada com os dados reais.

<hr/>

🚀 Projeto desenvolvido com dedicação e 🧡.

✨ Com esperança de, em breve, poder contribuir profissionalmente com o time da [Anka](https://ankatech.com.br).

📬 Entre em contato: guirramatheus1@gmail.com | <a href="https://www.linkedin.com/in/matheus-guirra/">Linkedin</a> | +55 (61) 99283-9756
