import { Prisma, PrismaClient } from '@prisma/client'
import { User } from "../user";
import { IUserRepository } from "../interface/userRepositoryInterface";
import { IUser } from '../interface/userInterface';

export class userRepository implements IUserRepository {

    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getId(id: number): Promise<IUser | null> {

        const data = await this.prisma.user.findFirst({ where: { id: id } });

        return data;


    }
    async getAll(): Promise<IUser[] | null> {

        const data = await this.prisma.user.findMany();

        return data;


    }
    async create(name: string, email: string , password: string): Promise<IUser> {
        try {

            const existingUser = await this.prisma.user.findFirst({ where: { email: email } });
            if (existingUser) {
                throw new Error("Usuário com este email já existe.");
              }


            const user = await this.prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: password
                },
            });
            return user;
        } catch (error: any) {
            throw new Error("ERRO: "+error?.message?.toString());
        }
    }
    async update(id: number, user: IUser): Promise<void> {
        const updateUser = await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                name: user.name,
                email: user.email,
                password: user.password
            },
        })
    }
    async delete(id: number): Promise<void> {
        try{
            const existingUser = await this.getId(id);
            if (!existingUser) {
                throw new Error("Usuário inexistente");
            }
            
        
          const teste =  await this.prisma.user.delete({ where: { id:id } }); 

        }
        catch(error: any){
            throw new Error("ERRO: "+error?.message?.toString());
        }
    }


}