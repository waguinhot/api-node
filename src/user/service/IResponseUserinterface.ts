import { IUser } from "../interface/userInterface";
import { IDataResponse } from "./IDataResponse";

export interface IResponseUserInterface {
    execute(user: IUser): IDataResponse
}