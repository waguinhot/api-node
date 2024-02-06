import { IUser } from "../interface/userInterface";
import { IUserRepository } from "../interface/userRepositoryInterface";
import bcrypt from 'bcrypt';
export class updateUser {
    constructor(readonly userRepository: IUserRepository){}

    async execute(id:number , data: IUser){
       try {
        if(data.password == "") throw new Error("Necessario informar uma senha valida");
         const user = await this.userRepository.update(id, data);
        return user;
       } catch (error: any) {
            throw new Error("ERRO AO ATUALIZAR USUARIO " + error.message.toString());
       }
       
    }
}