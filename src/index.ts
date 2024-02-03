import express , {Request , Response} from 'express';
import cors from 'cors';
import router from './router/route';
import authRouter from './router/authRouter';


const app = express();
const port = 3000;

app.use(cors()); // Habilita o CORS
app.use(express.json());

app.use(authRouter);
app.use(router);;


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
