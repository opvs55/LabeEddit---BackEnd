import { SubPostDataBase } from "../DataBase/SubPostDataBase";
import { CreateSubPostInputDTO, DeletePostInputDTO, EditPostInputDTO, GetPostInputDTO, GetSubPostOutputDTO, LikeOrDeslikePostInputDPO } from "../Dto/usersPostsDTO";
import { BadRequestError } from "../Errors/BadRequestError";
import { LikesDislikesDB, POST_LIKE,SubPostWithCreatorNameDB, USER_ROLES } from "../Interfaces/Types";
import { IdGenerator } from "../Services/IdGenerator";
import { TokenManager } from "../Services/TokenManager";
import { NotFoundError } from "../Errors/NotFoundError";
import { SubPost } from "../Models/SubPost";





export class SubPostbusiness {
    constructor(
        private subPostDataBase: SubPostDataBase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ){}


    public getSubPost = async (input: GetPostInputDTO) => {

        const {token} = input


        if (!token){
            throw new BadRequestError("token ausente")
        }


        const payload = this.tokenManager.getPayload(token)

        if(payload == null) {
            throw new BadRequestError("token invalido")
        }


        const subPostWithCreatorNameDB: SubPostWithCreatorNameDB[] =
        await this.subPostDataBase
            .getSubPost()

        console.log('subPostWithCreatorNameDB:', subPostWithCreatorNameDB)

        const subPost = await Promise.all(subPostWithCreatorNameDB.map(
            async (subPostWithCreatorName) => {
                const subPost = new SubPost(
                    subPostWithCreatorName.id,
                    subPostWithCreatorName.post_id,
                    subPostWithCreatorName.context,
                    subPostWithCreatorName.user_id,
                    subPostWithCreatorName.likes,
                    subPostWithCreatorName.dislikes,
                    subPostWithCreatorName.created_at,
                    subPostWithCreatorName.updated_at,
                    subPostWithCreatorName.creator_name
                )
                return await subPost.toSubPostModel()
        }
        ))

        const output: GetSubPostOutputDTO = subPost

        return output
    }


    public createSubPost = async (input: CreateSubPostInputDTO): Promise<void> => {
        const { token, context, postId } = input

        if (token === undefined) {
            throw new BadRequestError("token ausente")
        }

        if (typeof context !== "string") {
            throw new BadRequestError("Context deve ser string")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload == null) {
            throw new BadRequestError("token invalido")
        }


        const id = this.idGenerator.generate()
        const createAt = new Date().toISOString()
        const updateAt = new Date().toISOString()
        const creatorId = payload.id
        const creatorName = payload.name

        const subPost = new SubPost(
            id,
            postId,
            context,
            creatorId,
            0,
            0,
            createAt,
            updateAt,
            creatorName
        )

        const subPostDB = subPost.toSubPostModel()
        await this.subPostDataBase.insertSubPost(subPostDB)
    }


    public editSubPost = async (input: EditPostInputDTO): Promise<void> => {

        const { idToEdit, token, context } = input
        
        if (token === undefined) {
            throw new BadRequestError("token ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload == null) {
            throw new BadRequestError("token invalido")
        }


        const subPostDB = await this.subPostDataBase.findSingleSubPostById(idToEdit)
        console.log(subPostDB)

        if (!subPostDB ) {
            throw new NotFoundError("Id não encontrado")
        }

        const creatorId = payload.id
        const creatorName = payload.name

        if (subPostDB.user_id!== creatorId) {
            throw new BadRequestError("Você não criou a postagem!")
        }

        const subPostEditada = new SubPost(
            subPostDB.id,
            subPostDB.post_id,
            subPostDB.context,
            creatorId,
            subPostDB.likes,
            subPostDB.dislikes,
            subPostDB.created_at,
            subPostDB.updated_at,
            creatorName 
        )

        subPostEditada.setContext(context)
        subPostEditada.setUpdatedAt(new Date().toISOString())

        const upSubPostDB = subPostEditada.toSubPostModel()

        await this.subPostDataBase.updateSubPost(idToEdit, upSubPostDB)
    }

    public deleteSubPost = async (input: DeletePostInputDTO): Promise<void> => {

        const { idToDelete, token } = input

        if (token === undefined) {
            throw new BadRequestError("token ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload == null) {
            throw new BadRequestError("token invalido")
        }

        const postDB = await this.subPostDataBase.findSingleSubPostById(idToDelete)

        if (!postDB) {
            throw new NotFoundError("Id não encontrado")
        }

        const creatorId = payload.id

        if (payload.role !== USER_ROLES.ADMIN && postDB.user_id !== creatorId) {
            throw new BadRequestError("Apenas o user criador da postagem ou ADM's podem deletar!")
        }


        await this.subPostDataBase.deleteSubPost(idToDelete)
    }

    public likeOrDislikesSubPost = async (input: LikeOrDeslikePostInputDPO): Promise<void> => {

        const { idToLikeOrDeslike, token, like } = input

        if (token === undefined) {
            throw new BadRequestError("token ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload == null) {
            throw new BadRequestError("token invalido")
        }

        if (typeof like != "boolean") {
            throw new BadRequestError("Like deve ser um boolean")
        }

        const postWithCreatorDB = await this.subPostDataBase.findSingleSubPostById(idToLikeOrDeslike)

        if (!postWithCreatorDB) {
            throw new NotFoundError("Id não encontrado")
        }

        const creatorId = payload.id
        const likeCondition = like ? 1 : 0
        const creatorName = payload.name

        const likeDislikeDB: LikesDislikesDB = {
            user_id: creatorId,
            post_id: postWithCreatorDB.id,
            like: likeCondition
        }


        const postLikeOrDislikeConfirm = await this.subPostDataBase.findlikeDislikeSubPost(likeDislikeDB)

        const subPost = new SubPost(
            postWithCreatorDB.id,
            postWithCreatorDB.post_id,
            postWithCreatorDB.context,
            postWithCreatorDB.user_id,
            postWithCreatorDB.likes,
            postWithCreatorDB.dislikes,
            postWithCreatorDB.created_at,
            postWithCreatorDB.updated_at,
            creatorName
        )

        if (postLikeOrDislikeConfirm === POST_LIKE.ALREADY_LIKED) {
            if (like) {
                await this.subPostDataBase.removeSubPostLikeDislike(likeDislikeDB)
                subPost.removeLike()
            } else {
                await this.subPostDataBase.updateSubPostLikeDislike(likeDislikeDB)
                subPost.removeLike()
                subPost.addDislikes()
            }
        } else if (postLikeOrDislikeConfirm === POST_LIKE.ALREADY_DISLIKED) {
            if (like) {
                await this.subPostDataBase.updateSubPostLikeDislike(likeDislikeDB)
                subPost.removeDislikes()
                subPost.addLike()
            } else {
                await this.subPostDataBase.removeSubPostLikeDislike(likeDislikeDB)
                subPost.removeDislikes()
            }
        } else {
            await this.subPostDataBase.likeOrDislikeSubPost(likeDislikeDB)
            
            like ? subPost.addLike() : subPost.addDislikes()
        }

        const updateSubPostDB = subPost.SubPostToDBModel()

        await this.subPostDataBase.updateSubPost(idToLikeOrDeslike, updateSubPostDB)
    }

}