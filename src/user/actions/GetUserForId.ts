import { IUserRepository } from "../interface/userRepositoryInterface";
import { IResponseUserInterface } from "../service/IResponseUserinterface";

export class getUserForId {

    constructor(readonly userRepository: IUserRepository , readonly responseData : IResponseUserInterface){
        
    }
    async execute(id: number){
        try {
            const data = await this.userRepository.getId(id);
            if(!data) throw new Error("ERRO USUARIO NAO ENCONTRADO")
            const response = this.responseData.execute(data);
            return response;

        } catch (error: any) {
             throw new error("ERRO " + error);
        }

    }
}