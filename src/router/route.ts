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

router.get('/users', authMiddleware , async function (req: Request, res: Response) {

    try {
        const output = await userGet.execute()
        res.status(200).json({ data: output });
    } catch (error: any) {
        res.status(422).json({ error: error })
    }
})

router.get('/user/:id', authMiddleware ,  async function (req: Request, res: Response) {

    const id = parseInt(req.params.id as string);

    try {
        const output = await userGetForId.execute(id)
        res.status(200).json({ data: output });
    } catch (error: any) {
        res.status(404).json({ error: error, message: "user not found" })
    }
})

router.post('/user/create', authMiddleware , async function (req: Request, res: Response) {

    const input = req.body;

    try {
        const output = await userCreate.execute(input)
        res.status(200).json({ message: 'USUARIO CRIADO COM SUCESSO!', data: output });
    } catch (error: any) {
        res.status(422).json({ error: error.message })
    }

});


router.put('/user/update/:id', authMiddleware ,  async function (req: Request, res: Response) {
    const input = req.body;
    const id = parseInt(req.params.id as string);

    try {

        const output = await userUpdate.execute(id, input)
        res.status(200).json({ message: 'USUARIO ATUALIZADO COM SUCESSO!', data: output });
    } catch (error: any) {
        res.status(422).json({ error: error })
    }


});

router.delete('/user/delete/:id', authMiddleware ,  async function (req: Request, res: Response) {
    const id = parseInt(req.params.id as string);

    try {

        const output = await userDelete.execute(id)
        res.status(200).json({ message: 'USUARIO deletadol COM SUCESSO!', data: output });
    } catch (error: any) {
        res.status(422).json({ error: error })
    }


});
export default router;