import express from "express"
import { SubPostbusiness } from "../Business/SubPostBusiness"
import { SubPostController } from "../Controller/SubPostController"
import { SubPostDataBase } from "../DataBase/SubPostDataBase"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"


export const subPostRouter = express.Router()


const SubPostControllers = new SubPostController(
    new SubPostbusiness(
        new SubPostDataBase(),
        new IdGenerator(),
        new TokenManager()
    )
)

subPostRouter.get("/:id/subpost", SubPostControllers.getsubPost)
subPostRouter.post("/:id/subpost", SubPostControllers.createSubPost)
subPostRouter.put("/:id/subpost", SubPostControllers.editSubPost)
subPostRouter.delete("/:id/subpost", SubPostControllers.deletePost)
subPostRouter.put("/:id/subpost/like", SubPostControllers.likeOrDislikeSubPost)