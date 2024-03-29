import express , {Request , Response} from 'express';
import cors from 'cors';
import router from './router/route';
import authRouter from './router/authRouter';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import options from './swagger';

const app = express();
const port = 4500;


const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));



app.use(cors()); 
app.use(express.json());

app.use(authRouter);
app.use(router);;


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
