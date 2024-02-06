import { User } from "../user";
import { IUser } from "./userInterface";

export interface IUserRepository {
    getId(id: number): Promise<IUser | null>;
    getAll(): Promise<IUser[] | null>;
    create(name: string , email: string , password: string): Promise<IUser >;
    update(id:number ,user: IUser):Promise<IUser> ;
    delete(id: number): Promise<void>;
}