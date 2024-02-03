import { IUserRepository } from "../interface/userRepositoryInterface";

export class deleteUser {
    constructor(readonly userRepository: IUserRepository){
        
    }

    async execute(id: number){
        try {
            const user = await this.userRepository.delete(id);
            return true;
        }
        catch(error: any){
            throw new Error("ERRO: "+error?.message?.toString());
        }
    }
}