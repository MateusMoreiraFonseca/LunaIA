# Nome do Projeto

Este é um projeto desenvolvido como parte da disciplina de Back-End no campus da UTFPR de Cornélio Procópio, PR.

## Autor

- **Nome:** Mateus Moreira Fonseca
- **Contato:** mateus.fonseca1992@gmail.com

## Descrição

Este projeto tem como objetivo ser um gerenciador de tarefas (tasks) e atividades de projetos, com interação de objetos utilizando Inteligência Artificial (IA).

## Instalação

Para instalar as dependências necessárias, siga os passos descritos abaixo:

1. Abre o projeto dentro de uma pasta na IDE.
2. Instale as dependencias com "npm install"
3. Certifique-se de possuir um instancia do mongod inicializada com seu banco de dados
4. No projeto o banco de dados foi nomeado como "Luna
5. Inicie a aplicação com "npm start"
    1. Certifique-se de receber a mensagem "Conectado ao MongoDB: Luna"
    2. Caso não receba, existe um problema ao se conctar ao banco de dados
    3. Recomenda-se verificar as configuraçoes em "src\utils\mongodb.js" e suas settagens em ".env"
    4. Reinicie a aplicação
6. As rotas disponível estão na documentacao do Swagger na seguinte rota :
http://localhost:3000/docs/#/
7. Recomenda-se fazer a instalação do banco de dados da app através da rota /intall disponível no swagger:



## Contribuição

Se desejar contribuir com este projeto, siga as instruções abaixo:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Faça commit das mudanças (`git commit -am 'Adicione uma feature'`)
4. Faça push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request




Obs:Ainda não vi como fazer a paginação.Mas pelo oque vi precisaria reconstruir toda Service ou Controller. A Service reconheço que ficou de péssima qualidade.Entendi o conceito melhor mais recentemente de forma que a service deve fazer a validação dos dados de forma que possa ser reutilizadas.Acaba que a controler receberia a responsabilidade de fazer a montagem desses atributos para o método, porém seria interessante então aplicar uma terceira camada que usaria esses métodos no conjuntos de métodos utilizados pelas rotas. Em java chamamos de classe "faixada". 