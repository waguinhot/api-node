import { IUserRepository } from "../interface/userRepositoryInterface";
import { IResponseUserInterface } from "../service/IResponseUserinterface";

export class getUser {

    constructor(readonly userRepository: IUserRepository , readonly responseData: IResponseUserInterface){
        
    }
    async execute(){
        try {
            const data = await this.userRepository.getAll();
            const response = data?.map((user) => this.responseData.execute(user));
           
         
            return response;
        } catch (error: any) {
             throw new error("ERRO AO CRIAR USUARIO");
        }

    }
}