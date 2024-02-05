import { IAuthRepository } from "./IAuthRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IResponseUserInterface } from "../user/service/IResponseUserinterface";

const secretKey = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwNjk5NTE2NiwiaWF0IjoxNzA2OTk1MTY2fQ.UtJOqjUpMUdzb_URUdUffjn7qmqOOUzYfnCPDMTsWA0";
//'finge que ta certo, segue a vida . . . 

export class authLogin {
    constructor(readonly authRepository: IAuthRepository , readonly responseData: IResponseUserInterface){}
   async execute(input: any){
    
    try {
        const user = await this.authRepository.login(input);

        console.log("user " + user.email);
        const password = await bcrypt.compare(input.password, user.password);
        
        console.log("password " + password);
        if(!password) throw new Error("usuario nao encontrado");

        const token = await jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
        console.log("token " + token);
        const userResponse = this.responseData.execute(user);
        return {
            user: userResponse,
            token: token
        };

    } catch (error: any) {
        throw new error("ERRO " + error.message);
    }

    
   }    
}