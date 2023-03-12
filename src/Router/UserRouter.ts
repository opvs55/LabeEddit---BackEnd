import express  from "express";
import { UsersBusiness } from "../Business/UserBusiness";
import { UserController } from "../Controller/UserController";
import { UsersDataBase } from "../DataBase/UsersDataBase";
import { HashManager } from "../Services/HashManager";
import { IdGenerator } from "../Services/IdGenerator";
import { TokenManager } from "../Services/TokenManager";



export const userRouter = express.Router()

const userController = new UserController(
    new UsersBusiness(
        new UsersDataBase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
)


userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)