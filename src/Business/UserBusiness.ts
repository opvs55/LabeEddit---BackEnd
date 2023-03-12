import { UsersDataBase } from "../DataBase/UsersDataBase";
import { LoginInputDTO, LoginOutputDTO, SignUpInputDTO, SignUpOutputDTO } from "../Dto/usersPostsDTO";
import { BadRequestError } from "../Errors/BadRequestError";
import { NotFoundError } from "../Errors/NotFoundError";
import { TokenPayLoad, UserDB, USER_ROLES } from "../Interfaces/Types";
import { Users } from "../Models/Users";
import { HashManager } from "../Services/HashManager";
import { IdGenerator } from "../Services/IdGenerator";
import { TokenManager } from "../Services/TokenManager";

export class UsersBusiness {
    constructor(
        private userDataBase: UsersDataBase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) { }

    public signup = async (input: SignUpInputDTO): Promise<SignUpOutputDTO> => {
        const { name, email, password } = input

        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser string")
        }

        const id = this.idGenerator.generate()
        const hashedPassword = await this.hashManager.hash(password)
        const role = USER_ROLES.NORMAL
        const createdAt = new Date().toISOString()

        const newUser = new Users(
            id,
            name,
            email,
            hashedPassword,
            role,
            createdAt
        )

        const userDB = newUser.toDBModel()

        await this.userDataBase.insert(userDB)

        const payload: TokenPayLoad = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        }

        const token = this.tokenManager.createToken(payload)

        const output: SignUpOutputDTO = {
            token
        }

        return output
    }
    public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
        const { email, password } = input

        if (typeof email !== "string") {
            throw new BadRequestError("email deve ser string")
        }
        if (typeof password !== "string") {
            throw new BadRequestError("password deve ser string")
        }

        const userDB: UserDB | undefined = await this.userDataBase.findByEmail(email)

        if (!userDB) {
            throw new NotFoundError("email invalido")
        }

        const isPasswordCorrect = await this.hashManager.compare(password, userDB.password)

        console.log(password)
        console.log(userDB.password)
        console.log(isPasswordCorrect)

        //erro resolvido

        if (!isPasswordCorrect) {
            throw new BadRequestError("'password' incorreto")
        }


        const user = new Users(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        )


        const payload: TokenPayLoad = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole()
        }

        const token = this.tokenManager.createToken(payload)

        const output: LoginOutputDTO = {
            token
        }

        return output
    }
}