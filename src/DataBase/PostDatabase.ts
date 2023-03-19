import { LikesDislikesDB, PostDB, PostWithCreatorNameDB, POST_LIKE, SubPostDB, SubPostWithCreatorNameDB } from "../interfaces/types";
import { BaseDatabase } from "./BaseDataBase";

export class PostDataBase extends BaseDatabase {
    public static TABLE_POST = "post"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes"
    public static TABLE_SUBPOST = "subposts"


    public getPostWithCreatorName = async (): Promise<PostWithCreatorNameDB[]> => {
        const result: PostWithCreatorNameDB[] = await BaseDatabase
            .connection(PostDataBase.TABLE_POST)
            .select(
                "post.id",
                "post.creator_id",
                "post.context",
                "post.likes",
                "post.dislikes",
                "post.created_at",
                "post.updated_at",
                "users.name as creator_name"
            )
            .join("users", "post.creator_id", "=", "users.id")

        return result
    }


    public insert = async (postDB: PostDB): Promise<void> => {

        await BaseDatabase
            .connection(PostDataBase.TABLE_POST)
            .insert(postDB)
    }


    public findByID = async (id: string): Promise<PostDB | undefined> => {

        const result: PostDB[] = await BaseDatabase
            .connection(PostDataBase.TABLE_POST)
            .select()
            .where({ id })

        return result[0]
    }

    public update = async (id: string, postDB: PostDB): Promise<void> => {
        await BaseDatabase.connection(PostDataBase.TABLE_POST)
            .update(postDB)
            .where({ id })
    }

    public delete = async (id: string): Promise<void> => {
        await BaseDatabase.connection(PostDataBase.TABLE_POST)
            .delete()
            .where({ id })
    }

    public findPostById = async (postId: string): Promise<PostWithCreatorNameDB | undefined> => {
        const result: PostWithCreatorNameDB[] = await BaseDatabase
            .connection(PostDataBase.TABLE_POST)
            .select(
                "post.id",
                "post.creator_id",
                "post.context",
                "post.likes",
                "post.dislikes",
                "post.created_at",
                "post.updated_at",
                "users.name as creator_name"
            )
            .join("users", "post.creator_id", "=", "users.id")
            .where("post.id", postId)

        return result[0]
    }


    public likeOrDislikePost = async (likeDislike: LikesDislikesDB): Promise<void> => {
        await BaseDatabase.connection(PostDataBase.TABLE_LIKES_DISLIKES)
            .insert(likeDislike)
    }

    public findlikeDislikePost = async (
        likeDislikeDBToFind: LikesDislikesDB
    ): Promise<POST_LIKE | null> => {
        const [likeDislikeDB]: LikesDislikesDB[] = await BaseDatabase
            .connection(PostDataBase.TABLE_LIKES_DISLIKES)
            .select()
            .where({
                user_id: likeDislikeDBToFind.user_id,
                post_id: likeDislikeDBToFind.post_id
            })

        if (likeDislikeDB) {
            return likeDislikeDB.like === 1 ?
                POST_LIKE.ALREADY_LIKED :
                POST_LIKE.ALREADY_DISLIKED
        } else {
            return null
        }
    }

    public removeLikeDislike = async (
        likeDislikeDB: LikesDislikesDB
    ): Promise<void> => {
        await BaseDatabase
            .connection(PostDataBase.TABLE_LIKES_DISLIKES)
            .delete()
            .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            })
    }

    public updateLikeDislike = async (
        likeDislikeDB: LikesDislikesDB
    ): Promise<void> => {
        await BaseDatabase
            .connection(PostDataBase.TABLE_LIKES_DISLIKES)
            .update(likeDislikeDB)
            .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            })
    }

}