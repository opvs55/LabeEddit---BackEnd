import { Request, Response } from "express"
import { SubPostbusiness } from "../Business/SubPostBusiness"
import {  CreateSubPostInputDTO, DeletePostInputDTO, EditPostInputDTO, GetPostInputDTO, GetsubPostInputDTO, LikeOrDeslikePostInputDPO } from "../Dto/usersPostsDTO"
import { BaseError } from "../Errors/BaseError"

export class SubPostController {
    constructor(
        private subPostBusiness: SubPostbusiness
    ) { }

    public getsubPost = async (req: Request, res: Response) => {
        try {
            const input: GetPostInputDTO = {
                token: req.headers.authorization
            }

            const output = await this.subPostBusiness.getSubPost(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("erro inesperado")
            }
        }
    }

    public getsubPostById = async (req: Request, res: Response) => {
        try {
            const input: GetsubPostInputDTO = {
                id: req.params.id,
                token: req.headers.authorization
            }

            const output = await this.subPostBusiness.getSubPost(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("erro inesperado")
            }
        }
    }


    public createSubPost = async (req: Request, res: Response) => {
        try {

            const input: CreateSubPostInputDTO = {
                token: req.headers.authorization,
                postId: req.params.id,
                context: req.body.context
            }

            await this.subPostBusiness.createSubPost(input)

            res.status(201).send("sucesso").end
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("erro inesperado")
            }
        }
    }

    public editSubPost = async (req: Request, res: Response) => {
        try {

            const input: EditPostInputDTO = {

                idToEdit: req.params.id,
                context: req.body.context,
                token: req.headers.authorization
            }

            await this.subPostBusiness.editSubPost(input)

            res.status(200).end()

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("erro inesperado")
            }
        }
    }

    public deletePost = async (req: Request, res: Response) => {
        try {

            const input: DeletePostInputDTO = {
                idToDelete: req.params.id,
                token: req.headers.authorization
            }

            await this.subPostBusiness.deleteSubPost(input)

            res.status(200).end()
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("erro inesperado")
            }
        }
    }

    public likeOrDislikeSubPost = async (req: Request, res: Response) => {
        try {

            const input: LikeOrDeslikePostInputDPO = {
                idToLikeOrDeslike: req.params.id,
                token: req.headers.authorization,
                like: req.body.like
            }
            await this.subPostBusiness.likeOrDislikesSubPost(input)

            res.status(200).end()
        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("erro inesperado")
            }
        }
    }
}