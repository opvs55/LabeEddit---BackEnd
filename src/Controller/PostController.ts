import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
import { CreatePostInputDTO, DeletePostInputDTO, EditPostInputDTO, GetPostInputDTO, LikeOrDeslikePostInputDPO } from "../Dto/usersPostsDTO"
import { BaseError } from "../Errors/BaseError"

export class PostController{
    constructor(
        private postBusiness: PostBusiness
    ){}

    public getPost = async (req:Request, res: Response) => {
        try {
            const input: GetPostInputDTO = {
                token: req.headers.authorization
            }

            const output = await this.postBusiness.getPost(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)
            if(error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("erro inesperado")
            }
        }  
    }

    public createPost = async (req:Request, res: Response) => {
        try {

            const input: CreatePostInputDTO = {
                token: req.headers.authorization,
                context: req.body.context
            }
        
            await this.postBusiness.createPost(input)

            res.status(201).send("sucesso").end
        } catch (error) {
            console.log(error)
            if(error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("erro inesperado")
            }
        }  
    }

    public editPost = async (req:Request, res: Response) => {
        try {

            const input: EditPostInputDTO = {

                idToEdit: req.params.id,
                context: req.body.context,
                token: req.headers.authorization
            }

            await this.postBusiness.editPost(input)

            res.status(200).end()
            
        } catch (error) {
            console.log(error)
            if(error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("erro inesperado")
            }
        }  
    }

    public deletePost = async (req:Request, res: Response) => {
        try {

           const input: DeletePostInputDTO = {
                idToDelete: req.params.id,
                token: req.headers.authorization
           }

           await this.postBusiness.deletePost(input)

           res.status(200).end()
        } catch (error) {
            console.log(error)
            if(error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("erro inesperado")
            }
        }  
    }

    public likeOrDislikePost = async (req:Request, res: Response) => {
        try {

           const input: LikeOrDeslikePostInputDPO = {
                idToLikeOrDeslike: req.params.id,
                token: req.headers.authorization,
                like: req.body.like
           }

           await this.postBusiness.likeOrDislikesPost(input)

           res.status(200).end()
        } catch (error) {
            console.log(error)
            if(error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("erro inesperado")
            }
        }  
    }
}