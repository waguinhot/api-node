import { PrismaClient } from "@prisma/client";
import { IAuthRepository } from "../IAuthRepository";

export class authRepository implements IAuthRepository{

    
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }


    async login(input: any) {
        try {   
            const user = await this.prisma.user.findUnique({ where: { email : input.email } });
            if(!user) throw new Error("USUARIO NÃO ENCONTRADO");

            return user;
        } catch (error: any) {
            throw new Error("ERRO: "+error?.message?.toString());
        }
    }
}