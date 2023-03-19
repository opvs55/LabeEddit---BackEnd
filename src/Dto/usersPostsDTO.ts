
import { PostModel, SubPostModel } from "../Interfaces/Types"



export interface SignUpInputDTO {
    name: unknown,
    email: unknown,
    password: unknown
}

export interface SignUpOutputDTO {
    token: string
}

export interface LoginInputDTO {
    email: unknown,
    password: unknown
}

export interface LoginOutputDTO {
    token: string
}


export interface GetPostInputDTO {
    token: string | undefined
}

export interface GetsubPostInputDTO {
    id: string
    token: string | undefined
}


export type GetPostOutputDTO = PostModel[]


export type GetSubPostOutputDTO = SubPostModel[]

export interface CreatePostInputDTO {
    token: string | undefined,
    context: unknown
}

export interface EditPostInputDTO {
    idToEdit: string,
    token: string | undefined,
    context: any
}

export interface DeletePostInputDTO {
    idToDelete: string,
    token: string | undefined
}

export interface LikeOrDeslikePostInputDPO {
    idToLikeOrDeslike: string,
    token: string | undefined,
    like: unknown
}


export interface CreateSubPostInputDTO{
    token : string | undefined,
    postId: string
    context: unknown
}

