import { IUserRepository } from "../interface/userRepositoryInterface";
import bcrypt from 'bcrypt';

export class createUser {

    constructor(readonly userRepository: IUserRepository){
        
    }
    async execute(input: any){
        try {
            const name = input.name;
            const email = input.email;
            const password =  await bcrypt.hash(input.password, 10);
            const data = this.userRepository.create(name, email,password);
            if(!data) throw new Error("ERRO AO CRIAR USUARIO, ele ja existe")
            return data;
            
        } catch (error: any) {
             throw new error("ERRO AO CRIAR USUARIO " + error.message);
        }

    }
}