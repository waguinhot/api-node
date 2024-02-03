import { IUser } from "../interface/userInterface";
import { IUserRepository } from "../interface/userRepositoryInterface";
import bcrypt from 'bcrypt';
export class updateUser {
    constructor(readonly userRepository: IUserRepository){}

    async execute(id:number , data: IUser){
       try {
        data.password =  await bcrypt.hash(data.password, 10);
        const user = await this.userRepository.update(id, data);
        return user;
       } catch (error: any) {
            throw new Error("ERRO AO ATUALIZAR USUARIO " + error.message.toString());
       }
       
    }
}