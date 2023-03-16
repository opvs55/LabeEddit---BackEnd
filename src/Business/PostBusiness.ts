import { PostDataBase } from "../DataBase/PostDatabase";
import { CreatePostInputDTO, CreateSubPostInputDTO, DeletePostInputDTO, EditPostInputDTO, GetPostInputDTO, GetPostOutputDTO, LikeOrDeslikePostInputDPO } from "../Dto/usersPostsDTO";
import { BadRequestError } from "../Errors/BadRequestError";
import { NotFoundError } from "../Errors/NotFoundError";
import { LikesDislikesDB, PostWithCreatorNameDB, POST_LIKE, USER_ROLES } from "../Interfaces/Types";
import { Post, SubPost } from "../Models/Post";
import { IdGenerator } from "../Services/IdGenerator";
import { TokenManager } from "../Services/TokenManager";

export class PostBusiness {
    constructor(
        private postDataBase: PostDataBase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public getPost = async (input: GetPostInputDTO): Promise<GetPostOutputDTO> => {

        const { token } = input

        if (!token) {
            throw new BadRequestError("token ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload == null) {
            throw new BadRequestError("token invalido")
        }

        const postWithCreatorNameDB: PostWithCreatorNameDB[] =
            await this.postDataBase
                .getPostWithCreatorName()


        const post = await Promise.all(postWithCreatorNameDB.map(
            async (postWithCreatorNameDB) => {
                const post = new Post(
                    postWithCreatorNameDB.id,
                    postWithCreatorNameDB.context,
                    postWithCreatorNameDB.likes,
                    postWithCreatorNameDB.dislikes,
                    postWithCreatorNameDB.created_at,
                    postWithCreatorNameDB.updated_at,
                    postWithCreatorNameDB.creator_id,
                    postWithCreatorNameDB.creator_name
                )


                return await post.toBusinessModel()
            }
        ))

        const output: GetPostOutputDTO = post

        return output
    }

    public createPost = async (input: CreatePostInputDTO): Promise<void> => {
        const { token, context } = input

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

        const post = new Post(
            id,
            context,
            0,
            0,
            createAt,
            updateAt,
            creatorId,
            creatorName
        )

        const postDB = post.ToDBModel()
        await this.postDataBase.insert(postDB)
    }

    public createSubPost = async (input: CreateSubPostInputDTO): Promise<void> => {
        const { token, postId, context } = input


        console.log(input)
        if (token === undefined) {
            throw new BadRequestError("token ausente")
        }
        if (postId === undefined) {
            throw new BadRequestError("postId ausente")
        }

        if (typeof context !== "string") {
            throw new BadRequestError("Context deve ser string")
        }


        const payload = this.tokenManager.getPayload(token)

        const postLoad = await this.postDataBase.findByID(postId)

        if (postLoad == null) {
            throw new BadRequestError("Id Errado")
        }

        if (payload == null) {
            throw new BadRequestError("token invalido")
        }


        const id = this.idGenerator.generate()
        const createAt = new Date().toISOString()
        const updateAt = new Date().toISOString()
        const creatorId = payload.id
        const creatorName = payload.name
        const postid = postLoad.id

        const subPost = new SubPost(
            id,
            postid,
            context,
            creatorId,
            0,
            0,
            createAt,
            updateAt
        )

        const subPostDB = subPost.toSubPostModel()
        await this.postDataBase.insertSubPost(subPostDB)
    }

    public editPost = async (input: EditPostInputDTO): Promise<void> => {

        const { idToEdit, token, context } = input

        if (token === undefined) {
            throw new BadRequestError("token ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload == null) {
            throw new BadRequestError("token invalido")
        }

        if (typeof context !== "string") {
            throw new BadRequestError("name deve ser string")
        }

        const postDB = await this.postDataBase.findByID(idToEdit)

        if (!postDB) {
            throw new NotFoundError("Id não encontrado")
        }

        const creatorId = payload.id

        if (postDB.creator_id !== creatorId) {
            throw new BadRequestError("Você não criou a postagem!")
        }

        const creatorName = payload.name

        const post = new Post(
            postDB.id,
            postDB.context,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at,
            creatorId,
            creatorName
        )

        post.setContext(context)
        post.setUpdatedAt(new Date().toISOString())

        const upPostDB = post.ToDBModel()

        await this.postDataBase.update(idToEdit, upPostDB)
    }

    public deletePost = async (input: DeletePostInputDTO): Promise<void> => {

        const { idToDelete, token } = input

        if (token === undefined) {
            throw new BadRequestError("token ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload == null) {
            throw new BadRequestError("token invalido")
        }

        const postDB = await this.postDataBase.findByID(idToDelete)

        if (!postDB) {
            throw new NotFoundError("Id não encontrado")
        }

        const creatorId = payload.id

        if (payload.role !== USER_ROLES.ADMIN && postDB.creator_id !== creatorId) {
            throw new BadRequestError("Apenas o user criador da postagem ou ADM's podem deletar!")
        }


        await this.postDataBase.delete(idToDelete)
    }

    public likeOrDislikesPost = async (input: LikeOrDeslikePostInputDPO): Promise<void> => {

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

        const postWithCreatorDB = await this.postDataBase.findPostById(idToLikeOrDeslike)

        if (!postWithCreatorDB) {
            throw new NotFoundError("Id não encontrado")
        }

        const creatorId = payload.id
        const likeCondition = like ? 1 : 0

        const likeDislikeDB: LikesDislikesDB = {
            user_id: creatorId,
            post_id: postWithCreatorDB.id,
            like: likeCondition
        }



        const postLikeOrDislikeConfirm = await this.postDataBase.findlikeDislikePost(likeDislikeDB)

        const post = new Post(
            postWithCreatorDB.id,
            postWithCreatorDB.context,
            postWithCreatorDB.likes,
            postWithCreatorDB.dislikes,
            postWithCreatorDB.created_at,
            postWithCreatorDB.updated_at,
            postWithCreatorDB.creator_id,
            postWithCreatorDB.creator_name
        )

        if (postLikeOrDislikeConfirm === POST_LIKE.ALREADY_LIKED) {
            if (like) {
                await this.postDataBase.removeLikeDislike(likeDislikeDB)
                post.removeLike()
            } else {
                await this.postDataBase.updateLikeDislike(likeDislikeDB)
                post.removeLike()
                post.addDislikes()
            }
        } else if (postLikeOrDislikeConfirm === POST_LIKE.ALREADY_DISLIKED) {
            if (like) {
                await this.postDataBase.updateLikeDislike(likeDislikeDB)
                post.removeDislikes()
                post.addLike()
            } else {
                await this.postDataBase.removeLikeDislike(likeDislikeDB)
                post.removeDislikes()
            }
        } else {
            await this.postDataBase.likeOrDislikePost(likeDislikeDB)
            
            like ? post.addLike() : post.addDislikes()
        }
        const updatePostDB = post.ToDBModel()

        await this.postDataBase.update(idToLikeOrDeslike, updatePostDB)
    }
}
