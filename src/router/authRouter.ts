import { Request, Response, Router } from "express";
import { authLogin } from "../auth/authLogin";
import { authRepository } from "../auth/repository/authRepository";

const authRouter = Router();
const authRepo = new authRepository();

const loginAuth = new authLogin(authRepo);


/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Faz o login da autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mensagem de sucesso
 *         content:
 *           application/json:
 *             example:
 *               data: "STRING - TOKEN JWT"
 */
authRouter.post('/api/login', async (req: Request, res: Response) => {

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