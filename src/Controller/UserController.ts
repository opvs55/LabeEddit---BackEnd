import { Request, Response } from "express"
import { UsersBusiness } from "../Business/UserBusiness";
import { SignUpInputDTO } from "../Dto/usersPostsDTO";
import { BaseError } from "../Errors/BaseError";

export class UserController{
    constructor(
        private userBusiness: UsersBusiness
    ){}


    public signup = async (req: Request, res: Response ) =>{
        try {
            const input : SignUpInputDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            const output = await this.userBusiness.signup(input)

            res.status(201).send(output)
        }  catch (error) {
            if(error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("erro inesperado")
            }
        }
    }
}