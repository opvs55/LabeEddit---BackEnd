import { UserDB } from "../Interfaces/Types";
import { BaseDatabase } from "./BaseDataBase";

export class UsersDataBase extends BaseDatabase {
    public static TABLE_USERS = "users"


    public insert = async (userDB: UserDB) => {
        await BaseDatabase
            .connection(UsersDataBase.TABLE_USERS)
            .insert(userDB)
    }

    public findByEmail = async (email: string): Promise<UserDB | undefined> => {

        const result: UserDB[] = await BaseDatabase
            .connection(UsersDataBase.TABLE_USERS)
            .select()
            .where({ email })

        return result[0]
    }
}