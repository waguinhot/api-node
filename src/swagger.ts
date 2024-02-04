const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Nome da Sua API',
      version: '1.0.0',
      description: 'Descrição da Sua API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  };
  
  const options = {
    swaggerDefinition,
    apis: ['./src/router/*.ts'], 
  };
export default options;
  