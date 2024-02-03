import { Request, Response, Router } from "express";
import { authLogin } from "../auth/authLogin";
import { authRepository } from "../auth/repository/authRepository";

const authRouter = Router();
const authRepo = new authRepository();

const loginAuth = new authLogin(authRepo);

authRouter.post('/login', async (req: Request, res: Response) => {

    const input = req.body; 
    try {
        const output = await loginAuth.execute(input);
        console.log(output)
        res.status(200).json({ data: output });

    } catch (error) {
      res.status(500).json({ error: 'Erro ao autenticar usuário.' });
    }
  });
  
 

export default  authRouter;