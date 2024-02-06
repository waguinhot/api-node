import { Router, Request, Response, response } from "express";
import { createUser } from "../user/actions/createUser";
import { getUserForId } from "../user/actions/GetUserForId";
import { userRepository } from "../user/repository/userRepository";
import { getUser } from "../user/actions/getUser";
import { updateUser } from "../user/actions/updateUser";
import { deleteUser } from "../user/actions/deleteUser";
import { responseData } from "../user/service/response";
import { authMiddleware } from "../auth/service/middlewareAuth";

const router = Router();

const userData = new userRepository();
const dataResponse = new responseData();

const userGet = new getUser(userData , dataResponse );
const userCreate = new createUser(userData);
const userGetForId = new getUserForId(userData , dataResponse);
const userUpdate = new updateUser(userData);
const userDelete = new deleteUser(userData);



router.get('/', function (req: Request, res: Response) {
    res.status(200).send('API em execução!');
});


/**
 * @swagger
 * /:
 *   get:
 *     summary: Endpoint utilizado para validar conexão
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Mensagem de sucesso
 *         content:
 *           application/json:
 */
router.get('/api/users', authMiddleware , async function (req: Request, res: Response) {

    try {
        const output = await userGet.execute()
        res.status(200).json({ data: output });
    } catch (error: any) {
        res.status(422).json({ error: error })
    }
})



/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Obtém informações de um usuário por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Mensagem de sucesso
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 id: 1
 *                 name: John Doe
 *                 email: john@example.com
 */
router.get('/api/user/:id', authMiddleware ,  async function (req: Request, res: Response) {

    const id = parseInt(req.params.id as string);

    try {
        const output = await userGetForId.execute(id)
        res.status(200).json({ data: output });
    } catch (error: any) {
        res.status(404).json({ error: error, message: "user not found" })
    }
})



/**
 * @swagger
 * /api/user/create:
 *   post:
 *     summary: Cadastra o usuario e retorna ele na req
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Mensagem de sucesso
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 - id: 1
 *                   name: John Doe
 *                   email: john@example.com
 */
router.post('/api/user/create', authMiddleware , async function (req: Request, res: Response) {

    const input = req.body;

    try {
        const output = await userCreate.execute(input)
        res.status(201).json({ message: 'USUARIO CRIADO COM SUCESSO!', data: output });
    } catch (error: any) {
        res.status(422).json({ error: error.message })
    }

});


/**
 * @swagger
 * /api/user/update/{id}:
 *   put:
 *     summary: Atualiza o usuario e retorna ele na req
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Mensagem de sucesso
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 - id: 1
 *                   name: John Doe
 *                   email: john@example.com
 */
router.put('/api/user/update/:id', authMiddleware ,  async function (req: Request, res: Response) {
    const input = req.body;
    const id = parseInt(req.params.id as string);

    try {

        const output = await userUpdate.execute(id, input)
        res.status(201).json({ message: 'USUARIO ATUALIZADO COM SUCESSO!', data: output });
    } catch (error: any) {
        res.status(422).json({ error: error.message })
    }


});


/**
 * @swagger
 * /api/user/delete/{id}:
 *   delete:
 *     summary: deleta o usuario informado
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Mensagem de sucesso
 *         content:
 *           application/json:
 */
router.delete('/api/user/delete/:id', authMiddleware ,  async function (req: Request, res: Response) {
    const id = parseInt(req.params.id as string);

    try {

        const output = await userDelete.execute(id)
        res.status(200).json({ message: 'USUARIO deletadol COM SUCESSO!', data: output });
    } catch (error: any) {
        res.status(422).json({ error: error })
    }


});
export default router;