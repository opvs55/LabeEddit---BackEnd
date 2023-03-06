import { UserDB } from "../Interfaces/Types";
import { BaseDatabase } from "./BaseDataBase";

export class UsersDataBase extends BaseDatabase{
    public static TABLE_USERS = "users"


    public insert = async (userDB: UserDB) =>{
        await BaseDatabase
            .connection(UsersDataBase.TABLE_USERS)
            .insert(userDB)
    }
}