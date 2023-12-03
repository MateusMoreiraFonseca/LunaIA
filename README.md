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

1. Cadastro de Usuários
   Implemente uma rota para o cadastro de usuários, recebendo dados pessoais e credenciais.
   Status:OK

2. Usuários Administradores
   Crie um usuário administrador por padrão durante a instalação do sistema.
   Implemente uma rota para que administradores possam criar outros administradores.
   Status:OK

3. Rota para Criar Administradores
   Implemente a rota createUserAdmin para criar administradores.
   Status:OK

4. Excluir Usuário não Administrador
   Implemente uma rota para que administradores possam excluir usuários não administradores.
   Status:OK

5. Rota de Login e Token JWT
   Implemente a rota loginUser para gerar um token JWT para acesso às rotas protegidas da API.
   Status:OK

6. Alterar Dados Pessoais
   Implemente uma rota para que usuários possam alterar seus dados pessoais (updateUserBySelf). Restrinja aos próprios usuários e permita que administradores alterem dados de outros usuários.
   Status:OK

7. Sistema CRUD
   Implemente operações de CRUD para os recursos específicos do seu sistema.
   Realize a validação adequada dos dados fornecidos pelo usuário.
   Status:OK
   
8. Paginação
   Implemente a lógica de paginação nas rotas de listagem, recebendo os parâmetros limite e página.

9. Lógica de Negócio
   Implemente uma operação especial de livre escolha, envolvendo processamento de dados, inserção/alteração no banco de dados ou geração de consultas elaboradas.

10. Instalador e Documentação
    Implemente a rota GET /install/ para realizar a instalação do banco de dados.
    Utilize o Swagger ou outra ferramenta para gerar a documentação da API (GET /docs).

## Prazos de Entrega

setx OPENAI_API_KEY "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"

1. **Agendamento de Apresentação:**

   - Agende sua apresentação através do Moodle.
   - Respeite os prazos e evite descontos na nota.

2. **Apresentação ao Professor:**

   - Esteja preparado para apresentar o código ao professor.
   - Demonstre conhecimento sobre cada parte do seu projeto.

3. **Repositório GIT:**
   - Mantenha o repositório atualizado com commits incrementais.
   - Organize o código de forma clara e compreensível.
