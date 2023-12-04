const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/index.js'];

const doc = {
  info: {
    title: 'Sua API de Gerenciamento de Tarefas com IA',
    description: 'Documentação da API de Gerenciamento de Tarefas com IA',
  },
  host: 'localhost:3000',
  basePath: '/', 
  schemes: ['http'],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./src/index.js');
});
