import { BaseDatabase } from "../../src/database/BaseDatabase"
import { LikesDislikesDB, PostDB, PostWithCreatorNameDB, POST_LIKE, SubPostDB, SubPostWithCreatorNameDB } from "../../src/Interfaces/Types"

export class SubPostDatabaseMock extends BaseDatabase {
    public static TABLE_USERS = "users"

    public getSubPost = async (): Promise<SubPostWithCreatorNameDB[]> => {
        return [
            {
                id: "id-mock",
                post_id: "postId-mock",
                context: "context-mock",
                user_id: "userId-mock",
                likes: 0,
                dislikes: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                creator_name: "name-mock"
            }, {
                id: "id2-mock",
                post_id: "postId2-mock",
                context: "context2-mock",
                user_id: "userId2-mock",
                likes: 0,
                dislikes: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                creator_name: "name2-mock"
            }
        ]
    }

    public getSubPostById = async (postId: string): Promise<SubPostWithCreatorNameDB | undefined> => {
        switch (postId) {
            case "id-mock":
                return {
                    id:"id-mock",
                    post_id: "postId-mock",
                    context: "context-mock",
                    user_id: "userId-mock",
                    likes: 0,
                    dislikes: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    creator_name: "name-mock"
                }
            case "id2-mock":
                return {
                    id:"id2-mock",
                    post_id: "postId2-mock",
                    context: "context2-mock",
                    user_id: "userId2-mock",
                    likes: 0,
                    dislikes: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    creator_name: "name2-mock"
                }
            default:
                return undefined
        }
    }




    public insertSubPost = async (subpostDB: SubPostDB): Promise<void> => {

    }


    public findSingleSubPostById = async (id: string): Promise<SubPostDB | undefined> => {
        switch (id) {
            case "id-mock":
                return {
                    id: "id-mock",
                    post_id: "postId-mock",
                    context: "context-mock",
                    user_id: "userId-mock",
                    likes: 0,
                    dislikes: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            case "id2-mock":
                return {
                    id: "id2-mock",
                    post_id: "postId2-mock",
                    context: "context2-mock",
                    user_id: "userId2-mock",
                    likes: 0,
                    dislikes: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            default:
                return undefined
        }
    }

    public updateSubPost = async (id: string, postDB: PostDB): Promise<void> => {
    }

    public deleteSubPost = async (id: string): Promise<void> => {
    }

    public findPostById = async (postId: string): Promise<SubPostWithCreatorNameDB | undefined> => {
        switch (postId) {
            case "id-mock":
                return {
                    id: "id-mock",
                    post_id: "postId-mock",
                    context: "context-mock",
                    user_id: "userId-mock",
                    likes: 0,
                    dislikes: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    creator_name: "name-mock"
                }
            case "id2-mock":
                return {
                    id: "id2-mock",
                    post_id: "postId2-mock",
                    context: "context2-mock",
                    user_id: "userId2-mock",
                    likes: 0,
                    dislikes: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    creator_name: "name2-mock"
                }
            default:
                return undefined
        }
    }

    public likeOrDislikeSubPost = async (likeDislike: LikesDislikesDB): Promise<void> => {
    }

    public findlikeDislikeSubPost = async (likeDislikeDBToFind: LikesDislikesDB): Promise<POST_LIKE | null> => {
        return (POST_LIKE.ALREADY_LIKED)
    }

    public updateSubPostLikeDislike = async (
        likeDislikeDB: LikesDislikesDB
    ): Promise<void> => {
    }

    public removeSubPostLikeDislike = async (
        likeDislikeDB: LikesDislikesDB
    ): Promise<void> => {
    }

}
