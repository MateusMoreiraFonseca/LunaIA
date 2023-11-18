# ROTEIRO

## Configuração do Ambiente

1. **Instalação das Ferramentas Necessárias:**

   - [Node.js](https://nodejs.org/)
   - [MongoDB](https://www.mongodb.com/try/download/community)
   - [Visual Studio Code](https://code.visualstudio.com/)

2. **Configuração do Repositório:**

   - Crie um repositório no Git para o seu projeto.
   - Clone o repositório para a sua máquina.

3. **Instalação das Dependências:**

   - Execute `npm init -y` para iniciar um projeto Node.js.
   - Instale o Express: `npm install express`.
   - Instale o Mongoose: `npm install mongoose`.
   - Instale o Nodemon (opcional, mas útil para desenvolvimento): `npm install nodemon --save-dev`.
   - Instale o JWT (jsonwebtoken): `npm install jsonwebtoken`.
   - Instale o Swagger para documentação: `npm install swagger-jsdoc swagger-ui-express`.

4. **Configuração do .env:**
   - Crie um arquivo `.env` para armazenar as configurações sensíveis.
   - Defina variáveis de ambiente para a conexão com o MongoDB e a chave secreta do JWT.

## Funcionalidades Propostas

1. **Usuários e Sistema de Autenticação (25%):**

   - Implemente rotas para cadastro, login, recuperação de senha, alteração de dados pessoais, criação e exclusão de administradores.
   - Gere tokens JWT para autenticação.

2. **Sistema CRUD (25%):**

   - Implemente as operações CRUD para Tarefas, Projetos, Categorias, e qualquer outra entidade escolhida.
   - Valide dados fornecidos pelos usuários e envie mensagens de erro/sucesso apropriadas.
   - Implemente paginação para as operações de listar.

3. **Lógica de Negócio, Instalador e Documentação (50%):**
   - Desenvolva uma operação especial de livre escolha que envolva lógica de negócio significativa.
   - Crie a rota GET `/install/` para inicialização do banco de dados.
   - Utilize o Swagger para documentar sua API.

## Prazos de Entrega

1. **Agendamento de Apresentação:**

   - Agende sua apresentação através do Moodle.
   - Respeite os prazos e evite descontos na nota.

2. **Apresentação ao Professor:**

   - Esteja preparado para apresentar o código ao professor.
   - Demonstre conhecimento sobre cada parte do seu projeto.

3. **Repositório GIT:**
   - Mantenha o repositório atualizado com commits incrementais.
   - Organize o código de forma clara e compreensível.
