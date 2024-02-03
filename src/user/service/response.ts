import { IUser } from "../interface/userInterface";
import { IDataResponse } from "./IDataResponse";
import { IResponseUserInterface } from "./IResponseUserinterface";

export class responseData  implements IResponseUserInterface{

   

     execute(user: IUser): IDataResponse {

        return {
            id: user.id,
            name: user.name,
            email: user.email
        }

    }
}