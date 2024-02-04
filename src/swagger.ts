const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Nome da Sua API',
      version: '1.0.0',
      description: 'Descrição da Sua API',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Altere conforme necessário
      },
    ],
  };
  
  const options = {
    swaggerDefinition,
    apis: ['./src/router/*.ts'], // Caminho para seus arquivos de rotas
  };
export default options;
  