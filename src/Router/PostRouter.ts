import express from "express"
import { PostBusiness } from "../Business/PostBusiness"
import { PostController } from "../Controller/PostController"
import { PostDataBase } from "../Database/PostDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"


export const postRouter = express.Router()


const postController = new PostController(
    new PostBusiness(
        new PostDataBase(),
        new IdGenerator(),
        new TokenManager()
    )
)

postRouter.get("/", postController.getPost)
postRouter.post("/", postController.createPost)
postRouter.put("/:id", postController.editPost)
postRouter.delete("/:id", postController.deletePost)
postRouter.put("/:id/like", postController.likeOrDislikePost)