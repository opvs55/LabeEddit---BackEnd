import { LikesDislikesDB, POST_LIKE, SubPostDB, SubPostWithCreatorNameDB } from "../Interfaces/Types";
import { BaseDatabase } from "./BaseDataBase";

export class SubPostDataBase extends BaseDatabase {
    public static TABLE_SUBPOSTS = "subposts"
    public static TABLE_LIKES_DISLIKES_SUBPOST = "likes_dislikes_subpost"



    public getSubPost = async (): Promise<SubPostDB[]> => {
        const result: SubPostDB[] = await BaseDatabase
            .connection(SubPostDataBase.TABLE_SUBPOSTS)
            .select(
                "subposts.id",
                "subposts.post_id",
                "subposts.context",
                "subposts.user_id",
                "subposts.likes",
                "subposts.dislikes",
                "subposts.created_at",
                "subposts.updated_at",
                "users.name as creator_name"
            )
            .join("users", "subposts.user_id", "=", "users.id")

        return result
    }

    public getSubPostWithCreatorName = async (id: string): Promise<SubPostDB[]> => {
        const result: SubPostDB[] = await BaseDatabase
            .connection(SubPostDataBase.TABLE_SUBPOSTS)
            .select(
                "subposts.id",
                "subposts.post_id",
                "subposts.context",
                "subposts.user_id",
                "subposts.likes",
                "subposts.dislikes",
                "subposts.created_at",
                "subposts.updated_at",
                "users.name as creator_name"
            )
            .join("users", "subposts.user_id", "=", "users.id")
            .where({ "subposts.post_id": id })

        return result || []
    }

    public insertSubPost = async (subpostDB: SubPostDB): Promise<void> => {
        await BaseDatabase
            .connection(SubPostDataBase.TABLE_SUBPOSTS)
            .insert(subpostDB)
    }


    public findSingleSubPostById = async (id: string): Promise<SubPostDB | undefined> => {
        const [result]: SubPostDB[] = await BaseDatabase
            .connection(SubPostDataBase.TABLE_SUBPOSTS)
            .select()
            .where({ id });
        return result;
    }

    public updateSubPost = async (id: string, SubpostDB: SubPostDB): Promise<void> => {
        await BaseDatabase.connection(SubPostDataBase.TABLE_SUBPOSTS)
            .update(SubpostDB)
            .where({ id })
    }

    public deleteSubPost = async (id: string): Promise<void> => {
        await BaseDatabase.connection(SubPostDataBase.TABLE_SUBPOSTS)
            .delete()
            .where({ id })
    }


    public likeOrDislikeSubPost = async (likeDislike: LikesDislikesDB): Promise<void> => {
        await BaseDatabase.connection(SubPostDataBase.TABLE_LIKES_DISLIKES_SUBPOST)
            .insert(likeDislike)
    }

    public findlikeDislikeSubPost = async (
        likeDislikeDBToFind: LikesDislikesDB
    ): Promise<POST_LIKE | null> => {
        const [likeDislikeDB]: LikesDislikesDB[] = await BaseDatabase
            .connection(SubPostDataBase.TABLE_LIKES_DISLIKES_SUBPOST)
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

    public removeSubPostLikeDislike = async (
        likeDislikeDB: LikesDislikesDB
    ): Promise<void> => {
        await BaseDatabase
            .connection(SubPostDataBase.TABLE_LIKES_DISLIKES_SUBPOST)
            .delete()
            .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            })
    }

    public updateSubPostLikeDislike = async (
        likeDislikeDB: LikesDislikesDB
    ): Promise<void> => {
        await BaseDatabase
            .connection(SubPostDataBase.TABLE_LIKES_DISLIKES_SUBPOST)
            .update(likeDislikeDB)
            .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            })
    }

}
